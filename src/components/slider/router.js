const Index = () => import('./index.vue');
const CreatePage = () => import('./_pages/create.vue');
const ViewPage = () => import('./_pages/view.vue');

export default [
    {
        path: '/slider',
        component: Index
    },
    {
        path: '/new-slider',
        component: CreatePage
    },
    {
        path: '/slider/details/:url',
        component: ViewPage
    }
]