<template>
  <div class="flex flex-col items-center h-screen w-full align-middle justify-center " style="background-color: #4680FE">
    <div v-if="error" class="w-full text-center md:max-w-sm mb-2 ">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Sorry! </strong>
        <span class="block sm:inline mr-3 "> {{showMessageError}} </span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg @click="closeAlert" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
    </div>
    <div class="w-full bg-white rounded shadow-lg p-8 md:max-w-sm md:mx-auto">
      <span class="block w-full text-3xl mb-4 text-center">Signin</span>      
      <form class="mb-4" @submit.prevent="handleSubmit">
        
        <div class="mb-4 md:w-full">
          <label for="email" class="block text-xs mb-1">Email</label>
          <input class="w-full border rounded p-2 outline-none focus:shadow-outline" v-model="form.email" type="text" name="email" id="email">
        </div>
        <div class="mb-6 md:w-full">
          <label for="password" class="block text-xs mb-1">Password</label>
          <input class="w-full border rounded p-2 outline-none focus:shadow-outline" v-model="form.password" type="password" name="password" id="password" placeholder="Password">
        </div>
        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white w-full text-sm font-semibold px-4 py-2 rounded">Signin</button>
      </form>
    </div>
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
            async handleSubmit() {
                let that = this;
                await axios.post(process.env.VUE_APP_BASE_URL + "login", this.form)
                    .then(({
                        data
                    }) => {
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
<style lang="">

</style>