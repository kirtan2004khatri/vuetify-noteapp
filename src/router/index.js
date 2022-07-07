import Vue from 'vue'
import VueRouter from 'vue-router'
import NoteApp from '../views/NoteVue.vue'
import HomeView from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },,
  {
    path:'/notes',
    name:'notes',
    component:NoteApp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
