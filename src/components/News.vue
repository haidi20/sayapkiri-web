<template>
    <main-layout>
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-4">
            <div class="col-span-1">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
                    <p class="mb-5 text-3xl">Form News</p>
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
            <div class="w-full col-span-3">
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p class="mb-5 text-3xl">Data News</p>
                    <table class="shadow-lg bg-white w-full">
                        <tr>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Pair</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Date News</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Date Start</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Date Stop</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Impact</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Description</th>
                        </tr>
                        <tr>
                            <td class="border px-5 py-4">1</td>
                            <td class="border px-5 py-4">2</td>
                            <td class="border px-5 py-4">3</td>
                            <td class="border px-5 py-4">4</td>
                            <td class="border px-5 py-4">5</td>
                            <td class="border px-5 py-4">6</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<script>
import axios from 'axios';
import {baseUrl} from '@/helpers';
import MainLayout from '@/components/_default/MainLayout';
export default {
    data(){
        return {
            loading: false,
            defaultData: {
                pair: "",
                date_news: "",
                date_start: "",
                date_stop: "",
                impact: "",
                desc: "",
            },
            data: {
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
            const token = localStorage.getItem('token');

            await axios.post(baseUrl + "api/news/store", this.data, {headers: { Authorization: `Bearer ${token}` }})
                .then(function ({data}) {

                    alert(data.remark);                    
                }).finally(() => {
                    this.data = this.defaultData;
                    this.loading = false;
                });
        }
    }
}
</script>