<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="app-container">
    <Navbar />
    <router-view />
    <Footer v-if="!$route.meta.standalone" />
  </div>
</template>

<style>
/* Global styles are imported in main.js via style.css */
</style>
