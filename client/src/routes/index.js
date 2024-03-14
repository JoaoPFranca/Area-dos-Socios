import {createRouter, createWebHashHistory} from "vue-router";
import Home from '../components/HomePage.vue';
import Feed from "@/components/Feed.vue";
const routes = [
    { path: '/', component: Home},
    { path: '/home', component: Feed},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
