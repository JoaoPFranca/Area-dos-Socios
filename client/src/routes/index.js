import {createRouter, createWebHashHistory} from "vue-router";
import Home from '../components/HomePage.vue';
const routes = [
    { path: '/', component: Home},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
