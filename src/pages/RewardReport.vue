<template>
    <main-layout>
        <div class=" md:grid md:grid-cols-4 md:mt-28 mt-5 md:mx-6 ">
            <!-- Start form -->
            <div class="col-span-1 ">
                <form class=" bg-white shadow-md rounded py-8 px-2 md:mr-6 " @submit.prevent="onSubmit">
                    <p class="md:mb-5 sm:mb-5 md:text-3xl sm:text-3xl inline-flex ">Form Reward Report</p>
                    <div
                        class=" transition-all duration-1000 overflow-y-auto ">
                        <div class="mb-4">
                            <label class="label-custom">
                                File
                            </label>
                            <input class="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                type="file" 
                                @change="onCsvToJson"
                                ref="myFiles"
                                id="formFile">
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
                    </div>
                </form>
            </div>
            <!-- End form -->
        </div>
    </main-layout>
</template>

<style lang="postcss" scoped>

</style>

<script>
import moment from 'moment';
import { http } from '@/http.js';
import csvToJson from 'convert-csv-to-json';
// import {baseUrl} from '@/helpers';
import MainLayout from '@/pages/MainLayout';

export default {
    data() {
        return {
            file: {},
        }
    },
    components: {
        MainLayout,
    },
    methods: {
        onCsvToJson(event) {
            this.file = this.$refs.myFiles.files[0];
        },
        onSubmit() {
            let reader = new FileReader();
            
            reader.readAsText(this.file);

            reader.onload = function() {
                let csv = reader.result;
                let lines = csv.split("\n");
                let result = [];
                let headers = lines[0].split(",");

                console.log(headers);

                for(var i=1;i<lines.length;i++){
                    let obj = {};
                    let currentline=lines[i].split(",");

                    for(let j=0;j<headers.length;j++){
                        obj[headers[j]] = currentline[j];
                    }

                    result.push(obj);
                }  
                    //return result; //JavaScript object
                    // result= JSON.stringify(result); //JSON
                    console.log(result);
            };
        }
    }
}
</script>