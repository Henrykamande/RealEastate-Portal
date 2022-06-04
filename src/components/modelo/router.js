const Index = () => import('./index.vue');
const CreatePage = () => import('./_pages/create.vue');
const ViewPage = () => import('./_pages/view.vue');

export default [
    {
        path: '/modelo',
        component: Index
    },
    {
        path: '/new/modelo',
        component: CreatePage
    },
    {
        path: '/modelo/details/:url',
        component: ViewPage
    }
]