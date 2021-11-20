const routes = [
    {
        path: "/",
        name: 'home',
        component: home
    },
    {
        path: "/unit",
        name: 'unit',
        component: unit
    },
    {
        path: "/school",
        name: 'school',
        component: school
    }
];

const router = new VueRouter({
    routes
});

new Vue({
    router
}).$mount('#app');