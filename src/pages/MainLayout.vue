<template lang="">
    <div
      class=" ">      
      <div class="flex flex-col w-full">
        <header class="z-30 md:py-4 py-2 w-full shadow-md dark:bg-gray-800 fixed bg-blue-450">
          <div class="hidden-mobile pl-14">
            <a
              class="text-2xl font-bold text-white "
              href="#"
            >
              SayapKiri
            </a>
            <svg xmlns="http://www.w3.org/2000/svg" @click="toggleLeftBar" fill="currentColor" class="bi bi-list w-7 text-white ml-20 cursor-pointer " style="display:inline" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </div>
          <div class="show-mobile ">
            <svg 
              class="bi bi-list w-7 text-white ml-5 m-0 cursor-pointer float-left "
              xmlns="http://www.w3.org/2000/svg" style="display:inline" @click="toggleLeftBar" fill="currentColor"  viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <p
              class=" text-white font-bold text-2xl ml-20 "
              style="display:inline" >
              SayapKiri
            </p>
          </div>
        </header>
        <div class=" flex flex-row w-full h-full align-middle ">
          <div 
            :class="leftNavbar"
            class="col-span-1  " > 
            <aside
              style="position: fixed"
              class=" z-10 md:pt-10 pt-4 h-full transition-all duration-300  overflow-hidden shadow-md bg-white dark:bg-gray-800 md:block flex-shrink-0"
              :class="actionLeftBar"
            >
              <div class="py-6 text-gray-500 dark:text-gray-400 ">
                <ul class="mt-2">
                  <li class="relative">
                    <!-- <span
                      class="absolute inset-y-0 left-0 w-1 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span> -->
                    <router-link
                      class="router-link"
                      to="/dashboard"
                    >
                      <svg
                        class="w-6 h-6 "
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
                      <span class=" ml-4 text-2xl ">Dashboard</span>
                    </router-link>
                  </li>
                </ul>
                <ul>
                  <li class="relative">
                    <router-link
                      class="router-link"
                      to="/last-data"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-file-earmark-bar-graph w-6 h-6" viewBox="0 0 16 16">
                        <path d="M10 13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v6zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z"/>
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                      </svg>
                      <span class="ml-4 text-2xl">Last Data</span>
                    </router-link>
                  </li>
                </ul>
                <ul>
                  <li class="relative">
                    <router-link
                      class="router-link"
                      to="/news"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-newspaper w-6 h-6 " viewBox="0 0 16 16">
                        <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
                        <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
                      </svg>
                      <span class="ml-4 text-2xl">News</span>
                    </router-link>
                  </li>
                </ul>
                <ul>
                  <li class="relative">
                    <router-link
                      class="router-link"
                      to="/user"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person w-6 h-6 " viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                      </svg>
                      <span class="ml-4 text-2xl">User</span>
                    </router-link>
                  </li>
                </ul>
                <ul>
                  <li class="relative">
                    <router-link
                      class="router-link"
                      to="/account"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-credit-card w-6 h-6 " viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                      <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                    </svg>
                    <span class="ml-4 text-2xl">Account</span>
                    </router-link>
                  </li>
                </ul>
                <ul>
                  <li class="relative">
                    <router-link
                      class="router-link"
                      to="/account-balance"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cash-coin w-6 h-6 " viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                      </svg>
                      <span class="ml-4 text-2xl">Balance</span>
                    </router-link>
                  </li>
                </ul>

                <ul>
                  <li 
                    @click="logout"
                    class="relative">
                    <a
                      class="router-link"
                      href="#"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-box-arrow-left w-6 h-6 " viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                      </svg>
                      <span class="ml-4 text-2xl">Logout</span>
                    </a>
                  </li>
                </ul>              
              </div>
            </aside>
          </div>
          <div class="w-full" >
            <slot />
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="postcss">
  .router-link {
      @apply inline-flex items-center w-full text-sm text-gray-700 font-semibold 
      transition-colors duration-150 px-6 py-4 
      hover:bg-blue-450 hover:text-white
  }
  .router-link-active {
      @apply text-white bg-blue-450
  }
  .input-custom {
      @apply border w-full py-2 px-3 border-gray-300 text-black
      overflow-hidden rounded-md shadow-sm
      focus:outline-none        
  }
  .label-custom {
      @apply block text-black text-sm font-bold mb-2
  }
  .th-desktop {
    @apply text-white border text-center py-1 bg-blue-450      
  }
  .label-custom-mobile {
      @apply w-1/2 font-bold bg-blue-450 text-white pl-5 py-1
  }
  .th-mobile {
      @apply text-white text-center
      border px-3 py-1 bg-blue-450
  }
  .td-mobile {
      @apply border px-2 py-1
  }
  .hidden-mobile {
      @apply hidden sm:hidden md:block lg:block
  }
  .show-mobile {
      @apply block sm:hidden md:hidden lg:hidden
  }
  .btn-send {
      @apply bg-green-500 text-white border-2 font-bold py-2 px-4 rounded-lg
              hover:bg-green-700 hover:text-white 
  }
  .btn-cancel {
      @apply bg-white text-red-500 border-2 border-red-500 font-bold py-2 px-4 float-right rounded-lg           
              hover:bg-red-500 hover:text-white
  }
</style>
<script>
    export default {
        data() {
            return {
                showLeftMenu: window.innerWidth <= 760 ? false : true,
                isActive: true,
            }
        },
        computed: {
            menuActive() {
                return {
                    'text-gray-800': this.isActive,
                }
            },
            actionLeftBar() {
                return {
                  'w-60': this.showLeftMenu,
                  'w-0': !this.showLeftMenu,
                  'fixed': window.innerWidth <= 760 ? true : false,
                }
            },
            leftNavbar() {
              return this.showLeftMenu ? 'md:mr-60' : 'md:mr-0';
            },
        },
        methods: {
            toggleLeftBar() {
                this.showLeftMenu = !this.showLeftMenu;
            },
            logout() {
              localStorage.removeItem('token');

              this.$router.push({name: "login"});
            },
        }
    }
</script>