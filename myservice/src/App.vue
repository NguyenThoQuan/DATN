<template>
  <img class="hidden" alt="logo" src="./assets/logo.png" />
  <div class="min-h-screen">
    <Suspense>
      <template #default>
        <div>
          <ServicesSection />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
const ServicesSection = defineAsyncComponent(() =>
  import("@/components/ServicesSection.vue")
);
</script>
<style>
* {
  scrollbar-width: thin;
  scrollbar-color: #111827 #f1f1f1;
}
</style>
