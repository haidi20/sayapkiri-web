<template>
    <main-layout>
        <div class="grid md:mt-28 mt-10 md:mx-6 overflow-x-scroll">
            <!-- start table desktop -->
            <div class="bg-white shadow-md rounded pt-4 px-2 ">
                <p class="text-3xl mb-5">Transaction Detail</p>
                <div class="flex flex-row">
                    <div class="mb-4">
                        <label class="label-custom">Name</label>
                        <account-input-user
                            :data="listUser"
                            :nameUser="nameUser"
                            @update:nameUser="nameUser = $event"
                            :chooseUser="chooseUser"
                        />
                    </div>
                    <div class=" ml-2 ">
                        <label class="label-custom">Account</label>
                        <select
                            name="account" 
                            v-if="accountsByUser.length > 0"
                            v-model="request.account"
                            class=" input-custom ">
                            <option v-for="(item, index) in accountsByUser" :value="item.account" :key="index">{{item.account}}</option>
                        </select>
                        <select 
                            name="account"
                            v-if="accountsByUser.length <= 0"
                            class=" input-custom ">
                            <option value="null">Empty Accounts</option>
                        </select>
                    </div>
                    <div class=" ml-2 ">
                        <label class="label-custom">Tgl</label>
                        <input class=" input-custom " type="date" v-model="request.start_date"  >
                    </div>
                    <div class="">
                        <div class="mb-7" ></div>
                        <input class=" ml-2 input-custom " type="date" v-model="request.stop_date"  >
                    </div>
                    <div>
                        <div class="mb-7" ></div>
                        <button 
                            type="submit" 
                            class=" ml-8 bg-green-500 text-white rounded-md p-2 "
                            @click="getTransactionRn">
                            Apply
                        </button>
                    </div>
                    <div class="ml-2">
                        <div class="mb-12" ></div>
                        <p v-if="loading">loading...</p>
                    </div>
                </div>
                
                <vue-good-table  
                    fixed-header
                    :rows="rows"
                    :columns="columns"
                    max-height="600px"
                    :pagination-options="paginationOptions">
                </vue-good-table>
            </div>
        </div>
    </main-layout>
</template>

<style lang="postcss" scoped>
    
</style>

<script>
import axios from "axios";
import moment from 'moment';
import MainLayout from "@/pages/MainLayout";
import { VueGoodTable } from 'vue-good-table-next';
import AccountInputUser from '@/components/AccountInputUser';

export default {
    data(){
        return {
            token: localStorage.getItem("token"),
            rows: [],
            listUser: [], 
            loading: false,
            pidUser: null,
            nameUser: null,
            accountsByUser: [],
            request: {
                user: null,
                account: null,
                stop_date: moment().format('YYYY-MM-DD'),
                start_date: moment().startOf('month').format('YYYY-MM-DD'),
            },
            paginationOptions: {
                perPage: 15,
                enabled: true,
                mode: 'pages',
                perPageDropdown: [15, 20, 50, 100],
            },
            columns: [
                {
                    label: 'Broker Time',
                    field: 'broker_time',
                },
                {
                    label: 'Floating',
                    field: 'floating',
                    // type: 'double',
                },
                {
                    label: 'Profit',
                    field: this.fnProfit,
                    // type: 'double',
                },
                {
                    label: 'Equity',
                    field: this.fnEquity,
                },
                {
                    label: 'Free Margin',
                    field: this.fnFreeMargin,
                },
                {
                    label: 'Trade',
                    field: 'trade',
                    type: 'number',
                },
                {
                    label: 'Trade Buy',
                    field: 'trade_buy',
                    type: 'number',
                },
                {
                    label: 'Trade Sell',
                    field: 'trade_sell',
                    type: 'number',
                },
                {
                    label: 'Float Max',
                    field: this.fnFloatMax,
                },
                {
                    label: 'Float Trade',
                    field: 'float_trade',
                    type: 'number',
                },
                {
                    label: 'WD',
                    field: this.fnWd,
                },
                {
                    label: 'Depo',
                    field: this.fnDepo,
                },
            ],
        }
    },
    components: {
        MainLayout,
        VueGoodTable,
        AccountInputUser,
    },
    mounted() {
        this.getTransactionRn();
        this.getAllUser();
    },
    methods: {
        async getTransactionRn() {
            let that = this;
            this.loading = true;

            await axios
                .post(
                    process.env.VUE_APP_BASE_URL + "api/transaction-detail",
                    this.request,
                    { headers: { Authorization: `Bearer ` + that.token } }
                )
                .then((responses) => {
                    let status = responses.data.status;
                    let data = responses.data.data;

                    if (status) {
                        this.rows = data;
                    }

                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);

                    this.loading = false;
                });
        },
        async getAllUser() {
            let that = this;

            await axios.post(process.env.VUE_APP_BASE_URL + "api/user/getAllUser",
                           this.request,
                            {headers: { Authorization: `Bearer `+ that.token}})
                        .then(responses => {
                            let status = responses.data.status;
                            let data = responses.data.data;

                            if(status) {
                                that.listUser = data;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
        },
        async getDataAccount() {
            let that = this;

            await axios.post(process.env.VUE_APP_BASE_URL + "api/account/findByUser",
                            {"pid_user": that.pidUser},
                            {headers: { Authorization: `Bearer `+ that.token}})
                        .then(responses => {
                            let status = responses.data.status;
                            let data = responses.data.data;

                            if(status) {
                                that.accountsByUser = data;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
        },
        fnProfit(row){
            return this.customNumber(row.profit);
        },
        fnEquity(row){
            return this.customNumber(row.equity);
        },
        fnFreeMargin(row){
            return this.customNumber(row.free_margin);
        },
        fnFloatMax(row){
            return this.customNumber(row.float_max);
        },
        fnWd(row){
            return this.customNumber(row.wd);
        },
        fnDepo(row){
            return this.customNumber(row.depo);
        },
        chooseUser(user) {
            this.pidUser = user.pid_user;

            this.getDataAccount();
        },
        customNumber(number) {
            // return Intl.NumberFormat(2).format(number);
            if (number !== null || number !== undefined) {
                return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            }
        },
    }
}
</script>