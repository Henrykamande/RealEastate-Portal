const Index = () => import('./index.vue');
const CreatePage = () => import('./_pages/create.vue');
const ViewPage = () => import('./_pages/view.vue');

export default [
    {
        path: '/seo',
        component: Index
    },
    {
        path: '/seo/create',
        component: CreatePage
    },
    {
        path: '/seo/details/:url',
        component: ViewPage
    }
]