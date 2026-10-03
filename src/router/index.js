import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

/**
 * Routes mirror the information architecture of the reference site.
 * The service pages keep their short, top-level paths (/fleet-management) and
 * expose the longer /services/<slug> URLs as aliases so both the navigation and
 * the marketing links resolve without a redirect.
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'GPS Tracking & Telematics Solutions' }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue'),
    meta: { title: 'Our Services' }
  },

  /* ── Services ── */
  {
    path: '/fleet-management',
    alias: '/services/fleet-management',
    name: 'FleetManagement',
    component: () => import('../views/Services/FleetManagement.vue'),
    meta: { title: 'Fleet Management' }
  },
  {
    path: '/fuel-monitoring',
    alias: '/services/fuel-monitoring',
    name: 'FuelMonitoring',
    component: () => import('../views/Services/FuelMonitoring.vue'),
    meta: { title: 'Fuel Monitoring System' }
  },
  {
    path: '/driver-behavior',
    alias: '/services/driver-behavior',
    name: 'DriverBehavior',
    component: () => import('../views/Services/DriverBehavior.vue'),
    meta: { title: 'Driver Behavior' }
  },
  {
    path: '/tracking-solutions',
    alias: '/services/tracking-solutions',
    name: 'TrackingSolutions',
    component: () => import('../views/Services/TrackingSolutions.vue'),
    meta: { title: 'Tracking Solutions' }
  },
  {
    path: '/iot-smart-homes',
    alias: '/services/iot-smart-homes',
    name: 'IoTSmartHomes',
    component: () => import('../views/Services/IoTSmartHomes.vue'),
    meta: { title: 'IoT and Smart Homes' }
  },
  {
    path: '/web-services',
    alias: '/services/web-services',
    name: 'WebServices',
    component: () => import('../views/Services/WebServices.vue'),
    meta: { title: 'Web Services' }
  },
  {
    path: '/telematics',
    alias: '/services/telematics',
    name: 'Telematics',
    component: () => import('../views/Telematics.vue'),
    meta: { title: 'Telematics' }
  },
  {
    path: '/vehicle-leasing-solution',
    alias: ['/services/vehicle-leasing-solution', '/lease-management'],
    name: 'VehicleLeasing',
    component: () => import('../views/VehicleLeasing.vue'),
    meta: { title: 'Vehicle Leasing GPS Tracking Solution' }
  },

  /* ── Industries ── */
  {
    path: '/industries',
    name: 'Industries',
    component: () => import('../views/Industries.vue'),
    meta: { title: 'Industries We Serve' }
  },
  {
    path: '/smart-farming',
    alias: '/industries/smart-farming',
    name: 'SmartFarming',
    component: () => import('../views/Industries/SmartFarming.vue'),
    meta: { title: 'Smart Farming' }
  },
  {
    path: '/industries/perfect-fit',
    alias: ['/perfect-fit-for-any-industry', '/perfect-fit'],
    name: 'PerfectFit',
    component: () => import('../views/PerfectFit.vue'),
    meta: { title: 'Perfect Fit for Any Industry' }
  },

  /* ── Conversion & resources ── */
  {
    path: '/book-a-demo',
    name: 'BookADemo',
    component: () => import('../views/BookADemo.vue'),
    meta: { title: 'Book a Demo' }
  },
  {
    path: '/contact',
    alias: '/get-in-touch',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: { title: 'Contact Us' }
  },
  {
    path: '/faq',
    alias: '/frequently-asked-questions',
    name: 'Faq',
    component: () => import('../views/Faq.vue'),
    meta: { title: 'FAQ' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue'),
    meta: { title: 'Blog' }
  },
  {
    path: '/technical-support',
    alias: '/support',
    name: 'TechnicalSupport',
    component: () => import('../views/TechnicalSupport.vue'),
    meta: { title: 'Technical Support' }
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import('../views/Pricing.vue'),
    meta: { title: 'Pricing' }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
    meta: { title: 'Privacy Policy' }
  },

  /* ── Fallback ── */
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Page Not Found' }
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

router.afterEach((to) => {
  const base = 'OneGPS'
  document.title = to.meta?.title ? `${to.meta.title} | ${base}` : `${base} | GPS Tracking & Telematics`
})

export default router
