import axios from "axios";
import MainLayout from "@/pages/MainLayout";

export default {
    data() {
        return {
            token: localStorage.getItem("token"),
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
            let that = this;
            this.table = [];
            this.loading = true;

            await axios
                .post(
                    process.env.VUE_APP_BASE_URL + "api/dashboard/last-data",
                    this.request, { headers: { Authorization: `Bearer ` + that.token } }
                )
                .then((responses) => {
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
        classActiveRow(index) {
            return {
                active: this.indexSelected == index ? true : false,
            };
        },
    },
};