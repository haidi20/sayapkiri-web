<template>
    <main-layout>
        <div class="w-full md:grid md:grid-cols-4 md:mt-28 mt-5 ">
            <div class="col-span-1 md:mx-6">
                <form class="bg-white shadow-md rounded py-8 px-4 md:mr-6" @submit.prevent="onSubmit">
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
                    <vue-good-table  
                        fixed-header
                        :rows="rows"
                        :columns="columns"
                        max-height="600px"
                        :pagination-options="paginationOptions">
                    </vue-good-table>
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

<script src="./UserController"></script>