import Vue from 'vue'
import VueRouter from 'vue-router'
const login = ()=> import("views/login");
const register = ()=> import("views/register");
const teacher = ()=> import("views/teacher/teacher");
const teaching_work = ()=> import("views/teacher/t_work/teaching_work");
const researching_activity = ()=> import("views/teacher/researching_act/researching_activity");
const stu_projects = ()=> import("views/teacher/stu_projects/stu_projects");
const external_exchange = ()=> import("views/teacher/external_exchange/external_exchange");

Vue.use(VueRouter)

const routes = [
  {
    path: '/' ,
    redirect: '/login'
  } ,
  {
    path: '/login' ,
    component:login
  } ,
  {
    path: '/register' ,
    component:register
  } ,
  {
    path: '/teacher' ,
    component:teacher ,
    children: [
      {
        path: '' ,
        redirect:'teaching_work'
      } ,
      {
        path: 'teaching_work' ,
        component:teaching_work
      } ,
      {
        path: 'researching_activity' ,
        component: researching_activity
      } ,
      {
        path: 'stu_projects' ,
        component: stu_projects
      } ,
      {
        path: 'external_exchange' ,
        component: external_exchange
      }
    ]
  }

]

const router = new VueRouter({
  routes ,
  mode: 'history'
})

export default router
