const decode = require('jwt-decode');
import { expressUrl } from '@/common/index'
export default {
    user() {
        const token = localStorage.getItem('token') || null;
        let user = {};

        if (token) {
            user = decode(token);
            return user;
        }
        return null;
    },
    serverUrl() {
        return expressUrl;
    }
}