import { http } from '@/http.js';

import moment from 'moment';
import MainLayout from "@/pages/MainLayout";
import { VueGoodTable } from 'vue-good-table-next';
import AccountInputUser from '@/components/AccountInputUser';

export default {
    data() {
        return {
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
                start_date: moment().format('YYYY-MM-DD'),
            },
            paginationOptions: {
                perPage: 100,
                enabled: true,
                mode: 'pages',
                perPageDropdown: [100, 200, 500, 1000],
            },
            columns: [{
                    label: 'Broker Time',
                    field: 'broker_time',
                },
                {
                    label: 'Floating',
                    field: 'floating',
                    // type: 'double',
                },
                {
                    label: 'DD',
                    field: 'dd',
                },
                {
                    label: 'Profit',
                    field: this.fnProfit,
                    // type: 'double',
                },
                {
                    label: 'pnl Day',
                    field: 'pnlday',
                },
                {
                    label: 'pnl Month',
                    field: 'pnlmonth',
                },
                {
                    label: 'Balance',
                    field: 'custom_initial_balance',
                    // type: 'double',
                },
                {
                    label: 'Equity',
                    field: this.fnEquity,
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
                    label: 'WD',
                    field: this.fnWd,
                },
                {
                    label: 'Depo',
                    field: this.fnDepo,
                },
                // {
                //     label: 'Free Margin',
                //     field: this.fnFreeMargin,
                // },
                // {
                //     label: 'Trade',
                //     field: 'trade',
                //     type: 'number',
                // },

                // {
                //     label: 'Float Trade',
                //     field: 'float_trade',
                //     type: 'number',
                // },
            ],
        }
    },
    components: {
        MainLayout,
        VueGoodTable,
        AccountInputUser,
    },
    mounted() {
        this.getTransactionDetail();
        this.getAllUser();
    },
    methods: {
        async getTransactionDetail() {
            this.loading = true;

            await http("api/transaction/detail", this.request)
                .then(responses => {
                    let status = responses.data.status;
                    let data = responses.data.data;

                    if (status) {
                        this.rows = data;
                    }

                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);

                    this.loading = false;
                });
        },
        async getAllUser() {
            let that = this;

            await http("api/user/getAllUser", this.request)
                .then(responses => {
                    let status = responses.data.status;
                    let data = responses.data.data;

                    if (status) {
                        that.listUser = data;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async getDataAccount() {
            let that = this;

            await http("api/account/findByUser", { "pid_user": that.pidUser })
                .then(responses => {
                    let status = responses.data.status;
                    let data = responses.data.data;

                    if (status) {
                        that.accountsByUser = data;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        fnProfit(row) {
            return this.customNumber(row.profit);
        },
        fnEquity(row) {
            return this.customNumber(row.equity);
        },
        fnFreeMargin(row) {
            return this.customNumber(row.free_margin);
        },
        fnFloatMax(row) {
            return this.customNumber(row.float_max);
        },
        fnWd(row) {
            return this.customNumber(row.wd);
        },
        fnDepo(row) {
            return this.customNumber(row.depo);
        },
        onChooseUser(user) {
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