<template lang="">
    <div
      class="flex h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Desktop sidebar -->
      <aside
        class="z-20 hidden w-60 overflow-y-auto shadow-md bg-white dark:bg-gray-800 md:block flex-shrink-0"
      >
        <div class="py-6 text-gray-500 dark:text-gray-400">
          <a
            class="ml-6 text-2xl font-bold text-gray-800 dark:text-gray-200"
            href="#"
          >
            Logo
          </a>
          <ul class="mt-6">
            <li class="relative px-6 py-3">
              <span
                class="absolute inset-y-0 left-0 w-1 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <router-link
                class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                to="/dashboard"
              >
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
                <span class="ml-4 text-2xl ">Dashboard</span>
              </router-link>
            </li>
          </ul>
          <ul>
            <li class="relative px-6 py-3">
              <router-link
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                to="/news"
              >
                <svg
                    class="w-6 h-6"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                </svg>
                <span class="ml-4 text-2xl">News</span>
              </router-link>
            </li>
          </ul>
          
        </div>
      </aside>
      <div class="flex flex-col flex-1 w-full">
        <header class="z-10 py-12 shadow-md dark:bg-gray-800" style="background-color: #4680FE">
          <div
            class="container flex items-center h-full px-6 mx-auto dark:text-purple-300"
          >
          </div>
        </header>
        <div class="container p-10">
          <slot />
        </div>
      </div>
    </div>
</template>
<script>
    export default {

    }
</script>
<style>

</style>