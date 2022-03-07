<template>
    <main-layout>
        <div class="w-full md:grid md:grid-cols-4 md:mt-28 mt-5 ">
            <div class="col-span-1 md:ml-6">
                <form class="bg-white shadow-md rounded py-8 px-4 md:mr-6" @submit.prevent="onSubmit">
                    <p class="mb-5 text-3xl">Form Balance</p>
                    <div class="mb-4">
                        <label class="label-custom">
                            User
                        </label>
                        <account-input-user
                            :data="listUser"
                            :nameUser="nameUser"
                            @update:nameUser="nameUser = $event"
                            :onChooseUser="onChooseUser"
                        />
                        <!-- <input class="input-custom" type="text" > -->
                    </div>
                     <div class="mb-4">
                        <label class="label-custom">
                            Account
                        </label>
                        <div class="inline-block relative w-full">
                            <select
                                name="account" 
                                v-if="accountsByUser.length > 0"
                                v-model="form.account_number"
                                class=" input-custom ">
                                <option v-for="(item, index) in accountsByUser" :value="item.account" :key="index">{{item.account}}</option>
                            </select>
                            <select 
                                name="account"
                                v-if="accountsByUser.length <= 0"
                                v-model="form.account_number"
                                class=" input-custom ">
                                <option value="null">Empty Accounts</option>
                            </select>
                            <!-- <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div> -->
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Periode
                        </label>
                        <input class="input-custom" type="date" v-model="form.periode" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Start Date
                        </label>
                        <input class="input-custom" type="date" v-model="form.start_date" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Stop Date
                        </label>
                        <input class="input-custom" type="date" v-model="form.stop_date" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Account Balance
                        </label>
                        <input class="input-custom" inputmode="decimal" v-model="form.balance" >
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
                    <p class="mb-5 text-3xl">Data Balance</p>
                    <table class="shadow-lg bg-white w-full table-auto">
                        <thead>
                            <tr>
                                <th class="text-white border text-center md:px-0 px-5 py-4" width="100" style="background-color: #4680FE">Action</th>
                                <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Account</th>
                                <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Name User</th>
                                <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Perode</th>
                                <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Start Date</th>
                                <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Stop Date</th>
                                <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Account Balance</th>
                            </tr>
                        </thead>
                        <tbody v-if="loading">
                            <tr>
                                <td class=" text-center " colspan="8">Loading</td>
                            </tr>
                        </tbody>
                        <tbody v-if="!loading">
                            <tr v-for="(item, index) in table.data"  :key="index">
                                <td class="border px-5 py-4 text-xs " style="text-align: center">
                                    <!-- <img @click="edit(item.pid_saldo)" width="20" style="display: inline" class=" cursor-pointer " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABXklEQVRIie3VPU7DMBjG8b8DO2JF/WBh5BQggZyZA3CB0sIACyKVkICF5AaMsDCSihswcAIWSAoDI1On5mWAorRp0qbYnfpsiZ38/PHGgUXmFGXjpTqIW8Ap8EHCfnhYe7YOaz/yUOosJXyJcnY7jcqTNTiDpnD6bKdn7piEcyOs4HCTvmUUDlt1D5F2TvOaUVj7kaf9yJsCP09f/GuP03sqqKtOs3oyaHOD6FhQlz+K8sKD6tBgZobHFpJIO2zVvaE+/K7CSGaCc6uX7MzzUhouQsvgpYprGhRAKXoT+5hGxxXSzLBpdCrYBjoRtoUWwjbRXNgN4h2BW2C18OmRA6NMxn5OD83ao0I1bKG5MICQfNpCC2H6S5EtNAPr6+7m38F+VHnpJ2pDJNkSkT2gZwrNRAfdCx3Ekv6/DuL6b65Ja6iqdRC/AuuAsSXNy/LIKN4FBMUdiXNvC11krvkGRtWpyp1myeYAAAAASUVORK5CYII="/> -->
                                    <img @click="onRemove(item.pid_saldo)" width="20" style="display: inline;" class=" cursor-pointer"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZElEQVRIiWNgGOqAkRhFP428Ghj/M9Qji/1n+N/Jfn57BckW/DL0+k+8+zAB2/ltKGYyUWLYyABYI5nceEAPfwYGOsQBQQvYzm9jxOYyXOIkW0ApGLVg1IJRC+hgwdAv7IY+AABHeRpR7gJWRgAAAABJRU5ErkJggg=="/>
                                </td>
                                <td class="border px-5 py-4 text-xs">{{item.account_number}}</td>
                                <td class="border px-5 py-4 text-xs">{{item.name_user}}</td>
                                <td class="border px-5 py-4 text-xs">{{item.periode}}</td>
                                <td class="border px-5 py-4 text-xs">{{item.start_date}}</td>
                                <td class="border px-5 py-4 text-xs">{{item.stop_date}}</td>
                                <td class="border px-5 py-4 text-xs">{{customNumber(item.balance)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<style lang="postcss" scoped>
        
</style>

<script>
import moment from 'moment';
import { http } from '@/http.js';
import MainLayout from '@/pages/MainLayout';
import AccountInputUser from '@/components/AccountInputUser';

const initialState = () => (
    {
        pid_saldo: null,
        account_number: null,
        periode: moment().startOf("month").format('YYYY-MM-DD'),
        start_date: moment().startOf("month").format('YYYY-MM-DD'),
        stop_date: moment().endOf("month").format('YYYY-MM-DD'),
        balance: null,
    }
)

export default {
    data(){
        return {
            loading: false,
            form: initialState(),
            table: {},
            request: {
                offset : 0,
                limit: 50,
                search: null,
                active: true,
            },
            listUser: [], 
            nameUser: null,
            accountsByUser: [],        
        };
    },
    components: {
        MainLayout,
        AccountInputUser,
    },
    mounted() {
        this.getDataAccountsBalance();
        this.getAllUser();
    },
    created() {
        
    },
    methods: {
        async getDataAccountsBalance() {
            let that = this;
            this.loading = true;

            await http("api/account-balance", this.request)
                    .then(responses => {
                        let status = responses.data.status;
                        let data = responses.data.data;

                        if(status){
                            that.table = data;
                            that.loading = false;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        async getAllUser() {
            let that = this;

            await http("api/user/getAllUser", this.request)
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
        async getDataAccount() {
            let that = this;

            await http("api/account/findByUser", {"pid_user": that.form.pid_user})
                    .then(responses => {
                        let status = responses.data.status;
                        let data = responses.data.data;

                        if(status) {
                            that.accountsByUser = data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        async onSubmit() {
            let that = this;
            this.loading = true;

            this.checkForm();

            await http("api/account-balance/store", this.form)
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
                        this.getDataAccountsBalance();
                    });
        },
        async onRemove(pid_saldo) {    
            let that = this;        
            let foundData = this.table.data.filter(item => item.pid_saldo == pid_saldo)[0];

            return await this.$swal.fire({
                icon: 'question',
                title: `Do you want to delete user <b>${foundData.account_number}</b> ?`,
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    http("api/account-balance/delete", foundData)
                        .then(responses => {
                            let data = responses.data;

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

                                that.getDataAccountsBalance();
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
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else if (result.isDenied) {
                    this.$swal.fire('Changes are not saved', '', 'info');
                }
            })
        },
        resetForm() {
            this.form = initialState();
            this.nameUser = null;
        },
        checkForm() {
            let form = this.form;
            if((form.periode || form.balance) == null || form.account_number == "null" ) {
                this.$swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000,
                })
                .fire({
                    icon: "warning",
                    title: "One of form empty",
                });

                return false;
            }
        },
        onChooseUser(user) {
            this.form.pid_user = user.pid_user;

            this.getDataAccount();
        },
        customNumber(number) {
            return Intl.NumberFormat().format(number);
        },
    }
}
</script>