<template>
    <main-layout>
        <div class="grid md:mt-28 mt-10 md:mx-6">
            <div class="bg-white shadow-md rounded-2xl md w-full md:w-1/4 pb-4 pt-4 px-2 md:mt-0 mt-4">
                <label class="label-custom">
                    Date
                </label>
                <input 
                    type="date" 
                    @input="onChooseDate"
                    class="input-custom w-1/2 p-2" 
                    v-model="request.date_now" >
                <p class="inline-block ml-3" v-if="loading">loading...</p>
            </div>
            <div class="bg-white shadow-md rounded-2xl pt-4 px-2 pb-4 mt-4">
                <p class="text-3xl mb-5">Balance Begin of the Month</p>
                <div class="md:w-1/2">
                    <div class="mt-6 shadow-md w-full md:w-1/4 p-4 rounded-lg inline-block ">
                        <span>
                            USC
                        </span>
                        <span class="float-right">
                            {{balanceBeginMonth.usc}}
                        </span>
                    </div>
                    <div class="mt-4 shadow-md w-full md:w-1/4 p-4 rounded-lg inline-block md:ml-4 ">
                        <span>
                            USD
                        </span>
                        <span class="float-right">
                            {{balanceBeginMonth.usd}}
                        </span>
                    </div>
                    <div class="mt-4 shadow-md w-full md:w-1/4 p-4 rounded-lg inline-block md:ml-4 ">
                        <span>
                            IDR
                        </span>
                        <span class="float-right">
                            {{balanceBeginMonth.idr}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="bg-white shadow-md rounded-2xl pt-4 px-2 pb-4 mt-6">
                <p class="text-3xl mb-5">Equity Now</p>
                <div class="md:w-1/2">
                    <div class="mt-6 shadow-md w-full md:w-1/4 p-4 rounded-lg inline-block ">
                        <span>
                            USC
                        </span>
                        <span class="float-right">
                            {{equityNow.usc}}
                        </span>
                    </div>
                    <div class="mt-4 shadow-md w-full md:w-1/4 p-4 rounded-lg inline-block md:ml-4 ">
                        <span>
                            USD
                        </span>
                        <span class="float-right">
                            {{equityNow.usd}}
                        </span>
                    </div>
                    <div class="mt-4 shadow-md w-full md:w-1/4 p-4 rounded-lg inline-block md:ml-4 ">
                        <span>
                            IDR
                        </span>
                        <span class="float-right">
                            {{equityNow.idr}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="bg-white shadow-md rounded-2xl pt-4 px-2 pb-4 mt-6">
                <div class="md:w-1/2">
                    <div class=" shadow-md w-full md:w-1/3 p-4 rounded-lg inline-block ">
                        <span>
                            Growth
                        </span>
                        <span class="float-right">
                            {{growth}}
                        </span>
                    </div>
                    <div class="mt-4 shadow-md w-full md:w-1/3 p-4 rounded-lg inline-block md:ml-4 ">
                        <span>
                            Average Daily
                        </span>
                        <span class="float-right">
                            {{avgDaily}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<script>
import MainLayout from "@/pages/MainLayout";
import { http } from '@/http.js';

export default {
    data() {
        return {
            loading: false,
            activetab: 1,
            request: {
                date_now: null,
            },
            equityNow: {
                usd: 0,
                usc: 0,
                idr: 0,
            },
            balanceBeginMonth: {
                usd: 0,
                usc: 0,
                idr: 0,
            },
            growth: 0,
            avgDaily: 0,
        }
    },
    components: {
        MainLayout
    },
    mounted() {
        // this.getGrowth();
        // this.getCountEquityNow();
        // this.getCountBalanceBeginMonth();
    },
    methods: {
        onChooseDate() {
            this.getGrowth();
            this.getCountEquityNow();
            this.getCountBalanceBeginMonth();
        },
        async getGrowth() {
            this.loading = true;

            await http("api/dashboard/growth", {date: this.request.date_now})
                .then(responses => {
                    let status = responses.data.status;
                    let data = responses.data.data;

                    if(status){
                        this.growth = data.growthResult;
                    }

                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async getCountEquityNow() {
            this.loading = true;

            await http("api/dashboard/equity-now", {date: this.request.date_now})
                .then(responses => {
                    let status = responses.data.status;
                    let data = responses.data.data;

                    if(status){
                        this.equityNow.usd = data.totalUSD;
                        this.equityNow.usc = data.totalUSC;
                        this.equityNow.idr = data.totalIDR;
                    }

                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async getCountBalanceBeginMonth() {
            this.loading = true;

            await http("api/dashboard/begin-month", {date: this.request.date_now})
                .then(responses => {
                    let status = responses.data.status;
                    let data = responses.data.data;

                    if(status){
                        this.balanceBeginMonth.usd = data.totalUSD;
                        this.balanceBeginMonth.usc = data.totalUSC;
                        this.balanceBeginMonth.idr = data.totalIDR;
                    }

                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
}
</script>

<style lang="postcss" scoped>

    .container { 
        margin: 40px auto;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9em;
        color: #888;
    }

    /* Style the tabs */
    .tabs {
        overflow: hidden;
        margin-left: 20px;
        margin-bottom: -2px; 
    }

    .tabs ul {
        list-style-type: none;
        margin-left: 20px;
    }

    .tabs a{
        float: left;
        cursor: pointer;
        padding: 12px 24px;
        transition: background-color 0.2s;
        border: 1px solid #ccc;
        border-right: none;
        background-color: white;
        border-radius: 10px 10px 0 0;
        font-weight: bold;
    }
    .tabs a:last-child { 
        border-right: 1px solid #ccc;
    }

    /* Change background color of tabs on hover */
    .tabs a:hover {
        background-color: #aaa;
        color: #fff;
    }

    /* Styling for active tab */
    .tabs a.active {
        background-color: #fff;
        color: #484848;
        border-bottom: 2px solid #fff;
        cursor: default;
    }

    /* Style the tab content */
    .tabcontent {
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 3px 3px 6px #e1e1e1
    }
</style>