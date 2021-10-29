<template>
    <main-layout>
        <div class="w-full md:grid md:grid-cols-4 md:my-16 my-2 ">
            <div class="col-span-1 md:ml-6">
                <form class="bg-white shadow-md rounded py-8 px-4 md:mr-6" @submit.prevent="handleSubmit">
                    <p class="mb-5 text-3xl">Form Account</p>
                    <div class="mb-4">
                        <label class="label-custom">
                            User
                        </label>
                        <account-input-user
                            :data="listUser"
                            :nameUser="nameUser"
                            @update:nameUser="nameUser = $event"
                            :chooseUser="chooseUser"
                        />
                        <!-- <input class="input-custom" type="text" > -->
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Account
                        </label>
                        <input class=" input-custom " type="text" v-model="form.account" >
                    </div>
                     <div class="mb-4">
                        <label class="label-custom">
                            Password
                        </label>
                        <input class="input-custom" type="text" v-model="form.password" >
                    </div>
                     <div class="mb-4">
                        <label class="label-custom">
                            Server
                        </label>
                        <input class="input-custom" type="text" v-model="form.server" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Date News
                        </label>
                        <input 
                            class="input-custom" 
                            v-model="form.register_date"
                            type="date" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Investor Pass
                        </label>
                        <input class="input-custom" type="text" v-model="form.investor_pass" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Location
                        </label>
                        <input class="input-custom" type="text" v-model="form.location" >
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
                </form>
            </div>
            <div class="w-full col-span-3 md:mr-5">
                <div class="bg-white shadow-md rounded py-8 px-4 overflow-x-auto ">
                    <p class="mb-5 text-3xl">Data Account</p>
                    <table class="shadow-lg bg-white w-full table-auto">
                        <tr>
                            <th class="text-white border text-center md:px-0 px-5 py-4" width="100" style="background-color: #4680FE">Action</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Nama</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Account</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Password</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Server</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Register Date</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Investor Password</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Location</th>
                        </tr>
                        <tr v-for="(item, index) in table.data"  :key="index">
                            <td class="border px-5 py-4 text-xs">
                                <img @click="edit(item.pid_account)" width="20" style="display: inline" class=" cursor-pointer " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABXklEQVRIie3VPU7DMBjG8b8DO2JF/WBh5BQggZyZA3CB0sIACyKVkICF5AaMsDCSihswcAIWSAoDI1On5mWAorRp0qbYnfpsiZ38/PHGgUXmFGXjpTqIW8Ap8EHCfnhYe7YOaz/yUOosJXyJcnY7jcqTNTiDpnD6bKdn7piEcyOs4HCTvmUUDlt1D5F2TvOaUVj7kaf9yJsCP09f/GuP03sqqKtOs3oyaHOD6FhQlz+K8sKD6tBgZobHFpJIO2zVvaE+/K7CSGaCc6uX7MzzUhouQsvgpYprGhRAKXoT+5hGxxXSzLBpdCrYBjoRtoUWwjbRXNgN4h2BW2C18OmRA6NMxn5OD83ao0I1bKG5MICQfNpCC2H6S5EtNAPr6+7m38F+VHnpJ2pDJNkSkT2gZwrNRAfdCx3Ekv6/DuL6b65Ja6iqdRC/AuuAsSXNy/LIKN4FBMUdiXNvC11krvkGRtWpyp1myeYAAAAASUVORK5CYII="/>
                                <img @click="remove(item.pid_account)" width="20" style="display: inline" class="float-right cursor-pointer "  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZElEQVRIiWNgGOqAkRhFP428Ghj/M9Qji/1n+N/Jfn57BckW/DL0+k+8+zAB2/ltKGYyUWLYyABYI5nceEAPfwYGOsQBQQvYzm9jxOYyXOIkW0ApGLVg1IJRC+hgwdAv7IY+AABHeRpR7gJWRgAAAABJRU5ErkJggg=="/>
                            </td>
                            <td class="border px-5 py-4 text-xs">{{item.name_user}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.account}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.password}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.server}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.register_date}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.investor_pass}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.location}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<style lang="postcss" scoped>
        
</style>

<script>
import axios from 'axios';
import MainLayout from '@/pages/MainLayout';
import AccountInputUser from '@/pages/AccountInputUser';

const initialState = () => (
    {
        pid_user: "f3e843bf-2f14-11ec-beb4-2cea7f9be94f",
        pid_account: null,
        account: null,
        password: null,
        server: null,
        register_date: null,
        investor_pass: null,
        location: null,
    }
)

export default {
    data(){
        return {
            token: localStorage.getItem('token'),
            loading: false,
            form: initialState(),
            table: {},
            request: {
                offset : 0,
                limit: 100,
                search: null
            },
            listUser: [], 
            nameUser: null,        
        };
    },
    components: {
        MainLayout,
        AccountInputUser,
    },
    mounted() {
        this.getDataAccounts();
        this.getAllUser();
    },
    created() {
        
    },
    methods: {
        async getDataAccounts() {
            let that = this;

            await axios.post(process.env.VUE_APP_BASE_URL + "api/account",
                           this.request,
                            {headers: { Authorization: `Bearer `+ that.token}})
                        .then(responses => {
                            let status = responses.data.status;
                            let data = responses.data.data;

                            if(status){
                                this.table = data;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
        },
        async getAllUser() {
            let that = this;

            await axios.post(process.env.VUE_APP_BASE_URL + "api/user/getAllUser",
                           this.request,
                            {headers: { Authorization: `Bearer `+ that.token}})
                        .then(responses => {
                            let status = responses.data.status;
                            let data = responses.data.data;

                            if(status) {
                                that.listUser = data;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
        },
        chooseUser(user) {
            this.form.pid_user = user.pid_user;
        },
        async handleSubmit() {
            let that = this;
            this.loading = true;

            await axios.post(process.env.VUE_APP_BASE_URL + "api/account/store", 
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
                            this.resetForm();
                            this.loading = false;
                            this.getDataAccounts();
                        });
        },
        async remove(pid_account) {    
            let that = this;        
            let foundData = this.table.data.filter(item => item.pid_account == pid_account)[0];

            return await this.$swal.fire({
                icon: 'question',
                title: `Do you want to delete user <b>${foundData.name_user}</b> ?`,
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.post(process.env.VUE_APP_BASE_URL + "api/account/delete", 
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
        edit(pid_account) {   
            // let that = this;       
            let foundData = this.table.data.filter(item => item.pid_account == pid_account)[0];

            this.form = {...foundData};
            this.nameUser = foundData.name_user;
        },
        resetForm() {
            this.form = initialState();
            this.nameUser = null;
        }
    }
}
</script>