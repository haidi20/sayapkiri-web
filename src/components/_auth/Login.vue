<template>
    <div class="flex items-center h-screen w-full" style="background-color: #4680FE">
      <div class="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
      <span class="block w-full text-3xl mb-4 text-center">Signin</span>      
        <form class="mb-4" @submit.prevent="handleSubmit">
          
          <div class="mb-4 md:w-full">
            <label for="email" class="block text-xs mb-1">Email</label>
            <input class="w-full border rounded p-2 outline-none focus:shadow-outline" v-model="data.email" type="text" name="email" id="email">
          </div>
          <div class="mb-6 md:w-full">
            <label for="password" class="block text-xs mb-1">Password</label>
            <input class="w-full border rounded p-2 outline-none focus:shadow-outline" v-model="data.password" type="password" name="password" id="password" placeholder="Password">
          </div>
          <button type="submit" class="bg-green-500 hover:bg-green-700 text-white w-full text-sm font-semibold px-4 py-2 rounded">Signin</button>
        </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
           data: {
             email: "cybersmd96@gmail.com",
             password: "Ranger0010!",
           }
        }
    },
    methods: {
      async handleSubmit() {    
        let that = this;
        await axios.post(process.env.VUE_APP_BASE_URL + "login", that.data)
                  .then(({data}) => {
                    console.log(data);

                      if(data.status) {
                          let token = data.data.token;

                          localStorage.setItem("token", token);
                          this.$router.push({name: "dashboard"});
                      }
                  })
                  .catch(error => {
                      console.log(error);
                  });
      }
    }
}
</script>
<style lang="">
    
</style>