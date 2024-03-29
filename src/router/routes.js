const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/Login.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('pages/Register.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/tags',
        name: 'tags',
        component: () => import('pages/Tags.vue')
      },
      {
        path: '/create_post',
        name: 'create_post',
        component: () => import('pages/CreatePost.vue')
      },
      {
        path: '/posts/:id',
        name: 'post',
        component: () => import('pages/UserPost.vue')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('pages/SearchPosts.vue')
      },
      {
        path: '/users/:id',
        name: 'user_profile',
        component: () => import('pages/UserProfile.vue')
      },
      {
        path: '/users/edit/:id',
        name: 'edit_profile',
        component: () => import('pages/EditProfile.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue')
      },
      {
        path: '/create_tag',
        name: 'create_tag',
        component: () => import('pages/CreateTag.vue')
      },
      {
        path: '/tags/edit/:id',
        name: 'edit_tag',
        component: () => import('pages/EditTag.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
