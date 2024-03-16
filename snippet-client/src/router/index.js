import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Profile from '../components/Profile.vue';
import Register from '../components/Register.vue';
import Snippets from '../components/Snippets.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/profile/:id', component: Profile },
    { path: '/snippets', component: Snippets},
    { path: '/snippets', component: Snippets, name: "snippet"}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;