<script setup>
const sections = [
  {
    title: 'Information We Collect',
    blocks: [
      {
        sub: 'Personal Information',
        text: 'We may collect personal information when you:',
        list: [
          'Register for an account or request a demo',
          'Contact us via forms, email, or phone',
          'Use our Services (for example, as a fleet manager, driver, or device user)'
        ],
        after: ['Types of personal data may include:'],
        list2: [
          'Name and contact details (email, phone)',
          'Company/business information',
          'Billing/payment information',
          'Job title or role'
        ]
      },
      {
        sub: 'Device and Location Data',
        text: 'When you use our Services (via tracking devices, mobile apps, or web portals), we collect:',
        list: [
          'GPS / location data',
          'Device identifiers',
          'Telemetry data (speed, fuel level, engine metrics, etc.)',
          'IP address',
          'Network information (mobile network, Wi-Fi)'
        ]
      },
      {
        sub: 'Usage Data',
        text: 'We collect data about how you use our Site and Services:',
        list: ['Pages you visit', 'Time spent on pages', 'Features used', 'Cookies and similar tracking technologies']
      }
    ]
  },
  {
    title: 'How We Use Your Information',
    blocks: [
      {
        text: 'We use the information we collect to:',
        list: [
          'Provide, operate, and maintain our Services',
          'Improve and personalise the user experience',
          'Communicate with you (e.g., support, updates, marketing)',
          'Send you billing information',
          'Monitor and analyse usage and trends',
          'Ensure security and prevent fraud'
        ]
      }
    ]
  },
  {
    title: 'Sharing Your Information',
    blocks: [
      {
        text: 'We may share your information with:',
        list: [
          'Service providers (hosting, analytics, customer support)',
          'Business partners who support our Services',
          'Regulatory or legal entities if required by law',
          'Affiliated companies for business operations'
        ],
        after: ['We do not sell your personal data to third parties for marketing purposes.']
      }
    ]
  },
  {
    title: 'Data Retention',
    paragraphs: [
      'We retain your personal information for as long as necessary to fulfil the purposes described in this Privacy Policy, including legal, accounting, or reporting requirements.'
    ]
  },
  {
    title: 'Security',
    paragraphs: [
      'We take reasonable measures to protect your information, including encryption, secure data storage, and access controls. However, no internet system is completely secure, and we cannot guarantee absolute protection.'
    ]
  },
  {
    title: 'Your Rights',
    blocks: [
      {
        text: 'Depending on your jurisdiction, you may have certain rights regarding your personal data, such as:',
        list: [
          'Access your data',
          'Correct or update your data',
          'Delete your data',
          'Restrict or object to processing',
          'Data portability'
        ],
        after: ['To exercise these rights, please contact us using the details below.']
      }
    ]
  },
  {
    title: 'Cookies & Tracking Technologies',
    blocks: [
      {
        text: 'We use cookies and similar technologies to:',
        list: [
          'Enable the core functionality of our Site',
          'Analyse Site usage and performance',
          'Support marketing and communication'
        ],
        after: [
          'You can manage cookie preferences through your browser settings, though disabling certain cookies may affect Site functionality.'
        ]
      }
    ]
  },
  {
    title: 'Third-Party Services',
    paragraphs: [
      'Our Services may integrate with third-party platforms for analytics, hosting, or other functionality. These third parties may collect data in accordance with their own privacy policies.'
    ]
  },
  {
    title: 'International Transfers',
    paragraphs: [
      'If your data is transferred outside your country, we will ensure appropriate safeguards are in place (such as standard contractual clauses) to protect your privacy.'
    ]
  },
  {
    title: "Children's Privacy",
    paragraphs: [
      "Our Services are not intended for children under 16 (or the applicable local age). We do not knowingly collect personal information from children without obtaining their parents' consent."
    ]
  },
  {
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. We will notify you by posting the new policy on this page with a new "Last Updated" date. Please review this page periodically.'
    ]
  }
];
</script>

<template>
  <div class="page-wrap">
    <section class="page-hero">
      <div class="container">
        <div class="page-hero__inner">
          <nav class="breadcrumbs">
            <router-link to="/">Home</router-link>
            <span>/</span>
            <span>Privacy Policy</span>
          </nav>
          <span class="eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
          <p class="subtitle">
            How OneGPS collects, uses and protects the information you share with us.
          </p>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="legal-body">
          <p class="legal-meta">OneGPS &middot; Last Updated: 24/11/2025</p>

          <p>
            OneGPS ("we," "us," "our") operates this website (the "Site") and provides GPS tracking,
            telematics, and related solutions ("Services"). We are committed to protecting your
            privacy and ensuring transparency about how your information is collected, used, and
            shared.
          </p>
          <p>
            By using our Site or Services, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </p>

          <template v-for="section in sections" :key="section.title">
            <h2>{{ section.title }}</h2>

            <p v-for="paragraph in section.paragraphs || []" :key="paragraph">{{ paragraph }}</p>

            <template v-for="block in section.blocks || []" :key="block.text">
              <h3 v-if="block.sub">{{ block.sub }}</h3>
              <p>{{ block.text }}</p>
              <ul v-if="block.list">
                <li v-for="item in block.list" :key="item">{{ item }}</li>
              </ul>
              <p v-for="paragraph in block.after || []" :key="paragraph" style="margin-top: 0.85rem;">
                {{ paragraph }}
              </p>
              <ul v-if="block.list2">
                <li v-for="item in block.list2" :key="item">{{ item }}</li>
              </ul>
            </template>
          </template>

          <h2>Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please get in touch with us:
          </p>
          <ul>
            <li>Email: <a href="mailto:info@onegps.africa" class="highlight">info@onegps.africa</a></li>
            <li>Support: <a href="mailto:support@onegps.africa" class="highlight">support@onegps.africa</a></li>
            <li>Address: Kasoa, Human Rights Road, Accra, Ghana</li>
            <li>Phone: <a href="tel:+233207949676" class="highlight">(+233) 20-794-9676</a></li>
          </ul>

          <router-link to="/contact" class="btn-outline btn-large" style="margin-top: 2.5rem;">
            Contact Us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
