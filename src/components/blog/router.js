const Index = () => import('./index.vue');
const CreatePage = () => import('./_pages/create.vue');
const ViewPage = () => import('./_pages/view.vue');

export default [
    {
        path: '/blog',
        component: Index
    },
    {
        path: '/new/blog',
        component: CreatePage
    },
    {
        path: '/blog/details/:url',
        component: ViewPage
    }
]