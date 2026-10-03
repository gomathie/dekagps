<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="app-container">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<style>
/* Global styles are imported in main.js via style.css */
</style>
