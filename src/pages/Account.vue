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
                            Type Account
                        </label>
                        <input class="input-custom" type="text" v-model="form.type_account" >
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
                        <!-- <div class=" float-right ">
                            <input type="text" class="input-custom" placeholder="search" >
                        </div> -->
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
                            <span v-else>
                                {{props.formattedRow[props.column.field]}}
                            </span>
                        </template>
                    </vue-good-table>
                </div>
            </div>
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
        pid_user: "f3e843bf-2f14-11ec-beb4-2cea7f9be94f",
        pid_account: null,
        account: null,
        password: null,
        server: null,
        register_date: null,
        investor_pass: null,
        location: null,
        type_account: null,
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
                    label: 'Server',
                    field: 'server',
                },
                {
                    label: 'Register Date',
                    field: 'register_date',
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
                    label: 'Status',
                    field: 'status_account',
                },
            ],         
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
        },
        async onRemove(pid_account) {    
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
    }
}
</script>