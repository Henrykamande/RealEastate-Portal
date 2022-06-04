const Index = () => import('./index.vue');
const CreatePage = () => import('./_pages/create.vue');
const ViewPage = () => import('./_pages/view.vue');

export default [
    {
        path: '/vehicles',
        component: Index
    },
    {
        path: '/new/vehicle',
        component: CreatePage
    },
    {
        path: '/vehicle/details/:url',
        component: ViewPage
    }
]