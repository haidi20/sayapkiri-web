<template>
    <main-layout>
        <div class="grid grid-cols-2">
            <div class="w-full max-w-xs">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
                    <p class="mb-5 text-3xl">Form News</p>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Token
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="data.token" id="token" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Pair
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="data.pair" id="pair" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Date News
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="data.date_news" id="date_news" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Date Start
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="data.date_start" id="date_start" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Date Stop
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="data.date_stop" id="date_stop" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Impact
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="data.impact" id="impact" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="data.desc" id="desc" type="text" >
                    </div>
                    <div class="flex items-center justify-between">
                        <button type="submit" 
                            class="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                            >
                            Kirim
                        </button>
                        <span >{{loading ? "loading" : ""}}</span>
                    </div>
                </form>
            </div>
            <div class="">
                table
            </div>
        </div>
    </main-layout>
</template>

<script>
import MainLayout from '@/components/_default/MainLayout'
export default {
    data(){
        return {
            loading: false,
            data: {
                token: "",
                pair: "",
                date_news: "",
                date_start: "",
                date_stop: "",
                impact: "",
                desc: "",
            }            
        };
    },
    components: {
        MainLayout
    },
    methods: {
         async handleSubmit() {
            this.loading = true;

            try {
                const response = await fetch("https://api.sayapkiri.net/api/news/store", {
                                    method: 'POST',
                                    body: JSON.stringify(data),
                                    headers: { 
                                        'Content-type': 'application/json; charset=UTF-8',
                                        'Authorization': 'Bearer ' + this.data.token,
                                    },
                                });

                const data = await response.json();

                console.log(data);

                // this.employees = data;

                alert(data.remark);
                this.loading = false;
            } catch (error) {
                console.error(error);

                alert('gagal input data');

                this.loading = false;
            }
         }
    }
}
</script>