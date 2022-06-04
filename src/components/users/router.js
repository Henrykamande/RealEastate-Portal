const UsersIndex = () => import('./users/index.vue');
const CreatePage = () => import('./users/_pages/create.vue');
const AuthIndex = () => import('./authorization/index.vue');

export default [
    {
        path: '/users',
        name: 'Users',
        component: UsersIndex
    },
    {
        path: '/new-user',
        component: CreatePage
    },
    {
        path: '/authorization',
        name: 'Authorization',
        component: AuthIndex
    }
]
    
