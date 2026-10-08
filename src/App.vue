<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const usesStandaloneLayout = computed(() => Boolean(route.meta.standalone));
</script>

<template>
  <div class="app-container">
    <Navbar v-if="!usesStandaloneLayout" />
    <router-view />
    <Footer v-if="!usesStandaloneLayout" />
  </div>
</template>

<style>
/* Global styles are imported in main.js via style.css */
</style>
