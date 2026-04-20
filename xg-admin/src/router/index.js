import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import StudentList from '../views/StudentList.vue'
import SchoolAdministration from '../views/SchoolAdministration.vue'
import Major from '../views/Major.vue'
import Technique from '../views/Technique.vue'
import Achievement from '../views/Achievement.vue'
import Parameter from '../views/Parameter.vue'
import Questions from '../views/Questions.vue'





const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/student-list',
    children: [
      {
        path: '/student-list',
        component: StudentList
      },
      {
        path:'/schoolAdministration',
        component:SchoolAdministration
      },
      {
        path:'/major',
        component:Major
      },
      {
        path:'/technique',
        component:Technique
      },
      {
        path:'/achievement',
        component:Achievement
      },
      {
        path:'/parameter',
        component:Parameter
      },
      {
        path:'/questions',
        component:Questions
      },
    ]
  },
  {
    path: '/login',
    component: Login
  }
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
