<template>
    <main-layout>
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-4">
            <div class="col-span-1">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
                    <p class="mb-5 text-3xl">Form User</p>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Nama
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="form.nama" id="nama" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="form.email" id="email" type="email" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            No Telp
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="form.no_telp" id="no_telp" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Register Date
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="form.register_date" id="register_date" type="date" >
                    </div>
                    <div class="flex items-center">
                        <button 
                            type="submit" 
                            class="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Kirim
                        </button>
                        <button 
                            @click="resetForm"
                            type="button" 
                            class="bg-white text-red-500 border-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3">
                            cancel
                        </button>
                        <span >{{loading ? "loading" : ""}}</span>
                    </div>
                </form>
            </div>
            <div class="w-full col-span-3">
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-x-auto ">
                    <p class="mb-5 text-3xl">Data User</p>
                    <table class="shadow-lg bg-white w-full table-auto">
                        <tr>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Action</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Nama</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Email</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">No Telp</th>
                            <th class="text-white border text-left px-8 py-4" style="background-color: #4680FE">Register Date</th>
                        </tr>
                        <tr v-for="(item, index) in table.data"  :key="index">
                            <td class="border px-5 py-4 text-xs">
                                <button @click="edit(item.pid_user)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                                    Edit
                                </button>
                                <button @click="remove(item.pid_user)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    Delete
                                </button>
                            </td>
                            <td class="border px-5 py-4 text-xs">{{item.nama}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.email}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.no_telp}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.register_date}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import MainLayout from '@/components/MainLayout';

const initialState = () => {
    return {
        pid_user: null,
        nama: null,
        email: null,
        no_telp: null,
        register_date: null,
        // account
        // pid_account: null,
        // account: null,
        // password: null,
        // server: null,
        // register_date_account: null,
        // investor_pass: null,
        // location: null,
    };
}
export default {
    data(){
        return {
            token: localStorage.getItem('token'),
            loading: false,
            form: initialState(),
            table: {},
            request: {
                offset : 0,
                limit: 10,
                search: null
            },            
        };
    },
    components: {
        MainLayout,
    },
    mounted() {
        this.getData();
    },
    created() {
        this.form.register_date = moment().format('YYYY-MM-DD');
    },
    methods: {
        async getData() {
            let that = this;

            await axios.post(process.env.VUE_APP_BASE_URL + "api/user",
                           this.request,
                            {headers: { Authorization: `Bearer `+ that.token}})
                        .then(function ({data}) {

                            if(data.status) {
                                that.table = data.data;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
        },
        async handleSubmit() {
            let that = this;
            this.loading = true;

            await axios.post(process.env.VUE_APP_BASE_URL + "api/user/store", 
                            this.form, 
                            {headers: { Authorization: `Bearer ${that.token}`}})
                        .then(function ({data}) {
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
                        .finally(() => {
                            this.form = initialState();
                            this.loading = false;
                            this.getData();
                        });
        },
        async remove(pid_user) {    
            let that = this;        
            let foundData = this.table.data.filter(item => item.pid_user == pid_user)[0];

            return await this.$swal.fire({
                icon: 'question',
                title: `Do you want to delete user <b>${foundData.nama}</b> ?`,
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.post(process.env.VUE_APP_BASE_URL + "api/user/delete", 
                            foundData, 
                            {headers: { Authorization: `Bearer ${that.token}`}})
                        .then(function ({data}) {
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

                                that.getData();
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
        edit(pid_user) {   
            // let that = this;        
            let foundData = this.table.data.filter(item => item.pid_user == pid_user)[0];

            this.form.pid_user = foundData.pid_user;
            this.form.nama = foundData.nama;
            this.form.email = foundData.email;
            this.form.no_telp = foundData.no_telp;
            this.form.register_date =  moment(foundData.register_date).format('YYYY-MM-DD');
        },
        resetForm() {
            this.form = initialState();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>