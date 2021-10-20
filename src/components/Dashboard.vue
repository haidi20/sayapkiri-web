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
                                    <!-- {{item.account_name}} -->
                                   {{sortName(item.account_name)}}
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
                                <div
                                    :class="colorProfit(item.profit)" 
                                    class=" font-bold text-2xl ">
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
        <button type="button" @click="refresh" class="bg-white border-4 border-green-300 text-white font-bold py-2 px-2 rounded-lg focus:outline-none focus:shadow-outline btn-refresh">
            <!-- <span style="display: inline;" :class="{'mr-2': loading }" >Refresh</span> -->
            <img width="20" v-if="!loading" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABMElEQVRoge3VMU4CQRgF4PcvDhSWWxqskEJMjJV6B7yA2hoKsyegoeEEdsQSj+AZjA1SSCHYGWxtmEKEHQuUOCzLbuVM8b5qMzvvTf5NJgsQERERERGRG7JusTKKSlIMG2JwDuDgZ/kZQFdpdAa11jSt8L+ziQGqb80dzNU9YA5TzumjMKsPy+2xD1lrgMooKgUqfNxQ8ht7Uhonf7+Iq2xgvS6GjewSADBHX9vxlQ9ZewCYi+yS5e5LH7LWADDYz1+0vGROs0HarhxiH7IrA8ggb4sk9rrJWgMYie/yFhmg60PWHmD60QHQzyoRoKc0bn3IWgO87t18ojCrbyoToIdAzlb/iq6yiUs8LLfHSssxIJFAHgBMAEwWz3K9peX0Zbf1vu4QV1kiIiIiIiJy4Rsl38s195Cu+gAAAABJRU5ErkJggg=="/>
            <img style="display: inline;" v-if="loading" width="20" src="data:image/png;base64,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"/>
        </button>
    </main-layout>
</template>

<script>
    import moment from 'moment';
    import axios from 'axios';
    import MainLayout from '@/components/MainLayout'
    export default {
        data() {
            return {
                loading: false,
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
                this.loading = true;

                await axios.post(process.env.VUE_APP_BASE_URL + "api/dashboard/last-data",
                        this.request, {
                            headers: {
                                Authorization: `Bearer ` + that.token
                            }
                        })
                    .then(function(data) {
                        if (data.status) {
                            that.loading = false;
                            that.table = data.data;
                        }
                    })
                    .catch(error => {
                        that.loading = false;
                        console.log(error);
                    });
            },
            refresh() {
                this.getLast();
            },
            formatDate(date) {
                return moment(date).format('DD MMM YYYY hh:mm');
            },
            colorProfit(profit) {
                return profit <= 0 ? 'text-red-500' : 'text-green-500';
            },
            sortName(name) {
                return name.substring(0, 20) ;
            }
        }
    }
</script>

<style lang="css" scoped>
    .btn-refresh {
        position: fixed;
        right: 15px;
        bottom: 30px;
    }
</style>