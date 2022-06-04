const Index = () => import('./index.vue');
const CreatePage = () => import('./_pages/create.vue');
const ViewPage = () => import('./_pages/view.vue');

export default [
    {
        path: '/sector',
        component: Index
    },
    {
        path: '/sector/create',
        component: CreatePage
    },
    {
        path: '/sector/details/:url',
        component: ViewPage
    }
]