const Index = () => import('./index.vue');
const CreatePage = () => import('./_pages/create.vue');
const ViewPage = () => import('./_pages/view.vue');

export default [
    {
        path: '/waterreadings',
        component: Index
    },
    {
        path: '/new/waterreadings',
        component: CreatePage
    },
    {
        path: '/readings/details/:url',
        component: ViewPage
    }
]