import { api } from 'boot/axios';
import { LocalStorage } from 'quasar';
import {
  USER_CREDENTIALS_REQUEST,
  USER_CREDENTIALS_SUCCESS,
  USER_CREDENTIALS_FAILURE,
  USER_CREDENTIALS_RESET
} from '../mutation-types/userContants';
import { handle } from '../../utils/handle_promise';

// Request All Users
export async function requestAllUsers({ commit }, payload) {
  const { token } = payload;

  commit({
    type: USER_CREDENTIALS_REQUEST
  });

  const [usersData, usersError] = await handle(
    api.get('/users?$sort[created_at]=-1', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

  if (usersError) {
    commit({
      type: USER_CREDENTIALS_FAILURE,
      error: usersError.response
    });

    throw usersError.response;
  }

  const { data } = usersData;

  commit({
    type: USER_CREDENTIALS_SUCCESS,
    users: data.data
  });
}

// Get authenticated user on refresh page
export async function me({ commit }) {
  const hashURL = window.location.hash.split('#/#access_token=');

  // Save access token to LocalStorage only for Oauth Authentication
  if (hashURL[1]) {
    const accessToken = hashURL[1];

    LocalStorage.set('accessToken', accessToken);
  }

  commit({
    type: USER_CREDENTIALS_REQUEST
  });

  let user = LocalStorage.getItem('user');

  if (!user || user === null || user === undefined) {
    const [userData, userError] = await handle(api.get('/me'));

    if (userError) {
      return commit({
        type: USER_CREDENTIALS_FAILURE,
        error: userError.response
      });
    }

    const { data } = userData;

    LocalStorage.set('user', data);

    user = data;
  }

  commit({
    type: USER_CREDENTIALS_SUCCESS,
    user
  });
}

// Log user in
export async function login({ commit }, payload) {
  const { email, password } = payload;

  commit({
    type: USER_CREDENTIALS_REQUEST
  });

  const [userData, userError] = await handle(
    api.post('/authentication', {
      strategy: 'local',
      email,
      password
    })
  );

  if (userError) {
    return commit({
      type: USER_CREDENTIALS_FAILURE,
      error: userError.response
    });
  }

  const { user, accessToken } = userData.data;

  LocalStorage.set('user', user);
  LocalStorage.set('accessToken', accessToken);

  commit({
    type: USER_CREDENTIALS_SUCCESS,
    user
  });
}

// Register user
export async function register({ commit }, payload) {
  const { username, email, password, rePassword, user_avatar } = payload;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('rePassword', rePassword);
  formData.append('user_avatar', user_avatar);

  commit({
    type: USER_CREDENTIALS_REQUEST
  });

  // Register
  const [userDataRegister, userErrorRegister] = await handle(
    api.post('/users', formData)
  );

  if (userErrorRegister) {
    return commit({
      type: USER_CREDENTIALS_FAILURE,
      error: userErrorRegister.response
    });
  }

  // Login
  const [userData, userError] = await handle(
    api.post('/authentication', {
      strategy: 'local',
      email,
      password
    })
  );

  if (userError) {
    return commit({
      type: USER_CREDENTIALS_FAILURE,
      error: userError.response
    });
  }

  const { user, accessToken } = userData.data;

  LocalStorage.set('user', user);
  LocalStorage.set('accessToken', accessToken);

  commit({
    type: USER_CREDENTIALS_SUCCESS,
    user
  });
}

// Refresh the existing token
export async function refresh({ commit }, payload) {
  const [data, error] = await handle(
    api.post('/refresh_tokens', {
      accessToken: LocalStorage.getItem('accessToken')
    })
  );

  if (error) {
    console.log('refresh error: ', error);

    LocalStorage.clear();

    return commit({
      type: USER_CREDENTIALS_RESET,
      error: error.response
    });
  }

  console.log('from refresh Endpoint: ', data);

  LocalStorage.set('accessToken', data.data.accessToken);
}

// Log user out
export async function logout({ commit }) {
  const [data, error] = await handle(api.post('logout'));

  if (error) {
    return commit({
      type: USER_CREDENTIALS_RESET,
      error: error.response
    });
  }

  LocalStorage.clear();

  commit({
    type: USER_CREDENTIALS_RESET
  });
}
