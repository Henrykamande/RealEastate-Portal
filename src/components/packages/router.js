const Index = () => import("./index.vue");
const CreatePage = () => import("./_pages/create.vue");
const ViewPage = () => import("./_pages/view.vue");

export default [
  {
    path: "/packages",
    component: Index,
  },
  {
    path: "/new/package",
    component: CreatePage,
  },
  {
    path: "/package/details/:url",
    component: ViewPage,
  },
];
