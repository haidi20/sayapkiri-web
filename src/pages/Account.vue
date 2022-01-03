<template>
    <main-layout>
        <div class=" md:grid md:grid-cols-4 md:mt-28 mt-5 md:mx-6 ">
            <!-- Start form -->
            <div class="col-span-1">
                <form class="bg-white shadow-md rounded py-8 px-4 md:mr-6" @submit.prevent="onSubmit">
                    <p class="mb-5 text-3xl">Form</p>
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
                            Date Register
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
                    <div class="mb-4">
                        <label class="label-custom">
                            Group Name
                        </label>
                        <input class="input-custom" type="text" v-model="form.group_name" >
                    </div>
                     <div class="mb-4">
                        <label class="label-custom">
                            Type Account
                        </label>
                        <div class="inline-block relative w-full">
                            <select 
                                v-model="form.type_account"
                                class="block appearance-none w-full bg-white border py-2 px-3 rounded shadow-sm border-gray-300 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="invesment">Invesment</option>
                                <option value="trading">Trading</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Status Account
                        </label>
                        <div class="inline-block relative w-full">
                            <select 
                                v-model="form.status_account"
                                class="block appearance-none w-full bg-white border py-2 px-3 rounded shadow-sm border-gray-300 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="active">Active</option>
                                <option value="inactive">In Active</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <button 
                            type="submit" 
                            class=" btn-send ">
                            Send
                        </button>
                        <button 
                            @click="onResetForm"
                            type="button" 
                            class=" btn-cancel ">
                            Cancel
                        </button>
                        <span >{{loading ? "loading" : ""}}</span>
                    </div>
                </form>
            </div>
            <!-- End form -->
            <!-- Start table Desktop -->
            <div class=" h-screen hidden-mobile col-span-3 ">
                <div                    
                    class=" bg-white shadow-md rounded py-6 px-4 overflow-x-auto  ">
                    <div class="mb-5">
                        <p class="text-3xl">Account</p>
                    </div>
                    <vue-good-table  
                        fixed-header
                        :rows="rows"
                        :columns="columns"
                        max-height="600px"
                        :pagination-options="paginationOptions">

                        <template #table-row="props">
                            <span v-if="props.column.field == 'action'">
                                <img @click="onEdit(props.row.pid_account)" width="20" style="display: inline" class=" cursor-pointer " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABXklEQVRIie3VPU7DMBjG8b8DO2JF/WBh5BQggZyZA3CB0sIACyKVkICF5AaMsDCSihswcAIWSAoDI1On5mWAorRp0qbYnfpsiZ38/PHGgUXmFGXjpTqIW8Ap8EHCfnhYe7YOaz/yUOosJXyJcnY7jcqTNTiDpnD6bKdn7piEcyOs4HCTvmUUDlt1D5F2TvOaUVj7kaf9yJsCP09f/GuP03sqqKtOs3oyaHOD6FhQlz+K8sKD6tBgZobHFpJIO2zVvaE+/K7CSGaCc6uX7MzzUhouQsvgpYprGhRAKXoT+5hGxxXSzLBpdCrYBjoRtoUWwjbRXNgN4h2BW2C18OmRA6NMxn5OD83ao0I1bKG5MICQfNpCC2H6S5EtNAPr6+7m38F+VHnpJ2pDJNkSkT2gZwrNRAfdCx3Ekv6/DuL6b65Ja6iqdRC/AuuAsSXNy/LIKN4FBMUdiXNvC11krvkGRtWpyp1myeYAAAAASUVORK5CYII="/>
                                <img @click="onRemove(props.row.pid_account)" width="20" style="display: inline" class="float-right cursor-pointer "  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZElEQVRIiWNgGOqAkRhFP428Ghj/M9Qji/1n+N/Jfn57BckW/DL0+k+8+zAB2/ltKGYyUWLYyABYI5nceEAPfwYGOsQBQQvYzm9jxOYyXOIkW0ApGLVg1IJRC+hgwdAv7IY+AABHeRpR7gJWRgAAAABJRU5ErkJggg=="/>
                            </span>
                            <span v-if="props.column.field == 'status_account'">
                                <img
                                    class="w-5"
                                    style="display: inline"
                                    v-if="props.row.status_account == 'active'"
                                    src="data:image/png;base64,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"
                                /> 
                                <img
                                    class="w-5"
                                    style="display: inline"
                                    v-if="props.row.status_account == 'inactive'"
                                    src="data:image/png;base64,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"
                                />
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
import MainLayout from '@/pages/MainLayout';
import { VueGoodTable } from 'vue-good-table-next';
import AccountInputUser from '@/components/AccountInputUser';

const initialState = () => (
    {
        // pid_user: "f3e843bf-2f14-11ec-beb4-2cea7f9be94f",
        pid_user: null,
        pid_account: null,
        account: null,
        password: null,
        server: null,
        register_date: null,
        investor_pass: null,
        location: null,
        type_account: null,
        group_name: null,
        status_account: null,
    }
)

export default {
    data(){
        return {
            loading: false,
            form: initialState(),
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
            listUser: [], 
            nameUser: null, 
            columns: [
                {
                    label: 'Actions',
                    field: 'action',
                },
                {
                    label: 'Nama',
                    field: 'name_user',
                    // type: 'double',
                },
                {
                    label: 'Account',
                    field: 'account',
                    // type: 'double',
                },
                {
                    label: 'Password',
                    field: 'password',
                },
                {
                    label: 'Investor Pass',
                    field: 'investor_pass',
                },
                {
                    label: 'Server',
                    field: 'server',
                },
                {
                    label: 'Reg Date',
                    field: 'register_date',
                    width: '120px',
                    sortable: true,
                },
                {
                    label: 'Location',
                    field: 'location',
                },
                {
                    label: 'Type',
                    field: 'type_account',
                },
                {
                    label: 'Group',
                    field: 'group_name',
                },
                {
                    label: 'Status',
                    field: 'status_account',
                },
            ],         
        };
    },
    components: {
        MainLayout,
        VueGoodTable,
        AccountInputUser,
    },
    mounted() {
        this.getDataAccounts();
        this.getAllUser();
    },
    methods: {
        async getDataAccounts() {
            this.loading = true;

            await http("api/account", this.request)
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
        async onSubmit() {
            let that = this;

            let checkForm = this.checkForm();

            if (!checkForm){
                that.$swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000,
                })
                .fire({
                    icon: "warning",
                    title: "ada form yg kosong. cek console",
                });
                return false;
            }else {
                this.loading = true;

                await http("api/account/store", this.form)
                        .then(function (responses) {
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
                            }else if(data.status != undefined && !data.status) {
                                console.log(data);
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
                            this.onResetForm();
                            this.loading = false;
                            this.getDataAccounts();
                        });
            }
        },
        async onRemove(pid_account) {    
            let that = this;        
            let foundData = this.rows.filter(item => item.pid_account == pid_account)[0];

            return await this.$swal.fire({
                icon: 'question',
                title: `Do you want to delete user <b>${foundData.name_user}</b> ?`,
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    http("api/account/delete", foundData)
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
        onEdit(pid_account) {   

            console.log(pid_account);
            // let that = this;       
            let foundData = this.rows.filter(item => item.pid_account == pid_account)[0];

            this.form = {...foundData};
            this.nameUser = foundData.name_user;
        },
        onResetForm() {
            this.form = initialState();
            this.nameUser = null;
        },
        onChooseUser(user) {
            this.form.pid_user = user.pid_user;
        },
        checkForm(){
            if(this.form.register_date == null) console.log('register_date kosong');
            if(this.form.investor_pass == null) console.log('investor_pass kosong');
            if(this.form.location == null) console.log('location kosong');
        },
    }
}
</script>