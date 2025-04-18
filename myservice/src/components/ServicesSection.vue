<template>
  <section class="text-white mt-20 -z-1" id="services">
    <div class="px-4 xl:pl-16">
      <h2 class="text-4xl font-bold text-indigo-700 mb-4">
        Các dịch vụ của chúng tôi
      </h2>
    </div>
    <div
      class="py-8 xl:px-16 px-4 sm:py-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"
    >
      <div
        v-for="service in services"
        :key="service.id"
        class="px-8 py-12 rounded-xl shadow-lg border-[#1f1641] backdrop-blur-sm bg-white/10 -z-1"
      >
        <div class="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
          <div>
            <img :src="service.icon" alt="service icon" />
          </div>
        </div>
        <div class="text-center">
          <h3
            class="pt-8 text-lg font-black uppercase text-indigo-700 lg:text-xl"
          >
            {{ service.name }}
          </h3>
          <p class="text-indigo-700 font-medium pt-4 text-sm group-hover:text-white md:text-base">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
const services = ref([
  {
    id: 1,
    icon: "https://img.icons8.com/ios-filled/100/ffffff/google-code.png",
    name: "WEB DEVELOPMENT",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!",
  },
  {
    id: 2,
    icon: "https://img.icons8.com/external-vectorslab-glyph-vectorslab/100/fffeee/external-Technical-Writing-mobile-app-development-vectorslab-glyph-vectorslab.png",
    name: "Technical Writing",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!",
  },
  {
    id: 3,
    icon: "https://img.icons8.com/external-solid-design-circle/100/ffffff/external-Mobile-Development-digital-marketing-solid-design-circle.png",
    name: "Mobile Development",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!",
  },
  {
    id: 4,
    icon: "https://img.icons8.com/ios-filled/100/ffffff/email-open.png",
    name: "WEB DEVELOPMENT",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!",
  },
  {
    id: 5,
    icon: "https://img.icons8.com/ios-filled/100/ffffff/windows10-personalization.png",
    name: "Graphic Design",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!",
  },
  {
    id: 6,
    icon: "https://img.icons8.com/ios-filled/100/ffffff/web-design.png",
    name: "Web Design",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!",
  },
]);
</script>
