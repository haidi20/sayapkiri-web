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
                start_date: moment().startOf('month').format('YYYY-MM-DD'),
            },
            paginationOptions: {
                perPage: 100,
                enabled: true,
                mode: 'pages',
                perPageDropdown: [100, 200, 500, 1000],
            },
            columns: [{
                    label: 'Day',
                    field: 'day',
                },
                {
                    label: 'Floating',
                    field: 'floating',
                    // type: 'double',
                },
                {
                    label: 'Profit',
                    field: 'custom_profit',
                    // type: 'double',
                },
                {
                    label: 'Equity',
                    field: 'custom_equity',
                },
                {
                    label: 'Free Margin',
                    field: 'custom_free_margin',
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
                    field: 'custom_float_max',
                },
                {
                    label: 'Float Trade',
                    field: 'float_trade',
                    type: 'number',
                },
                {
                    label: 'WD',
                    field: 'custom_wd',
                },
                {
                    label: 'Depo',
                    field: 'custom_depo',
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
        this.getTransactionDaily();
        this.getAllUser();
    },
    methods: {
        async getTransactionDaily() {
            this.loading = true;

            await http("api/transaction/daily", this.request)
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
        onChooseUser(user) {
            this.pidUser = user.pid_user;

            this.getDataAccount();
        },
    }
}