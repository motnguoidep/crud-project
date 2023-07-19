import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/product/index.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
  ]
})

const getCurrentUser = () =>{
  return new Promise((resolve, reject) =>{
    const removeListener = onAuthStateChanged(
      getAuth(),
        (user) => {
          removeListener();
          resolve(user);
        },
      reject
    );
  });
};

router.beforeEach(async(to, from, next)=>{
  if(to.matched.some((record)=> record.meta.requiresAuth)){
    if(await getCurrentUser()){
      next();
    }
    else{
      alert("you don't have access!");
      next("/");
    }
    }else{
      next();
    }
  }
);
export default router
