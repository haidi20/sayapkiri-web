<template>
    <main-layout>
        <div class="grid md:mt-28 mt-10 md:mx-6 overflow-x-scroll">
            <!-- start table desktop -->
            <div class="bg-white shadow-md rounded-2xl pt-4 px-2">
                <p class="text-3xl mb-5">Transaction Detail</p>
                <div class="flex flex-row">
                    <div class="mb-4">
                        <label class="label-custom">Name</label>
                        <account-input-user
                            :data="listUser"
                            :nameUser="nameUser"
                            @update:nameUser="nameUser = $event"
                            :onChooseUser="onChooseUser"
                        />
                    </div>
                    <div class=" ml-2 ">
                        <label class="label-custom">Account</label>
                        <select
                            name="account" 
                            v-if="accountsByUser.length > 0"
                            v-model="request.account"
                            class=" input-custom ">
                            <option v-for="(item, index) in accountsByUser" :value="item.account" :key="index">{{item.account}}</option>
                        </select>
                        <select 
                            name="account"
                            v-if="accountsByUser.length <= 0"
                            class=" input-custom ">
                            <option value="null">Empty Accounts</option>
                        </select>
                    </div>
                    <div class=" ml-2 ">
                        <label class="label-custom">Tgl</label>
                        <input class=" input-custom " type="date" v-model="request.start_date"  >
                    </div>
                    <div class="">
                        <div class="mb-7" ></div>
                        <input class=" ml-2 input-custom " type="date" v-model="request.stop_date"  >
                    </div>
                    <div>
                        <div class="mb-7" ></div>
                        <button 
                            type="submit" 
                            class=" ml-8 bg-green-500 text-white rounded-md p-2 "
                            @click="getTransactionDetail">
                            Apply
                        </button>
                    </div>
                    <div class="ml-2">
                        <div class="mb-12" ></div>
                        <p v-if="loading">loading...</p>
                    </div>
                </div>
                
                <vue-good-table 
                    fixed-header
                    :rows="rows"
                    :columns="columns"
                    max-height="600px"
                    :pagination-options="paginationOptions">
                </vue-good-table>
            </div>
        </div>
    </main-layout>
</template>

<style lang="postcss" scoped>
    
</style>

<script src="./TransactionDetailController.js"></script>