<template>
    <main-layout>
        <div class="grid grid-cols-3">
            <div v-for="(item, index) in table.data" class="max-w-sm overflow-hidden my-2 shadow-lg hover:shadow-2xl rounded-lg transform duration-200 cursor-pointer" :key="index">
                <div class="mx-6 border-b border-gray-light grid">
                    <div class="row flex my-4">
                        <div class="flex-1">
                            <div class="grid">
                                <div class="row">
                                    {{item.account}}
                                </div>
                                <div class="row">
                                    {{item.account_name}}
                                </div>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="grid">
                                <div class="row">
                                    {{item.ea_enable ? "active" : "not active"}}
                                </div>
                                <div class="row">
                                    <!-- Aync: 17 Oct 21 15:09 -->
                                    Async: {{item.broker_time}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row flex my-4">
                        <div class="flex-1">
                            <div class="grid">
                                <div class="row">
                                    Floating
                                </div>
                                <div class="row">
                                    {{item.floating}}
                                </div>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="grid">
                                <div class="row">
                                    Profit/Day
                                </div>
                                <div class="row">
                                    {{item.profit}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" flex text-center bg-green-500 text-white py-2 ">
                    <div class="flex-1">
                        <div class="grid">
                            <div class="row text-lg">
                                {{item.trade}}
                            </div>
                            <div class="row text-sm">
                                Open
                            </div>
                        </div>                     
                    </div>
                    <div class="flex-1">
                        <div class="grid">
                            <div class="row text-lg ">
                                {{item.equity}}
                            </div>
                            <div class="row text-sm ">
                                Equity USC
                            </div>
                        </div>                      
                    </div>
                    <div class="flex-1">
                        <div class="grid">
                            <div class="row text-lg">
                                {{item.free_margin}}
                            </div>
                            <div class="row text-sm">
                                Free Margin
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        <div class="relative">
            <button type="button" @click="refresh" class="fixed bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                refresh
            </button>
        </div>
    </main-layout>
</template>

<script>
    import axios from 'axios';
    import MainLayout from '@/components/MainLayout'
    export default {
        data() {
            return {
                token: localStorage.getItem('token'),
                table: [],
            }
        },
        components: {
            MainLayout
        },
        mounted() {
            this.getLast();
        },
        methods: {
            async getLast() {
                let that = this;

                await axios.post(process.env.VUE_APP_BASE_URL + "api/dashboard/last-data",
                        this.request, {
                            headers: {
                                Authorization: `Bearer ` + that.token
                            }
                        })
                    .then(function(data) {
                        if (data.status) {
                            that.table = data.data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            refresh() {
                this.getLast();
            }
        }
    }
</script>