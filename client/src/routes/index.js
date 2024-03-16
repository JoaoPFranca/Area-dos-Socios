import {createRouter, createWebHashHistory} from "vue-router";
import Home from '../components/HomePage.vue';
import Feed from "@/components/Feed.vue";
import Comments from "@/components/Comments.vue";
const routes = [
    { path: '/', component: Home},
    { path: '/home', component: Feed},
    { path: '/comments/:postId', component: Comments}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
