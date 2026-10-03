import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/fleet-management',
    name: 'FleetManagement',
    component: () => import('../views/Services/FleetManagement.vue')
  },
  {
    path: '/fuel-monitoring',
    name: 'FuelMonitoring',
    component: () => import('../views/Services/FuelMonitoring.vue')
  },
  {
    path: '/driver-behavior',
    name: 'DriverBehavior',
    component: () => import('../views/Services/DriverBehavior.vue')
  },
  {
    path: '/tracking-solutions',
    name: 'TrackingSolutions',
    component: () => import('../views/Services/TrackingSolutions.vue')
  },
  {
    path: '/smart-farming',
    name: 'SmartFarming',
    component: () => import('../views/Industries/SmartFarming.vue')
  },
  {
    path: '/iot-smart-homes',
    name: 'IoTSmartHomes',
    component: () => import('../views/Services/IoTSmartHomes.vue')
  },
  {
    path: '/web-services',
    name: 'WebServices',
    component: () => import('../views/Services/WebServices.vue')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import('../views/Pricing.vue')
  },
  {
    path: '/industries',
    name: 'Industries',
    component: () => import('../views/Industries.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
