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
                        :rows="dataRows"
                        :columns="columns"
                        max-height="600px"
                        :pagination-options="paginationOptions">
                        <template #table-row="props">
                            <span v-if="props.column.field == 'btnAction'">
                                <td class="px-5 py-4 text-xs">
                                    <img @click="onEdit(props.row.pid_user)" width="20" style="display: inline" class=" cursor-pointer " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABXklEQVRIie3VPU7DMBjG8b8DO2JF/WBh5BQggZyZA3CB0sIACyKVkICF5AaMsDCSihswcAIWSAoDI1On5mWAorRp0qbYnfpsiZ38/PHGgUXmFGXjpTqIW8Ap8EHCfnhYe7YOaz/yUOosJXyJcnY7jcqTNTiDpnD6bKdn7piEcyOs4HCTvmUUDlt1D5F2TvOaUVj7kaf9yJsCP09f/GuP03sqqKtOs3oyaHOD6FhQlz+K8sKD6tBgZobHFpJIO2zVvaE+/K7CSGaCc6uX7MzzUhouQsvgpYprGhRAKXoT+5hGxxXSzLBpdCrYBjoRtoUWwjbRXNgN4h2BW2C18OmRA6NMxn5OD83ao0I1bKG5MICQfNpCC2H6S5EtNAPr6+7m38F+VHnpJ2pDJNkSkT2gZwrNRAfdCx3Ekv6/DuL6b65Ja6iqdRC/AuuAsSXNy/LIKN4FBMUdiXNvC11krvkGRtWpyp1myeYAAAAASUVORK5CYII="/>
                                    <img @click="onRemove(props.row.pid_user)" width="20" style="display: inline" class="float-right cursor-pointer "  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZElEQVRIiWNgGOqAkRhFP428Ghj/M9Qji/1n+N/Jfn57BckW/DL0+k+8+zAB2/ltKGYyUWLYyABYI5nceEAPfwYGOsQBQQvYzm9jxOYyXOIkW0ApGLVg1IJRC+hgwdAv7IY+AABHeRpR7gJWRgAAAABJRU5ErkJggg=="/>
                                </td>
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