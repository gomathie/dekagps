import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

/**
 * Routes mirror the information architecture of the reference site.
 * The service pages keep their short, top-level paths (/fleet-management) and
 * expose the longer /services/<slug> URLs as aliases so both the navigation and
 * the marketing links resolve without a redirect.
 *
 * `meta.title` and `meta.description` drive <title> and <meta name="description">
 * (see the afterEach hook below), so every route must carry both.
 */
const DEFAULT_DESCRIPTION =
  'OneGPS delivers GPS tracking and telematics solutions for businesses: real-time vehicle tracking, fuel monitoring, driver behaviour reporting and IoT devices.'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'GPS Tracking & Telematics Solutions',
      description: DEFAULT_DESCRIPTION
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue'),
    meta: {
      title: 'Our Services',
      description:
        'Explore OneGPS services: fleet management, fuel monitoring, driver behaviour, tracking solutions, IoT smart homes, web services and telematics.'
    }
  },

  /* ── Services ── */
  {
    path: '/fleet-management',
    alias: '/services/fleet-management',
    name: 'FleetManagement',
    component: () => import('../views/Services/FleetManagement.vue'),
    meta: {
      title: 'Fleet Management',
      description:
        'OneGPS fleet management software: real-time tracking, geofencing, fuel and driver data, maintenance scheduling and reporting in one telematics platform.'
    }
  },
  {
    path: '/fuel-monitoring',
    alias: '/services/fuel-monitoring',
    name: 'FuelMonitoring',
    component: () => import('../views/Services/FuelMonitoring.vue'),
    meta: {
      title: 'Fuel Monitoring System',
      description:
        'Fuel monitoring with capacitive level sensors: live fuel readings, consumption reports and drain alerts that expose fuel theft across your fleet.'
    }
  },
  {
    path: '/driver-behavior',
    alias: '/services/driver-behavior',
    name: 'DriverBehavior',
    component: () => import('../views/Services/DriverBehavior.vue'),
    meta: {
      title: 'Driver Behavior',
      description:
        'Monitor driver behaviour with OneGPS: harsh braking, acceleration, speeding, idling and night-driving reports that cut fuel spend and accidents.'
    }
  },
  {
    path: '/tracking-solutions',
    alias: '/services/tracking-solutions',
    name: 'TrackingSolutions',
    component: () => import('../views/Services/TrackingSolutions.vue'),
    meta: {
      title: 'Tracking Solutions',
      description:
        'GPS tracking solutions for cars, trucks, motorcycles, trailers and heavy equipment, with geofencing, alerts and immobilisation options.'
    }
  },
  {
    path: '/iot-smart-homes',
    alias: '/services/iot-smart-homes',
    name: 'IoTSmartHomes',
    component: () => import('../views/Services/IoTSmartHomes.vue'),
    meta: {
      title: 'IoT and Smart Homes',
      description:
        'IoT and smart home solutions from OneGPS: remote monitoring, sensor telemetry and connected device control for homes and small businesses.'
    }
  },
  {
    path: '/web-services',
    alias: '/services/web-services',
    name: 'WebServices',
    component: () => import('../views/Services/WebServices.vue'),
    meta: {
      title: 'Web Services',
      description:
        'OneGPS web services include REST API integration, custom dashboards and automated reporting that connect telematics data to your ERP and BI tools.'
    }
  },
  {
    path: '/telematics',
    alias: '/services/telematics',
    name: 'Telematics',
    component: () => import('../views/Telematics.vue'),
    meta: {
      title: 'Telematics',
      description:
        'OneGPS telematics combines GNSS devices with CAN bus and OBD-II data, fuel sensors and platform analytics for complete fleet visibility.'
    }
  },
  {
    path: '/vehicle-leasing-solution',
    alias: ['/services/vehicle-leasing-solution', '/lease-management'],
    name: 'VehicleLeasing',
    component: () => import('../views/VehicleLeasing.vue'),
    meta: {
      title: 'Vehicle Leasing GPS Tracking Solution',
      description:
        'Vehicle leasing GPS tracking gives lessors live location, usage and mileage data, geofencing alerts and recovery support for financed vehicles.'
    }
  },

  /* ── Industries ── */
  {
    path: '/industries',
    name: 'Industries',
    component: () => import('../views/Industries.vue'),
    meta: {
      title: 'Industries We Serve',
      description:
        'OneGPS works across nine demanding sectors, including logistics, courier and delivery, oil and gas, agriculture, construction and security.'
    }
  },
  {
    path: '/smart-farming',
    alias: '/industries/smart-farming',
    name: 'SmartFarming',
    component: () => import('../views/Industries/SmartFarming.vue'),
    meta: {
      title: 'Smart Farming',
      description:
        'Smart farming with OneGPS: track tractors, harvesters and implements, monitor utilisation and protect agricultural assets with live telemetry.'
    }
  },
  {
    path: '/industries/perfect-fit',
    alias: ['/perfect-fit-for-any-industry', '/perfect-fit'],
    name: 'PerfectFit',
    component: () => import('../views/PerfectFit.vue'),
    meta: {
      title: 'Perfect Fit for Any Industry',
      description:
        'See how OneGPS fleet tracking adapts to any industry, from scooter tracking to full fleet digitalisation with business-intelligence reporting.'
    }
  },

  /* ── Conversion & resources ── */
  {
    path: '/book-a-demo',
    name: 'BookADemo',
    component: () => import('../views/BookADemo.vue'),
    meta: {
      title: 'Book a Demo',
      description:
        'Book a live OneGPS demo: see real-time tracking, fuel monitoring and reporting on your own fleet, plus a tailored rollout and pricing plan.'
    }
  },
  {
    path: '/contact',
    alias: '/get-in-touch',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: {
      title: 'Contact Us',
      description:
        "Contact the OneGPS team in Accra, Ghana: call +233-20-794-9676, email info@onegps.africa or send a message and we'll reply within one business day."
    }
  },
  {
    path: '/faq',
    alias: '/frequently-asked-questions',
    name: 'Faq',
    component: () => import('../views/Faq.vue'),
    meta: {
      title: 'FAQ',
      description:
        'Answers to common questions about OneGPS trackers, installation, subscriptions, data accuracy, mobile access and technical support.'
    }
  },
  /* ── Resources ── */
  {
    path: '/docs',
    name: 'Docs',
    component: () => import('../views/Docs.vue'),
    meta: {
      title: 'User Guide',
      description:
        'The complete OneGPS user guide: platform basics, tracking, reports, fuel monitoring, mobile apps and integrations — searchable, per version.'
    }
  },
  {
    path: '/docs/api',
    redirect: '/docs/api/v3'
  },
  {
    path: '/docs/api/v2',
    name: 'ApiDocsV2',
    component: () => import('../views/ApiDocs.vue'),
    meta: {
      standalone: true,
      title: 'Standard API Reference',
      description: 'OneGPS Standard API v2 reference with endpoints, parameters and request examples.'
    }
  },
  {
    path: '/docs/api/v3',
    name: 'ApiDocsV3',
    component: () => import('../views/ApiDocs.vue'),
    meta: {
      standalone: true,
      title: 'NextGen API Reference',
      description: 'OneGPS NextGen API v3 reference with Bearer authentication, JSON payloads and telematics endpoints.'
    }
  },
  {
    path: '/docs/:version',
    name: 'DocsVersion',
    component: () => import('../views/Docs.vue'),
    meta: {
      title: 'User Guide',
      description:
        'Browse the OneGPS user guide by version: sections, page counts and the full documentation for that release.'
    }
  },
  {
    path: '/docs/:version/:slug',
    name: 'DocsPage',
    component: () => import('../views/Docs.vue'),
    meta: {
      title: 'User Guide',
      description: 'Step-by-step OneGPS product documentation.'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue'),
    meta: {
      title: 'Blog',
      description:
        'News, guides and insights on GPS tracking, fleet telematics, fuel monitoring and IoT from the OneGPS team.'
    }
  },
  {
    path: '/technical-support',
    alias: '/support',
    name: 'TechnicalSupport',
    component: () => import('../views/TechnicalSupport.vue'),
    meta: {
      title: 'Technical Support',
      description:
        'OneGPS technical support: installation help, device configuration and troubleshooting for fleet operators, installers and partners.'
    }
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import('../views/Pricing.vue'),
    meta: {
      title: 'Pricing',
      description:
        'Transparent OneGPS pricing from $15 per vehicle per month, with monthly or annual billing, hardware options and volume pricing for larger fleets.'
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
    meta: {
      title: 'Privacy Policy',
      description:
        'How OneGPS collects, uses, stores and protects personal data and vehicle telematics data across our tracking services.'
    }
  },

  /* ── Fallback ── */
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Page Not Found',
      description:
        'The page you requested could not be found. Browse OneGPS services, industries, pricing and support, or book a demo instead.'
    }
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

const base = 'OneGPS'

/**
 * A client-side navigation does not reload the document, so the metadata that
 * lives in index.html has to be re-applied on every route change — otherwise
 * the description of the first page visited would stick for the whole session.
 */
const setMeta = (attribute, key, content) => {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

router.afterEach((to) => {
  const newTitle = to.meta?.title ? `${to.meta.title} | ${base}` : `${base} | GPS Tracking & Telematics`
  const description = to.meta?.description || DEFAULT_DESCRIPTION

  document.title = newTitle
  setMeta('name', 'description', description)
  setMeta('property', 'og:title', newTitle)
  setMeta('property', 'og:description', description)

  // Send pageview to Google Analytics on route change
  if (typeof gtag !== 'undefined') {
    gtag('config', 'G-F5BVYX6K72', {
      page_path: to.path,
      page_title: newTitle
    })
  }
})

export default router
