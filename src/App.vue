<script setup>
import { RouterView } from "vue-router";
import TotalAverage from "./components/TotalAverage.vue";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="container">
    <!-- Component to display total and daily average expenses -->
    <TotalAverage />
    <!-- Navigation component -->
    <Nav />
    <!-- RouterView component renders the matched component for the current route -->
    <div class="view">
      <RouterView />
    </div>
  </div>
  <Footer />
</template>
