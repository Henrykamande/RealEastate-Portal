const Index = () => import('./index.vue');
const CreatePage = () => import('./_pages/create.vue');
const ViewPage = () => import('./_pages/view.vue');

export default [
    {
        path: '/services',
        component: Index
    },
    {
        path: '/new/service',
        component: CreatePage
    },
    {
        path: '/service/details/:url',
        component: ViewPage
    }
]