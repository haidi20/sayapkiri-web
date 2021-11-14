<template>
    <main-layout>
        <div class=" md:grid md:grid-cols-4 md:mt-28 mt-5 md:mx-6 ">
            <div class="col-span-1 ">
                <form class=" bg-white shadow-md rounded py-8 px-2 md:mr-6 " @submit.prevent="handleSubmit">
                    <p class="mb-5 text-3xl">Form News</p>
                    <div class="mb-4">
                        <label class="label-custom">
                            Pair
                        </label>
                        <input 
                            class="input-custom" 
                            v-model="form.pair" id="pair" type="text" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Date News
                        </label>
                        <input 
                            @input="eventDateNews($event.target.value)"
                            class="input-custom" 
                            v-model="form.date_news" 
                            id="date_news" 
                            type="datetime-local" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Date Start
                        </label>
                        <input class="input-custom" v-model="form.date_start" id="date_start" type="datetime-local" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Date Stop
                        </label>
                        <input 
                            class="input-custom" 
                            v-model="form.date_stop" 
                            id="date_stop" 
                            type="datetime-local" >
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Impact
                        </label>
                        <div class="inline-block relative w-full">
                            <select 
                                v-model="form.impact"
                                class="block appearance-none w-full bg-white border py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="label-custom">
                            Description
                        </label>
                        <textarea class="input-custom" v-model="form.desc" id="desc" type="text" > </textarea>
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
            <!-- Start table Desktop -->
            <div class=" h-screen hidden-mobile col-span-3 ">
                <div                    
                    class=" bg-white shadow-md rounded py-8 px-4 overflow-x-auto  ">
                    <div style="margin-bottom: 50px">
                        <p class="text-3xl">Data News</p>
                        <!-- <div class=" float-right ">
                            <input type="text" class="input-custom" placeholder="search" >
                        </div> -->
                    </div>
                    <table 
                        class="shadow-lg bg-white w-full ">
                        <tr>
                            <th class="text-white border text-center md:px-0 px-5 py-4 " style="background-color: #4680FE">Action</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Pair</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Date News</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Date Start</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Date Stop</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Impact</th>
                            <th class="text-white border text-center px-8 py-4" style="background-color: #4680FE">Description</th>
                        </tr>
                        <tr v-if="loading">
                            <td  class=" text-center " colspan="7">Loading</td>
                        </tr>
                        <tr v-for="(item, index) in table"  :key="index">
                            <td class="border px-5 py-4 text-xs">
                                <img @click="edit(item.pid_news)" width="20" style="display: inline" class=" cursor-pointer " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABXklEQVRIie3VPU7DMBjG8b8DO2JF/WBh5BQggZyZA3CB0sIACyKVkICF5AaMsDCSihswcAIWSAoDI1On5mWAorRp0qbYnfpsiZ38/PHGgUXmFGXjpTqIW8Ap8EHCfnhYe7YOaz/yUOosJXyJcnY7jcqTNTiDpnD6bKdn7piEcyOs4HCTvmUUDlt1D5F2TvOaUVj7kaf9yJsCP09f/GuP03sqqKtOs3oyaHOD6FhQlz+K8sKD6tBgZobHFpJIO2zVvaE+/K7CSGaCc6uX7MzzUhouQsvgpYprGhRAKXoT+5hGxxXSzLBpdCrYBjoRtoUWwjbRXNgN4h2BW2C18OmRA6NMxn5OD83ao0I1bKG5MICQfNpCC2H6S5EtNAPr6+7m38F+VHnpJ2pDJNkSkT2gZwrNRAfdCx3Ekv6/DuL6b65Ja6iqdRC/AuuAsSXNy/LIKN4FBMUdiXNvC11krvkGRtWpyp1myeYAAAAASUVORK5CYII="/>
                                <img @click="remove(item.pid_news)" width="20" style="display: inline" class="float-right cursor-pointer "  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZElEQVRIiWNgGOqAkRhFP428Ghj/M9Qji/1n+N/Jfn57BckW/DL0+k+8+zAB2/ltKGYyUWLYyABYI5nceEAPfwYGOsQBQQvYzm9jxOYyXOIkW0ApGLVg1IJRC+hgwdAv7IY+AABHeRpR7gJWRgAAAABJRU5ErkJggg=="/>
                            </td>
                            <td class="border px-5 py-4 text-xs">{{item.pair}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.custom_date_news}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.custom_date_start}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.custom_date_stop}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.impact}}</td>
                            <td class="border px-5 py-4 text-xs">{{item.desc}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <!-- End table Desktop -->
            <!-- Start tabe mobile -->
            <div class=" sm:mt-9 mt-2 block sm:block md:hidden lg:hidden col-span-3">
                <div class="bg-white shadow-md rounded pt-8 overflow-x-auto" >
                    <p class="mb-5 text-3xl ml-5">Data News</p>
                    <table 
                        class=" shadow-lg bg-white w-full ">
                        <tr 
                            v-for="(item, index) in table" 
                            :key="index">
                            <td class="text-xs ">
                                <div class=" ">
                                    <div class=" flex flex-col text-sm ">
                                        
                                        <div class="flex flex-row ">
                                            <div class="  label-custom-mobile "> Pair </div>
                                            <div class="w-full pl-2 py-1 "> {{item.pair}} </div>
                                        </div>
                                        <div class="flex flex-row justify-between ">
                                            <div class=" label-custom-mobile "> Date News </div>
                                            <div class="w-full pl-2 py-1 "> {{item.custom_date_news}} </div>
                                        </div>
                                        <div class="flex flex-row w-full justify-between ">
                                            <div class=" label-custom-mobile "> Start Stop </div>
                                            <div class="w-full pl-2 py-1 "> {{item.custom_date_start}} / <br > {{item.custom_date_stop}} </div>
                                        </div>
                                        <div class="flex flex-row w-full justify-between ">
                                            <div class=" label-custom-mobile "> Impact </div>
                                            <div class="w-full pl-2 py-1 "> {{item.impact}} </div>
                                        </div>
                                        <div class="flex flex-row w-full justify-between ">
                                            <div class=" label-custom-mobile "> Description </div>
                                            <div class="w-full pl-2 py-1 "> {{item.desc}} </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <!-- End table mobile -->
        </div>
    </main-layout>
</template>

<style lang="postcss" scoped>
    
</style>

<script>
    import axios from 'axios';
    import moment from 'moment';
    // import {baseUrl} from '@/helpers';
    import MainLayout from '@/pages/MainLayout';

    const initialState = () => {
        return {
            pid_news: null,
            pair: 'USD',
            date_news: null,
            date_start: null,
            date_stop: null,
            impact: null,
            desc: null,
        };
    }

    export default {
        data() {
            return {
                token: localStorage.getItem('token'),
                loading: false,
                form: initialState(),
                table: [],
            };
        },
        components: {
            MainLayout
        },
        mounted() {
            this.getData();
        },
        computed: {
            
        },
        methods: {
            async getData() {
                let that = this;
                this.loading = true;

                await axios.post(process.env.VUE_APP_BASE_URL + "api/news/getData", {}, {
                        headers: {
                            Authorization: `Bearer ` + that.token
                        }
                    })
                    .then(function({
                        data
                    }) {
                        if (data.status) {
                            that.table = data.data;
                            that.loading = false;
                        } else if (!data.status) {
                            this.$router.push({
                                name: "login"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            async handleSubmit() {
                let that = this;
                this.loading = true;

                if (this.form.pair == null || this.form.impact == null) {
                    console.log('form kosong');

                    this.loading = false;
                    this.$swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 2000,
                        })
                        .fire({
                            icon: "warning",
                            title: "Maaf, form todak boleh kosong",
                        });
                    return false;
                }

                await axios.post(process.env.VUE_APP_BASE_URL + "api/news/store",
                        this.form, {
                            headers: {
                                Authorization: `Bearer ${that.token}`
                            }
                        })
                    .then(function({
                        data
                    }) {
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
                        this.form = initialState();
                        this.loading = false;
                        this.getData();
                    });
            },
            async remove(pid_news) {
                let that = this;
                let foundData = this.table.filter(item => item.pid_news == pid_news)[0];

                return await this.$swal.fire({
                    icon: 'question',
                    title: 'Do you want to delete this data ?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: `No`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        axios.post(process.env.VUE_APP_BASE_URL + "api/news/delete",
                                foundData, {
                                    headers: {
                                        Authorization: `Bearer ${that.token}`
                                    }
                                })
                            .then(function({
                                data
                            }) {
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

                                    that.getData();
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
                    } else if (result.isDenied) {
                        this.$swal.fire('Changes are not saved', '', 'info');
                    }
                })
            },
            edit(pid_news) {
                // let that = this;        
                let foundData = this.table.filter(item => item.pid_news == pid_news)[0];

                this.form.pid_news = foundData.pid_news;
                this.form.pair = foundData.pair;
                this.form.impact = foundData.impact;
                this.form.desc = foundData.desc;
                this.form.date_news = moment(foundData.date_news).format('YYYY-MM-DDTHH:mm:ss');
                this.form.date_start = moment(foundData.date_start).format('YYYY-MM-DDTHH:mm:ss');
                this.form.date_stop = moment(foundData.date_stop).format('YYYY-MM-DDTHH:mm:ss');
            },
            eventDateNews() {
                this.form.date_start = moment(this.form.date_news).subtract({
                    hours: 5
                }).format('YYYY-MM-DDTHH:mm:ss');
                this.form.date_stop = moment(this.form.date_news).add({
                    hours: 2
                }).format('YYYY-MM-DDTHH:mm:ss');
            },
            resetForm() {
                this.form = initialState();
            },
        }

    }
</script>

// ketika set date_news // maka date_start = date_news - 5 // date_stop = date_news + 2 // impact => low, medium, high // description type = "textarea"