<template>
    <main-layout>
        <div class="grid md:grid-cols-4 md:gap-5 ">
            <div v-for="(item, index) in table.data" class="max-w-sm overflow-hidden my-2 shadow-lg hover:shadow-2xl rounded-lg transform duration-200 cursor-pointer" :key="index">
                <div class="mx-6 border-b grid">
                    <div class="row flex my-4">
                        <div class="flex-1">
                            <div class="grid">
                                <div class=" text-lg font-bold "> 
                                    {{item.account}}
                                </div>
                                <div class=" text-green-600 ">
                                    {{item.account_name}}
                                </div>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="grid">
                                <div class=" text-right ">
                                    <strong>{{item.ea_enable ? "Active" : "not active"}} </strong>
                                </div>
                                <div class=" text-xs text-right ">
                                    <!-- Aync: 17 Oct 21 15:09 -->
                                    Sync: {{formatDate(item.broker_time)}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex my-4">
                        <div class="flex-1">
                            <div class="grid">
                                <div class="">
                                    <strong> Floating </strong>
                                </div>
                                <div class=" text-red-500 font-bold text-2xl ">
                                    {{item.floating}}
                                </div>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="grid text-right">
                                <div class=" font-bold  ">
                                    Profit/Day
                                </div>
                                <div class="text-green-500 font-bold text-2xl ">
                                    {{item.profit}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" flex text-center bg-green-500 text-white py-2 ">
                    <div class="flex-1">
                        <div class="grid">
                            <div class="text-lg font-bold ">
                                {{item.trade}}
                            </div>
                            <div class="text-sm">
                                Open
                            </div>
                        </div>                     
                    </div>
                    <div class="flex-1">
                        <div class="grid">
                            <div class="text-lg font-bold ">
                                {{item.equity}}
                            </div>
                            <div class="text-sm ">
                                Equity USC
                            </div>
                        </div>                      
                    </div>
                    <div class="flex-1">
                        <div class="grid">
                            <div class="text-lg font-bold ">
                                {{item.free_margin}}
                            </div>
                            <div class="text-sm">
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
    import moment from 'moment';
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
            },
            formatDate(date) {
                return moment(date).format('DD MMM YYYY hh:mm');
            }
        }
    }
</script>