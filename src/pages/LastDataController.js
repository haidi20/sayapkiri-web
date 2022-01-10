import moment from "moment";
import MainLayout from "@/pages/MainLayout";

import { http } from '@/http.js';

export default {
    data() {
        return {
            table: [],
            loading: false,
            indexSelected: null,
            request: {
                field: "dd",
                sorted: "desc",
            },
        };
    },
    components: {
        MainLayout,
    },
    mounted() {
        this.getLastData();
    },
    methods: {
        async getLastData() {
            this.table = [];
            this.loading = true;

            await http("api/dashboard/last-data", this.request)
                .then(responses => {
                    let status = responses.data.status;
                    let data = responses.data.data;

                    if (status) {
                        this.table = data;
                    }

                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        customEquity(number) {
            if (number !== null || number !== undefined) {
                return Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "USC",
                }).format(number);
            }
        },
        activeRow(index) {
            this.indexSelected = index;
        },
        classActiveRow(index, typeAccount, brokerTime) {
            let isInvesment = false;
            let isNonActive = false;
            let diffDays = moment(moment()).diff(brokerTime, 'hours');

            if (diffDays > 24) {
                isNonActive = true;
            } else {
                isInvesment = typeAccount == 'invesment';
            }

            return {
                active: this.indexSelected == index ? true : false,
                'bg-green-100': isInvesment,
                "bg-gray-300": isNonActive,
            };
        },
    },
};