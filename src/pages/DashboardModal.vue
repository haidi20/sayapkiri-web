<template>
    <!-- Dialog (full screen) -->
    <div 
        v-if="open" 
        class=" custom-modal " >

        <!-- A basic modal dialog with title, body and one button to close -->
        <div class="h-auto text-left w-full bg-white rounded shadow-2xl md:max-w-xl lg:p-8 p-4 mx-2">
            <!-- <div class="mt-3 text-center sm:text-left">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Cari Nama
                </h3>
                <div class="mt-2">
                    <div class="grid">
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="name" >
                    </div>
                </div>
            </div> -->
            <div class="mt-3 text-center sm:text-left">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Pilih Urutan Data
                </h3>

                <div class="mt-2">
                    <div class="grid">
                        <div class="inline-block relative w-full">
                            <select 
                                v-model="sorted_by"
                                class="block appearance-none w-full bg-white border py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">pilih Urutan</option>
                                <option value="trade_asc">Trade Asc </option>
                                <option value="trade_desc">Trade Desc </option>
                                <option value="drawdown_desc">Drawdown Highest </option>
                                <option value="drawdown_asc">Drawdown Lowest </option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- One big close button.  --->
            <div class="mt-5 sm:mt-6">
                <span class="flex w-full rounded-md shadow-sm">
                    <button @click="getLast" class="inline-flex justify-center w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700">
                        Oke
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            open: Boolean,
            sortedBy: String,
            getLast: Function,
        },
        emits: ['update:sortedBy'],
        computed: {
            sorted_by: {
                get() {
                    return this.sortedBy
                },
                set(value) {
                    this.$emit('update:sortedBy', value)
                }
            }
        }
    }
</script>

<style lang="postcss" scoped>
    .custom-modal {
        @apply page-modal absolute z-10 flex 
                justify-center w-full md:bg-transparent
                py-5
    }
    .page-modal {
        position: fixed;
        top: 100px;
    }
</style>