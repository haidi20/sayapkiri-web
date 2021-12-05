<template>
    <main-layout>
        <div class="grid md:mt-28 mt-10 md:mx-6">
            <!-- start table desktop -->
            <div class="bg-white shadow-md rounded pt-4 hidden-mobile px-2">
                <p class="text-3xl mb-5">Transaction RN</p>
                <div class="flex flex-row">
                    <div class="mb-4">
                        <label class="label-custom">Name</label>
                        <input class=" input-custom " type="text" v-model="request.user" >
                    </div>
                    <div class=" ml-2 ">
                        <label class="label-custom">Account</label>
                        <input class=" input-custom " type="text" v-model="request.account" >
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
                </div>
                
                <vue-good-table  
                    :rows="rows"
                    :columns="columns"
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

export default {
    data(){
        return {
            token: localStorage.getItem("token"),
            rows: [],
            request: {
                user: null,
                account: null,
                stop_date: moment().format('YYYY-MM-DD'),
                start_date: moment().startOf('month').format('YYYY-MM-DD'),
            },
            paginationOptions: {
                perPage: 15,
                enabled: true,
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
    },
    mounted() {
        this.getTransactionRn();
    },
    methods: {
        async getTransactionRn() {
            let that = this;

            await axios
                .post(
                    process.env.VUE_APP_BASE_URL + "api/transaction-rn",
                    this.request,
                    { headers: { Authorization: `Bearer ` + that.token } }
                )
                .then((responses) => {
                    let status = responses.data.status;
                    let data = responses.data.data;

                    if (status) {
                        this.rows = data;
                    }
                })
                .catch((error) => {
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
        customNumber(number) {
            // return Intl.NumberFormat(2).format(number);
            if (number !== null || number !== undefined) {
                return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            }
        },
    }
}
</script>