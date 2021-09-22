import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from "../views/login";
import Add from "../views/Add";
import Change_name from "../views/Change_name";
import History from "../views/History";
import date_filter from "../views/date_filter";
import Day_list from "../components/Day_list";
import Category from "../components/Category";
import Menu from "../components/Menu";
import Delivery from "../views/Delivery";
import Register from "../views/Register";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes:[
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/login',
        name: 'login',
        component: login
      },
      {
        path: "/add",
        name:'add',
        component: Add
      },
      {
        path: "/change",
        name:'change',
        component: Change_name,
        props: true
      },
      {
        path: "/history",
        name:'history',
        component: History,
        props: true
      },
      {
        path: "/date",
        name:'date',
        component: date_filter,
        props: true
      },
      {
        path: "/day_list",
        name:'list',
        component: Day_list,
        props: true
      },
      {
        path: "/category",
        name:'category',
        component: Category,
        props: true
      },
      {
        path: "/menu",
        name:'menu',
        component: Menu,
        props: true
      },
      {
        path: "/delivery",
        name:'delivery',
        component: Delivery,
        props: true
      },
      {
        path: "/signup",
        name:'register',
        component: Register,
        props: true
      },
    ]
})

export default router

