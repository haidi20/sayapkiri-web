<template>
  <main-layout>
    <div class="grid md:mt-28 mt-10 md:mx-6">
      <!-- start table desktop -->
      <div class="bg-white shadow-md rounded-2xl pt-4 hidden-mobile px-2">
        <p class="text-3xl mb-5">Last Data</p>
        <!-- <hr class="border-1 border-gray-400 mb-5 " > -->
        <div class="flex flex-row">
          <div class="">
            <select
              @change="getLastData"
              v-model="request.field"
              class="
                border
                w-full
                py-1
                px-1
                border-gray-300
                text-black
                overflow-hidden
                rounded-md
                shadow-sm
                focus:outline-none
              "
              :disabled="table.length <= 0 ? true : false"
            >
              <option value="location">loc</option>
              <option value="account_name">user</option>
              <option value="account">account</option>
              <option value="profit">profit</option>
              <option value="pnlday">pnlday</option>
              <option value="pnlmnt">pnlmonth</option>
              <option value="equity">equity</option>
              <option value="floating">floating</option>
              <option value="trade">trade</option>
              <option value="dd">dd</option>
            </select>
          </div>
          <div class="ml-4">
            <select
              @change="getLastData"
              v-model="request.sorted"
              class="
                border
                w-full
                py-1
                px-1
                border-gray-300
                text-black
                overflow-hidden
                rounded-md
                shadow-sm
                focus:outline-none
              "
              :disabled="table.length <= 0 ? true : false"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div class="ml-4">
            <button
              @click="getLastData"
              type="button"
              :disabled="loading ? true : false"
              class="
                bg-blue-500
                text-white
                border-2
                font-bold
                py-2
                px-3
                rounded-lg
                float-left
                hover:bg-blue-700 hover:text-white
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path
                  d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                />
              </svg>
            </button>
            <!-- <p v-if="loading" class="inline-block mt-3 ml-1 " >Loading...</p> -->
          </div>
        </div>
        <table class="w-full bg-white mt-2">
          <thead class="">
            <tr class="m">
              <th class="th-desktop">No</th>
              <th class="th-desktop">Location</th>
              <th class="th-desktop">Account</th>
              <th class="th-desktop">Account Name</th>
              <th class="th-desktop">Profit</th>
              <th class="th-desktop">Pnlday</th>
              <th class="th-desktop">Pnlmnt</th>
              <th class="th-desktop">Balance</th>
              <th class="th-desktop">Equity</th>
              <th class="th-desktop">Floating</th>
              <!-- <th class=" th-desktop " >ea enable</th>                         -->
              <th class="th-desktop">Trade</th>
              <th class="th-desktop">Broker Time</th>
              <!-- <th class=" th-desktop " >Created Date</th> -->
              <th class="th-desktop">Float Max</th>
              <th class="th-desktop">Float Trade</th>
              <th class="th-desktop">WD</th>
              <th class="th-desktop">Depo</th>
              <th class="th-desktop">Day</th>
              <!-- <th class=" th-desktop " >Row num</th> -->
              <th class="th-desktop">DD</th>
            </tr>
          </thead>
          <tbody class="overflow-y-auto">
            <tr class="" v-if="loading">
              <td class="text-center" colspan="20">Loading...</td>
            </tr>
            <tr class="" v-if="table.length <= 0 && !loading">
              <td class="text-center" colspan="20">Data Empty</td>
            </tr>
            <tr
              class="
                border-b-2 border-gray-300
                hover:bg-blue-200
                cursor-pointer
              "
              v-for="(item, index) in table"
              :key="index"
            >
              <td class="row-desktop text-center">{{ index + 1 }}</td>
              <td class="row-desktop text-center">
                {{ item.location }}
                <img
                  class="w-5"
                  style="display: inline"
                  v-if="item.ea_enable == 1"
                  src="data:image/png;base64,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"
                />
                <img
                  class="w-5"
                  style="display: inline"
                  v-if="item.ea_enable == 0"
                  src="data:image/png;base64,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"
                />
              </td>
              <td class="row-desktop text-center">{{ item.account }}</td>
              <td class="row-desktop">{{ item.account_name }}</td>
              <td class="row-desktop text-right">
                {{ item.custom_profit }}
              </td>
              <td class="row-desktop text-right">{{ item.pnlday }}%</td>
              <td class="row-desktop text-right">{{ item.pnlmnt }}%</td>
              <td class="row-desktop text-right">
                {{ item.custom_balance }}
              </td>
              <td class="row-desktop text-right">
                {{ item.custom_equity }}
              </td>
              <td class="row-desktop text-right">{{ item.floating }}</td>
              <td class="row-desktop text-center">
                {{ item.trade }}
                (<span class="text-blue-450">{{ item.trade_buy }}</span
                >/<span class="text-red-500">{{ item.trade_sell }}</span
                >)
              </td>
              <td class="row-desktop text-center">{{ item.broker_time }}</td>
              <!-- <td class=" row-desktop ">{{item.created_date}}</td> -->
              <td class="row-desktop text-right">
                {{ item.custom_float_max }}
              </td>
              <td class="row-desktop text-center">{{ item.float_trade }}</td>
              <td
                :class="item.wd < 0 ? 'text-red-500' : ''"
                class="row-desktop text-center">
                {{ item.custom_wd }}
              </td>
              <td
                :class="item.depo > 0 ? 'text-green-500' : ''"
                class="row-desktop text-center">
                {{ item.custom_depo }}
              </td>
              <td class="row-desktop text-center">{{ item.day }}</td>
              <!-- <td class=" row-desktop ">{{item.rownum}}</td> -->
              <td class="row-desktop text-center">{{ item.dd }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- start table mobile -->
      <div class="h-screen overflow-auto bg-white rounded pt-2 show-mobile">
        <p class="mb-1 pl-2 text-md">Last Data</p>
        <div class="flex flex-row mx-1" style="font-size: 9px">
          <div class="w-full">
            <select
              @change="getLastData"
              v-model="request.field"
              class="
                border
                w-full
                py-1
                px-1
                border-gray-300
                text-black
                overflow-hidden
                rounded-md
                shadow-sm
                focus:outline-none
              "
              :disabled="table.length <= 0 ? true : false"
            >
              <option value="location">loc</option>
              <option value="account_name">user</option>
              <option value="account">account</option>
              <option value="profit">profit</option>
              <option value="pnlday">pnlday</option>
              <option value="pnlmnt">pnlmonth</option>
              <option value="equity">equity</option>
              <option value="equity">W/D</option>
              <option value="floating">floating</option>
              <option value="trade">trade</option>
              <option value="dd">dd</option>
            </select>
          </div>
          <div class="w-full ml-1">
            <select
              @change="getLastData"
              v-model="request.sorted"
              class="
                border
                w-full
                py-1
                px-1
                border-gray-300
                text-black
                overflow-hidden
                rounded-md
                shadow-sm
                focus:outline-none
              "
              :disabled="table.length <= 0 ? true : false"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <table class="bg-white w-full mt-2" style="font-size: 9px">
          <thead>
            <tr class="">
              <th class="th-mobile">Loc</th>
              <th class="th-mobile">Account</th>
              <th class="th-mobile">Profit</th>
              <th class="th-mobile">Equity</th>
              <th class="th-mobile">W/D</th>
              <th class="th-mobile">Floating</th>
            </tr>
          </thead>
          <tbody class="">
            <tr class="" v-if="loading">
              <td class="text-center" colspan="20">Loading</td>
            </tr>
            <tr class="" v-if="table.length <= 0 && !loading">
              <td class="text-center" colspan="20">Data Empty</td>
            </tr>
            <tr
              @click="activeRow(index)"
              :class="classActiveRow(index)"
              class="border-b-2 border-gray-300"
              v-for="(item, index) in table"
              :key="index"
            >
              <td class="row-mobile text-center">
                {{ item.location }}
                <img
                  class="w-5"
                  style="display: inline"
                  v-if="item.ea_enable == 1"
                  src="data:image/png;base64,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"
                />
                <img
                  class="w-5"
                  style="display: inline"
                  v-if="item.ea_enable == 0"
                  src="data:image/png;base64,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"
                />
              </td>
              <td class="row-mobile">
                <span class="text-blue-450">
                  {{ item.account }}
                </span>
                <br />
                <span class="">
                  {{ item.account_name }}
                </span>
              </td>
              <td class="row-mobile text-center">
                {{ item.profit }} <br />
                <span class="text-blue-450"> {{ item.pnlday }}% / </span>
                <span class="text-green-400" style="display: inline">
                  {{ item.pnlmnt }}%
                </span>
              </td>
              <td class="row-mobile text-right">
                {{ item.custom_equity }}
              </td>
              <td class="row-mobile text-center">
                <span class="text-red-500">{{ item.wd }}</span> <br />
                <span class="text-green-500">{{ item.depo }}</span>
              </td>
              <td class="row-mobile text-right">
                ({{ item.trade }})
                <span class="text-red-500">
                  {{ item.floating }}
                </span>

                <br />
                (<span class="text-blue-450">
                  {{ item.trade_buy }}
                </span>
                <span class="text-black"> / </span>
                <span class="text-red-500"> {{ item.trade_sell }} </span>)
                <span class="text-black"> {{ item.dd }}% </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main-layout>
</template>

<style lang="postcss" scoped>
.active {
  @apply bg-blue-100;
}
select:disabled {
  @apply bg-gray-400 font-bold text-black;
}
button:disabled {
  @apply bg-gray-500;
}
.row-mobile {
  @apply py-2 px-1;
}
.row-desktop {
  @apply py-3;
}
.fixed-custom {
  position: sticky;
}
</style>

<script src="./LastDataController.js"></script>
