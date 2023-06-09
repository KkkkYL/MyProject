import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
// import CourseList from '../views/courses/CourseList.vue'
// import CourseEdit from '../views/courses/CourseEdit.vue'
import ResourseCrud from '../views/ResourceCrud.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children:[
      {name:'home', path:'/',component:Home},
      {name:'courses-crud', path:'/:resource/list',component:ResourseCrud,props:true},

      // {name:'courses-list', path:'/courses/list',component:CourseList},
      // {name:'courses-edit', path:'/courses/edit/:id',component:CourseEdit,props:true},
      // {name:'courses-create', path:'/courses/create',component:CourseEdit},

    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
