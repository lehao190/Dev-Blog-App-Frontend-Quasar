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
      }
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
