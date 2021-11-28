import moment from "moment";
import axios from "axios";
import MainLayout from "@/pages/MainLayout";
import Modal from "@/pages/DashboardModal";
import html2canvas from "html2canvas";
const { ClipboardItem } = window;

export default {
    data() {
        return {
            copyCard: false,
            loading: false,
            hiddenName: false,
            token: localStorage.getItem("token"),
            list: [],
            request: {
                sorted_by: "trade_desc",
            },
            open: false,
        };
    },
    components: {
        MainLayout,
        Modal,
    },
    mounted() {
        this.getLast();
    },
    computed: {

    },
    methods: {
        async getLast() {
            let that = this;
            this.loading = true;

            await axios
                .post(
                    process.env.VUE_APP_BASE_URL + "api/dashboard/last-data",
                    this.request, {
                        headers: {
                            Authorization: `Bearer ` + that.token,
                        },
                    }
                )
                .then(function(responses) {
                    if (responses.data.status) {
                        that.list = responses.data.data;

                        that.open = false;
                    } else if (!responses.data.status) {
                        that.$router.push({
                            name: "login",
                        });
                    }

                    that.loading = false;
                })
                .catch((error) => {
                    that.loading = false;
                    console.log(error);
                });
        },
        refresh() {
            this.getLast();
        },
        formatDate(date) {
            return moment(date).format("DD MMM YYYY HH:mm");
        },
        colorProfit(profit) {
            return profit <= 0 ? "text-red-500" : "text-green-500";
        },
        bgFooter(eaEnable) {
            return eaEnable == 1 ? "bg-green-500" : "bg-gray-500";
        },
        sortName(name) {
            return name.substring(0, 18);
        },
        toggleModal() {
            this.open = !this.open;
        },
        customNumber(number) {
            return Intl.NumberFormat().format(number);
        },
        capture(index) {
            let that = this;
            this.copyCard = true;

            let elCard = document.getElementById("card_" + index);
            let elLocation = document.getElementById("location_" + index);

            elLocation.classList.add("pb-3");
            elLocation.classList.remove("pt-1");

            setTimeout(() => {
                html2canvas(elCard, {
                    // onclone: function(clonedDoc) {
                    //     document.getElementById("location_" + index).style.display = 'block';
                    // },
                }).then((canvas) => {
                    try {
                        canvas.toBlob((blob) => {
                            return navigator.clipboard.write([
                                new ClipboardItem({ "image/png": blob }),
                            ]);
                        });
                    } catch (err) {
                        console.error(err.name, err.message);
                    }

                    this.$swal
                        .mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 2000,
                        })
                        .fire({
                            icon: "success",
                            title: "Copy image",
                        });

                    elLocation.classList.remove("pb-3");
                    elLocation.classList.add("pt-1");
                });
            }, 800);
        },
    },
};