const Index = () => import("./index.vue");
const CreatePage = () => import("./_pages/create.vue");
const ViewPage = () => import("./_pages/view.vue");

export default [
  {
    path: "/tenants",
    component: Index,
  },
  {
    path: "/new/tenant",
    component: CreatePage,
  },
  {
    path: "/tenant/details/:url",
    component: ViewPage,
  },
];
