<template>
    <main-layout>
        <div class="grid md:mt-16 md:ml-6 mt-6 ml-2 ">
            <div class=" w-auto bg-white shadow-md rounded py-8 px-4 overflow-scroll ">
                <p class="mb-5 text-3xl">Last Data</p>
                <table class="shadow-lg bg-white w-full md:block lg:block sm:hidden hidden ">
                    <tr>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Account</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Account Name</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >ea enable</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Floating</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Profit</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Equity</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Trade</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Broker Time</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Created Date</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Float Max</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Float Trade</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Float Date</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Day</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Row num</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >DD</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Location</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Balance</th>
                        <th class="text-white border text-center px-8 py-4 bg-blue-450 " >Pnlday</th>
                    </tr>
                    <tr v-if="loading">
                        <td  class=" text-center " colspan="8">Loading</td>
                    </tr>
                    <tr v-for="(item, index) in table"  :key="index">
                        <td class="border px-5 py-4 text-xs">{{item.account}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.account_name}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.ea_enable}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.floating}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.profit}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.equity}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.trade}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.broker_time}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.created_date}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.float_max}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.float_trade}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.float_date}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.day}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.rownum}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.dd}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.location}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.balance}}</td>
                        <td class="border px-5 py-4 text-xs">{{item.pnlday}}</td>
                    </tr>
                </table>
                <table 
                    class=" shadow-lg bg-white w-full block sm:block md:hidden lg:hidden ">
                    <tr 
                        v-for="(item, index) in table" 
                        :key="index">
                        <td class="text-sm flex flex-col w-full ">
                           <div class="flex flex-row ">
                                <div class="  label-custom-mobile "> Location </div>
                                <div class="w-full pl-2 py-1 "> {{item.location}} </div>
                            </div>
                            <div class="flex flex-row justify-between ">
                                <div class=" label-custom-mobile "> Account </div>
                                <div class="w-full pl-2 py-1 "> {{item.account_name}} </div>
                            </div>
                            <div class="flex flex-row w-full justify-between ">
                                <div class=" label-custom-mobile "> Profit </div>
                                <div class="w-full pl-2 py-1 "> {{item.profit}} {{item.pnlday}}% </div>
                            </div>
                            <div class="flex flex-row w-full justify-between ">
                                <div class=" label-custom-mobile "> Equity </div>
                                <div class="w-full pl-2 py-1 "> {{item.equity}} </div>
                            </div>
                            <div class="flex flex-row w-full justify-between ">
                                <div class=" label-custom-mobile "> Floating </div>
                                <div class="w-full pl-2 py-1 "> {{item.floating}} {{item.dd}}% </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </main-layout>
</template>

<style lang="postcss" scoped>

</style>

<script>
import axios from 'axios';
import MainLayout from '@/pages/MainLayout';

    export default {
        data() {
            return {
                token: localStorage.getItem('token'),
                table: {},
                loading: false,
                request: {
                    sorted_by: "trade_desc",
                },
            }
        },
        components: {
            MainLayout,
        },
         mounted() {
            this.getLastData();
        },
        methods: {
            async getLastData() {
                let that = this;
                this.loading = true;

                await axios.post(process.env.VUE_APP_BASE_URL + "api/dashboard/last-data",
                            this.request,
                                {headers: { Authorization: `Bearer `+ that.token}})
                            .then(responses => {
                                let status = responses.data.status;
                                let data = responses.data.data;

                                if(status){
                                    this.table = data;
                                    this.loading = false;
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
            }
        },
    }
</script>

// // version mobile
// location ea enable (hijau bundar)
// account
// profit and pnlday %
// equity
// floating and dd %