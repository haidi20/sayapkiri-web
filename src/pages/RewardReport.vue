<template>
    <main-layout>
        <div class=" md:grid md:grid-cols-4 md:mt-28 mt-5 md:mx-6 ">
            <!-- Start form -->
            <div class="col-span-1 ">
                <form class=" bg-white shadow-md rounded py-8 px-2 md:mr-6 " @submit.prevent="onSubmit">
                    <p class="md:mb-5 sm:mb-5 md:text-3xl sm:text-3xl inline-flex ">Form Reward Report</p>
                    <div
                        class=" transition-all duration-1000 overflow-y-auto ">
                        <div class="mb-4">
                            <label class="label-custom">
                                File
                            </label>
                            <input class="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                type="file" 
                                @change="onInsertState"
                                ref="myFiles"
                                id="formFile">
                        </div>
                        
                        <div class="">
                            <button 
                                type="submit" 
                                class=" btn-send ">
                                Send
                            </button>
                            <button 
                                @click="resetForm"
                                type="button" 
                                class=" btn-cancel ">
                                Cancel
                            </button>
                            <span >{{loading ? "loading" : ""}}</span>
                        </div>
                    </div>
                </form>
            </div>
            <!-- End form -->
            <!-- Start table Desktop -->
            <div class=" h-screen hidden-mobile col-span-3 ">
                <div                    
                    class=" bg-white shadow-md rounded py-6 px-4 overflow-x-auto  ">
                    <div class="mb-5">
                        <p class="text-3xl">Reward Report</p>
                    </div>
                    <vue-good-table  
                        fixed-header
                        :rows="rows"
                        :columns="columns"
                        max-height="600px"
                        ref="table"
                        :pagination-options="paginationOptions">

                        <template #table-row="props">
                            <span v-if="props.column.field == 'action'">
                                <img @click="onRemove(props.row.pid_account)" width="20" style="display: inline" class="float-right cursor-pointer "  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZElEQVRIiWNgGOqAkRhFP428Ghj/M9Qji/1n+N/Jfn57BckW/DL0+k+8+zAB2/ltKGYyUWLYyABYI5nceEAPfwYGOsQBQQvYzm9jxOYyXOIkW0ApGLVg1IJRC+hgwdAv7IY+AABHeRpR7gJWRgAAAABJRU5ErkJggg=="/>
                            </span>
                            <span v-else>
                                {{props.formattedRow[props.column.field]}}
                            </span>
                        </template>
                    </vue-good-table>
                </div>
            </div>
            <!-- End table Desktop -->
        </div>
    </main-layout>
</template>

<style lang="postcss" scoped>

</style>

<script>
import { http } from '@/http.js';
import { VueGoodTable } from 'vue-good-table-next';
import MainLayout from '@/pages/MainLayout';

export default {
    data() {
        return {
            form: [],
            rows: [],
             request: {
                offset : 0,
                limit: 100,
                search: null
            },
            paginationOptions: {
                perPage: 100,
                enabled: true,
                mode: 'pages',
                perPageDropdown: [100, 200, 500, 1000],
            },
            columns: [
                {
                    label: 'R Order',
                    field: 'reward_order',
                },
                {
                    label: 'R Date',
                    field: 'reward_date',
                    // type: 'double',
                },
                {
                    label: 'Partner Account',
                    field: 'partner_account',
                    // type: 'double',
                },
                {
                    label: 'Type',
                    field: 'client_account_type',
                },
                {
                    label: 'Country',
                    field: 'country',
                },
                {
                    label: 'Client UID',
                    field: 'client_uid',
                },
                {
                    label: 'Currency',
                    field: 'currency',
                },
                {
                    label: 'Lots',
                    field: 'volume_lots',
                },
                {
                    label: 'MLN USD',
                    field: 'volume_mln_usd',
                },
                {
                    label: 'Reward',
                    field: 'reward',
                },
                {
                    label: 'R USD',
                    field: 'reward_usd',
                },
                {
                    label: 'Orders Count',
                    field: 'orders_count',
                },
                {
                    label: 'CA',
                    field: 'client_account',
                },
            ], 
        }
    },
    components: {
        MainLayout,
        VueGoodTable,
    },
    mounted() {
        this.getDataRewardReport();
    },
    methods: {
        async getDataRewardReport() {
            this.loading = true;

            await http("api/reward-report", this.request)
                    .then(responses => {
                        let status = responses.data.status;
                        let data = responses.data.data;

                        if(status){
                            this.rows = data.data;
                            this.loading = false;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        onInsertState() {
            this.file = this.$refs.myFiles.files[0];
        },
        onSubmit() {
            let that = this;
            let reader = new FileReader();
            
            reader.readAsText(this.file);

            reader.onload = function() {
                let csv = reader.result;
                let lines = csv.split("\n");
                let result = [];
                let headers = lines[0].split(",");

                for(var i=1;i<lines.length;i++){
                    let obj = {};
                    let currentline=lines[i].split(",");

                    for(let j=0;j<headers.length;j++){
                        let index = headers[j].replace(/\s/g, '');
                        let value = currentline[j];

                        if(value != undefined) {
                            obj[index] = value;
                        }
                    }

                    if(obj['id'] != '') {
                        result.push(obj);
                    }
                }

                that.onSend(result);
            };
        },
        async onSend(result) {
            let that = this;
            await http("api/reward-report/store", {data: result})
                    .then(function(responses) {
                        let data = responses.data;

                        if (data.status != undefined && data.status) {
                            that.$swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 2000,
                                })
                                .fire({
                                    icon: "success",
                                    title: data.remark
                                });

                            location.reload();
                        } else if (data.status != undefined && !data.status) {
                            that.$swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 2000,
                                })
                                .fire({
                                    icon: "warning",
                                    title: data.remark
                                });

                            console.log(data.remark);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.loading = false;
                        // this.getData();
                    });
        },
        async onRemove(reward_order) {    
            let that = this;

            return await this.$swal.fire({
                icon: 'question',
                title: `Do you want to delete Reward Order = <b>${reward_order}</b> ?`,
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    http("api/rewardReport/delete", {reward_order: reward_order})
                        .then(function (responses) {
                            let data = responses;

                            if(data.status != undefined && data.status) {
                                that.$swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 2000,
                                })
                                .fire({
                                    icon: "success",
                                    title: data.remark
                                });

                                that.getDataAccounts();
                            }else if(data.status != undefined && !data.status) {
                                that.$swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 2000,
                                })
                                .fire({
                                    icon: "warning",
                                    title: data.remark
                                });

                                console.log(data.remark);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else if (result.isDenied) {
                    this.$swal.fire('Changes are not saved', '', 'info')
                }
            })
        },
    }
}
</script>