<template>
    <div
      class="min-h-screen flex flex-col items-center justify-center bg-blue-450"
    >
      <div
        class="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-80
          max-w-md
        "
      >
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Sayap Kiri
        </div>
        <!-- <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access account
        </div> -->

        <div class="mt-10">
          <form action="#" @submit.prevent="onSubmit">
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >E-Mail Address:</label
              >
              <div class="relative">
                <!-- <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <i class="fas fa-at text-blue-500"></i>
                </div> -->

                <input
                  id="email"
                  type="email"
                  name="email"
                  v-model="form.email"
                  class="
                    text-sm
                    placeholder-gray-500
                    pl-6
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label
                for="password"
                class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >Password:</label
              >
              <div class="relative">
                <!-- <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <span>
                    <i class="fas fa-lock text-blue-500"></i>
                  </span>
                </div> -->

                <input
                  id="password"
                  type="password"
                  name="password"
                  v-model="form.password"
                  class="
                    text-sm
                    placeholder-gray-500
                    pl-6
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div class="flex w-full">
              <button
                type="submit"
                class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
              >
                <span class="mr-2 uppercase">Login</span>
                <span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- <div class="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          class="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
        >
          <span class="ml-2"
            >You have an account?
            <a
              href="#"
              class="text-xs ml-2 text-blue-500 font-semibold"
              >Login here</a
            ></span
          >
        </a>
      </div> -->
    </div>
</template>

<script>
    import moment from 'moment';
    import axios from 'axios';

    export default {
        data() {
            return {
                form: {
                    email: "cybersmd96@gmail.com",
                    password: "",
                },
                error: false,
                showMessageError: "",
            }
        },
        methods: {
            async onSubmit() {
                console.log('submit');
                let that = this;
                await axios.post(process.env.VUE_APP_BASE_URL + "login", this.form)
                    .then(responses => {
                        let data = responses.data;

                        if (data.status) {
                            let token = data.data.token;
                            let expiredAt = moment(data.data.expired_at).format('YYYY-MM-DD hh:mm:ss');

                            localStorage.setItem("expiredAt", expiredAt);
                            localStorage.setItem("token", token);
                            this.$router.push({
                                name: "dashboard"
                            });
                        } else if (!data.status) {
                            this.error = true;
                            that.showMessageError = data.remark;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            closeAlert() {
                this.error = false;
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>