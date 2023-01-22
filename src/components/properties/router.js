const Index = () => import("./index.vue");
const CreatePage = () => import("./_pages/create.vue");
const ViewPage = () => import("./_pages/view.vue");

export default [
  {
    path: "/properties",
    component: Index,
  },
  {
    path: "/new/property",
    component: CreatePage,
  },
  {
    path: "/property/details/:id",
    component: ViewPage,
  },
];
