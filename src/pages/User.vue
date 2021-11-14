<template>
    <main-layout>
        <div class="w-full md:grid md:grid-cols-4 md:mt-28 mt-5 ">
            <div class="col-span-1 md:mx-6">
                <form class="bg-white shadow-md rounded py-8 px-4 md:mr-6" @submit.prevent="handleSubmit">
                    <p class="mb-5 text-3xl">Form User</p>
                    <div class="mb-4">
                        <label class=" label-custom ">
                            Nama
                        </label>
                        <input class="input-custom" v-model="form.nama" id="nama" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Email
                        </label>
                        <input class="input-custom" v-model="form.email" id="email" type="email" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            No Telp
                        </label>
                        <input class="input-custom" v-model="form.no_telp" id="no_telp" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Register Date
                        </label>
                        <input class="input-custom" v-model="form.register_date" id="register_date" type="date" >
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
                    <p class="mb-5 text-3xl">Data User</p>
                    <table class="shadow-lg bg-white w-full table-auto">
                        <tr>
                            <th class="text-white border text-center md:px-0 px-5 py-4" width="100" style="background-color: #4680FE">Action</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Nama</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Email</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">No Telp</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Register Date</th>
                        </tr>
                        <tr v-if="loading">
                            <td  class=" text-center " colspan="5">Loading</td>
                        </tr>
                        <tr v-for="(item, index) in table.data"  :key="index">
                            <td class="border px-5 py-4 text-xs">
                                <img @click="edit(item.pid_user)" width="20" style="display: inline" class=" cursor-pointer " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABXklEQVRIie3VPU7DMBjG8b8DO2JF/WBh5BQggZyZA3CB0sIACyKVkICF5AaMsDCSihswcAIWSAoDI1On5mWAorRp0qbYnfpsiZ38/PHGgUXmFGXjpTqIW8Ap8EHCfnhYe7YOaz/yUOosJXyJcnY7jcqTNTiDpnD6bKdn7piEcyOs4HCTvmUUDlt1D5F2TvOaUVj7kaf9yJsCP09f/GuP03sqqKtOs3oyaHOD6FhQlz+K8sKD6tBgZobHFpJIO2zVvaE+/K7CSGaCc6uX7MzzUhouQsvgpYprGhRAKXoT+5hGxxXSzLBpdCrYBjoRtoUWwjbRXNgN4h2BW2C18OmRA6NMxn5OD83ao0I1bKG5MICQfNpCC2H6S5EtNAPr6+7m38F+VHnpJ2pDJNkSkT2gZwrNRAfdCx3Ekv6/DuL6b65Ja6iqdRC/AuuAsSXNy/LIKN4FBMUdiXNvC11krvkGRtWpyp1myeYAAAAASUVORK5CYII="/>
                                <img @click="remove(item.pid_user)" width="20" style="display: inline" class="float-right cursor-pointer "  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZElEQVRIiWNgGOqAkRhFP428Ghj/M9Qji/1n+N/Jfn57BckW/DL0+k+8+zAB2/ltKGYyUWLYyABYI5nceEAPfwYGOsQBQQvYzm9jxOYyXOIkW0ApGLVg1IJRC+hgwdAv7IY+AABHeRpR7gJWRgAAAABJRU5ErkJggg=="/>
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

<style lang="postcss" scoped>
    .btn-send {
        @apply bg-green-500 text-white border-2 font-bold py-2 px-4 rounded-lg
                hover:bg-green-700 hover:text-white 

    }
    .btn-cancel {
        @apply bg-white text-red-500 border-2 font-bold py-2 px-4 float-right rounded-lg           
                hover:bg-red-500 hover:text-white
    }
</style>

<script>
import axios from 'axios';
import moment from 'moment';
import MainLayout from '@/pages/MainLayout';

const initialState = () => {
    return {
        pid_user: null,
        nama: null,
        email: null,
        no_telp: null,
        register_date: null,
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
            this.loading = true;

            await axios.post(process.env.VUE_APP_BASE_URL + "api/user",
                           this.request,
                            {headers: { Authorization: `Bearer `+ that.token}})
                        .then(function ({data}) {

                            console.log(data);

                            if(data.status) {
                                that.table = data.data;
                            }

                            that.loading = false;
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