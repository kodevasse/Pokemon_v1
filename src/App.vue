<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "@/components/layout/NavBar.vue";
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
