<script setup>
import { ref } from "vue";

const services = ref([
  {
    id: 1,
    icon: "ri-store-line",
    name: "Quản lý kho",
    description:
      "Tối ưu hóa quy trình quản lý tồn kho, theo dõi hàng hóa và tự động hóa nhập/xuất kho.",
  },
  {
    id: 2,
    icon: "ri-money-dollar-circle-line",
    name: "Kế toán tài chính",
    description:
      "Quản lý dòng tiền, lập báo cáo tài chính và theo dõi các giao dịch kế toán chính xác.",
  },
  {
    id: 3,
    icon: "ri-user-settings-line",
    name: "Quản lý nhân sự",
    description:
      "Tự động hóa chấm công, quản lý hồ sơ nhân viên và tính toán lương thưởng hiệu quả.",
  },
  {
    id: 4,
    icon: "ri-shopping-cart-line",
    name: "Quản lý bán hàng",
    description:
      "Theo dõi đơn hàng, quản lý khách hàng và tối ưu hóa quy trình bán hàng toàn diện.",
  },
  {
    id: 5,
    icon: "ri-building-3-line",
    name: "Quản lý sản xuất",
    description:
      "Lập kế hoạch sản xuất, theo dõi tiến độ và quản lý nguyên vật liệu hiệu quả.",
  },
  {
    id: 6,
    icon: "ri-more-fill",
    name: "Các chức năng khác",
    description:
      "Hỗ trợ nhiều module bổ sung như CRM, quản lý dự án, phân tích dữ liệu, v.v.",
  },
]);
</script>

<template>
  <section class="text-white mt-20 -z-1" id="services">
    <div class="px-4 xl:pl-16">
      <h2 class="text-4xl font-bold text-indigo-700 mb-4">
        Các dịch vụ của chúng tôi
      </h2>
    </div>
    <div
      class="py-8 xl:px-16 px-4 sm:py-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3 z-[0]"
    >
      <div
        v-for="service in services"
        :key="service.id"
        class="px-8 py-12 rounded-xl shadow-lg border-[#1f1641] backdrop-blur-sm bg-white/10 -z-1 group transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 cursor-pointer"
      >
        <div class="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
          <div class="flex justify-center text-5xl text-indigo-700 text-8xl">
            <i :class="service.icon"></i>
          </div>
        </div>
        <div class="text-center">
          <h3
            class="pt-8 text-lg font-black uppercase text-indigo-700 lg:text-xl"
          >
            {{ service.name }}
          </h3>
          <p class="text-indigo-700 font-medium pt-4 text-sm group-hover:text-indigo-700 md:text-base">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>