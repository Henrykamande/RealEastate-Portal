import Vue from "vue";
import Router from "vue-router";

import SystemDashboard from "@/components/dashboard/index.vue";
import LoginPage from "@/components/auth/login.vue";
import RegistrationPage from "@/components/auth/register.vue";
// auth routes
import AuthRoutes from "@/components/auth/router";
// module routes
import PackagesRoutes from "@/components/packages/router";
import ProductsRoutes from "@/components/products/router";
import SliderRoutes from "@/components/slider/router";
import ServicesRoutes from "@/components/services/router";
import BlogRoutes from "@/components/blog/router";
import SeoRoutes from "@/components/seo/router";
import UsersRoutes from "@/components/users/router";
// end of module routes
import DefaultLayout from "@/layout/defaultLayout";
//addded by myrachanto
import SectorRoutes from "@/components/sector/router";
import SectorbRoutes from "@/components/sectorb/router";
import PagoRoutes from "@/components/pago/router";
import SectionsRoutes from "@/components/sections/router";
import ModeloRoutes from "@/components/modelo/router";
import LocationRoutes from "@/components/location/router";
Vue.use(Router);

export function UserGuard(to, from, next) {
  const user = localStorage.getItem("name");
  if (!user) {
    return next("/login");
  }
  return next();
}

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      component: RegistrationPage,
    },
    {
      path: "/",
      component: DefaultLayout,
      // beforeEnter: (to, from, next) => {
      //     const tokenStatus = localStorage.token;
      //     if (tokenStatus == undefined || tokenStatus == null) {
      //         next('/login')
      //     } else {
      //         next()
      //     }
      // },
      children: [
        {
          path: "/dashboard",
          name: "SystemDashboard",
          component: SystemDashboard,
        },
        ...PackagesRoutes,
        ...ProductsRoutes,
        ...SeoRoutes,
        ...AuthRoutes,
        ...SliderRoutes,
        ...ServicesRoutes,
        ...BlogRoutes,
        ...UsersRoutes,
        ...SectorRoutes,
        ...PagoRoutes,
        ...SectionsRoutes,
        ...ModeloRoutes,
        ...LocationRoutes,
        ...SectorbRoutes,
      ],
    },
  ],
});
