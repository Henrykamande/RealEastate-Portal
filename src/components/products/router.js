const Index = () => import("./index.vue");
const CreatePage = () => import("./_pages/create.vue");
const ViewPage = () => import("./_pages/view.vue");

export default [
  {
    path: "/products",
    component: Index,
  },
  {
    path: "/new/product",
    component: CreatePage,
  },
  {
    path: "/product/details/:url",
    component: ViewPage,
  },
];
