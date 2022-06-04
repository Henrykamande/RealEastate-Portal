const Login = () => import('./login.vue');
const ResetPassword = () => import('./reset.vue');
const Register = () => import('./register.vue');

export default [
    {
        path: '/login',
        name: 'LoginRoute',
        component: Login
    },
    {
        path: '/reset/password',
        name: 'PasswordResetRoute',
        component: ResetPassword
    },
    {
        path: '/register',
        name: 'RegistrationRoute',
        component: Register
    }
];