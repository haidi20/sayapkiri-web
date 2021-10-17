// ketika set date_news
// maka date_start = date_news - 5
// date_stop = date_news + 2

// impact => low, medium, high
// description type = "textarea"


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
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="data.date_news" id="date_news" type="datetime-local" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Date Start
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="data.date_start" id="date_start" type="datetime-local" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Date Stop
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="data.date_stop" id="date_stop" type="datetime-local" >
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
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Action</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Pair</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Date News</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Date Start</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Date Stop</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Impact</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Description</th>
                        </tr>
                        <tr v-for="(item, index) in table"  :key="index">
                            <td class="border px-5 py-4 text-xs">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                                    Edit
                                </button>
                                <button @click="remove(item.pid_news)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    Delete
                                </button>
                            </td>
                            <td class="border px-5 py-4 text-xs">{{item.pair}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.date_news}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.date_start}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.date_stop}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.impact}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.desc}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<script>
import axios from 'axios';
// import {baseUrl} from '@/helpers';
import MainLayout from '@/components/_default/MainLayout';

const initialState = () => {
    return {
        pair: "",
        date_news: "",
        date_start: "",
        date_stop: "",
        impact: "",
        desc: "",
    };
}

export default {
    data(){
        return {
            token: localStorage.getItem('token'),
            loading: false,
            data: initialState(),
            table: [],
            toast: () => {},            
        };
    },
    components: {
        MainLayout
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            let that = this;

            await axios.post(process.env.VUE_APP_BASE_URL + "api/news/getData",
                            {},
                            {headers: { Authorization: `Bearer `+ that.token}})
                        .then(function ({data}) {
                            if(data.status) {
                                that.table = data.data;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
        },
        async handleSubmit() {
            let that = this;
            this.loading = true;

            await axios.post(process.env.VUE_APP_BASE_URL + "api/news/store", 
                            this.data, 
                            {headers: { Authorization: `Bearer ${that.token}`}})
                        .then(function ({data}) {
                            if(data.status != undefined && data.status) {
                                that.$swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 2000,
                                })
                                .fire({
                                    icon: "success",
                                    title: data.remark
                                });
                            }else if(data.status != undefined && !data.status) {
                                that.$swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 2000,
                                })
                                .fire({
                                    icon: "warning",
                                    title: data.remark
                                });

                                console.log(data.remark);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => {
                            this.data = initialState();
                            this.loading = false;
                            this.getData();
                        });
        },
        async remove(pid_news) {    
            let that = this;        
            let foundNews = this.table.filter(item => item.pid_news == pid_news)[0];

            return await this.$swal.fire({
                icon: 'question',
                title: 'Do you want to delete this data ?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.post(process.env.VUE_APP_BASE_URL + "api/news/delete", 
                            foundNews, 
                            {headers: { Authorization: `Bearer ${that.token}`}})
                        .then(function ({data}) {
                            if(data.status != undefined && data.status) {
                                that.$swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 2000,
                                })
                                .fire({
                                    icon: "success",
                                    title: data.remark
                                });

                                that.getData();
                            }else if(data.status != undefined && !data.status) {
                                that.$swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 2000,
                                })
                                .fire({
                                    icon: "warning",
                                    title: data.remark
                                });

                                console.log(data.remark);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else if (result.isDenied) {
                    this.$swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
    }
    
}
</script>