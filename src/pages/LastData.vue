<template>
    <main-layout>
        <div class="grid md:mt-16 md:ml-6 mt-6 ml-2 ">
            <div class=" w-auto bg-white shadow-md rounded py-8 px-4 overflow-scroll ">
                <p class="mb-5 text-3xl">Last Data</p>
                <table class="shadow-lg bg-white w-full ">
                    <tr>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Account</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Account Name</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">ea enable</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Floating</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Profit</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Equity</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Trade</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Broker Time</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Created Date</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Float Max</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Float Trade</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Float Date</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Day</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Row num</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">DD</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Location</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Balance</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Pnlday</th>
                        <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">User</th>
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
                        <td class="border px-5 py-4 text-xs">{{item.name_user}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </main-layout>
</template>

<style lang="scss" scoped>

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