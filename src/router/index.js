import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/AdminLogin",
    name: "adminLogin",
    component: () => import("@/views/AdminLogin.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/ApplicantDashboard",
    name: "ApplicantDashboard",
    component: () => import("@/views/ApplicantDashboard.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/applicationForm",
    name: "applicationForm",
    component: () => import("@/components/Application/ApplicationForm.vue"),
    meta: {
      requiresAuth: true,
      isAdmin: true
    },
    props: {
      header: true,
      content: true
    }
  },
  {
    path: "/adminapplicationdashboard",
    name: "adminapplicationdashboard",
    component: () => import("@/views/AdminApplicationDashboard.vue"),
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  // PLEASE MAKE SURE THAT THIS IS ALWAYS THE LAST ROUTE!!!
  {
    path: "*",
    name: "notFound",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      requiresAuth: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//navagation protection - needs to authenicated before proceeding or else direct to login page
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user;
    if (user) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

//navagation protection - needs to be an admin before proceeding or else direct to login page
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.isAdmin)) {
    let isAdmin = store.state.isAdmin;
    if (isAdmin) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
