<template>
  <div class="bg-gray-100 flex items-center justify-center pb-20 w-full">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-full w-full flex flex-col md:flex-row mx-8 ">
      <!-- Left Section: Contact Information -->
      <div class="md:w-1/2 py-4 px-40">
        <div class="flex items-center mb-4 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 inline-block mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
            />
          </svg>
          +84 967 724 934
        </div>
        <div class="flex items-center mb-4 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 inline-block mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
            />
            <path
              d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
            />
          </svg>
          thoquan150903@gmail.com
        </div>
        <div class="flex items-center font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 inline-block mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          69 - Nhân Trạch - Phú Lương - Hà Đông - Hà Nội
        </div>
      </div>
      <!-- Right Section: Branding and Social Links -->
      <div class="md:w-1/2 p-4 flex flex-col items-center justify-center">
        <h2 class="text-3xl font-bold text-indigo-700 mb-6">EvoERP</h2>
        <div class="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            class="w-10 h-10 -mr-0 bg-indigo-700 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-indigo-700 transition-all duration-300 transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
              />
            </svg>
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            class="w-10 h-10 bg-indigo-700 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-indigo-700 transition-all duration-300 transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0788.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.385-.3984-.8745-.6083-1.2495a.077.077 0 00-.0788-.037 19.7363 19.7363 0 00-4.8851 1.515.0699.0699 0 00-.032.0277C.5336 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0311 1.5374 4.0013 2.5341 5.9049 3.3056a.0748.0748 0 00.0809-.0258c.4528-.6166.8856-1.2718 1.2409-1.9486a.0742.0742 0 00-.0412-.1046c-.6273-.2568-1.2268-.5127-1.8291-.7654a.073.073 0 01-.031-.0387.0738.0738 0 01.0177-.0728c.1243-.1013.2522-.1956.3802-.2889a.0749.0749 0 01.078-.009c3.8372 1.7434 7.9905 1.7434 11.7856 0a.0743.0743 0 01.0778.009c.1281.0933.256.1876.3802.2889a.0747.0747 0 01.0178.0728.0714.0714 0 01-.031.0387c-.6024.2527-1.202.5086-1.8292.7654a.0739.0739 0 00-.0412.1046c.3553.6768.7882 1.332 1.2409 1.9486a.0756.0756 0 00.0809.0258c1.9036-.7715 3.8738-1.7682 5.9049-3.3056a.0773.0773 0 00.0312-.0561c.4604-5.0499-.9988-9.579-3.8799-13.6882a.0365.0365 0 00-.0322-.0277zM8.8274 15.3786c-1.0995 0-2.0007-.9763-2.0007-2.177 0-1.2007.9012-2.177 2.0007-2.177 1.0995 0 2.0007.9763 2.0007 2.177 0 1.2007-.9012 2.177-2.0007 2.177zm6.3452 0c-1.0995 0-2.0007-.9763-2.0007-2.177 0-1.2007.9012-2.177 2.0007-2.177 1.0995 0 2.0007.9763 2.0007 2.177 0 1.2007-.9012 2.177-2.0007 2.177z"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            class="w-10 h-10 bg-indigo-700 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-indigo-700 transition-all duration-300 transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>

</style>