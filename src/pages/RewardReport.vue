<template>
  <main-layout>
    <div class="md:grid md:grid-cols-4 md:mt-28 mt-5 md:mx-6">
      <!-- Start form -->
      <div class="col-span-1">
        <form
          class="bg-white shadow-md rounded py-8 px-2 md:mr-6"
          @submit.prevent="onSubmit"
        >
          <p class="md:mb-5 sm:mb-5 md:text-3xl sm:text-3xl inline-flex">
            Form Reward Report
          </p>
          <div class="transition-all duration-1000 overflow-y-auto">
            <div class="mb-4">
              <label class="label-custom"> File </label>
              <input
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                @change="onInsertState"
                ref="myFiles"
                id="formFile"
              />
            </div>

            <div class="">
              <button type="submit" class="btn-send">Send</button>
              <button @click="resetForm" type="button" class="btn-cancel">
                Cancel
              </button>
              <span>{{ loading ? "loading" : "" }}</span>
            </div>
          </div>
        </form>
      </div>
      <!-- End form -->
      <!-- Start table Desktop -->
      <div class="h-screen col-span-3">
        <div class="bg-white shadow-md rounded py-6 px-4 overflow-x-auto">
          <p class="text-3xl mb-5">Reward Report</p>
          <div class="flex flex-row mb-2">
            <div class=" ">
              <div class="mb-7"></div>
              <input
                class="input-custom"
                type="date"
                v-model="request.start_date"
              />
            </div>
            <div class="">
              <div class="mb-7"></div>
              <input
                class="ml-2 input-custom"
                type="date"
                v-model="request.stop_date"
              />
            </div>
            <div>
              <div class="mb-7"></div>
              <button
                type="submit"
                class="ml-8 bg-green-500 text-white rounded-md p-2"
                @click="onApply"
              >
                Apply
              </button>
            </div>
            <div class="ml-2">
              <div class="mb-12"></div>
              <p v-if="loading">loading...</p>
            </div>
          </div>
          <div class="mb-4">
            <table class="w-full text-left table-collapse">
              <thead>
                <tr>
                  <th
                    class="z-20 sticky top-0 text-sm font-semibold text-gray-700 bg-gray-200 p-0"
                  >
                    <div class="p-2 border-b border-gray-300">Group Name</div>
                  </th>
                  <th
                    class="z-20 sticky top-0 text-sm font-semibold text-gray-700 bg-gray-200 p-0">
                    <div class="p-2 border-b border-gray-300">Vol Lots</div>
                  </th>
                  <th
                    class="z-20 sticky top-0 text-sm font-semibold text-gray-700 bg-gray-200 p-0">
                    <div class="p-2 border-b border-gray-300">Vol mln USD</div>
                  </th>
                  <th
                    class="z-20 sticky top-0 text-sm font-semibold text-gray-700 bg-gray-200 p-0">
                    <div class="p-2 border-b border-gray-300">Orders</div>
                  </th>
                  <th
                    class="z-20 sticky top-0 text-sm font-semibold text-gray-700 bg-gray-200 p-0">
                    <div class="p-2 border-b border-gray-300">Reward USD</div>
                  </th>
                </tr>
              </thead>
              <tbody class="align-baseline">
                <tr
                    class="border-b-2 border-gray-400"
                    v-for="(item, index) in sumData"
                    :key="index">
                  <td
                    class="p-2 font-mono text-xs text-black whitespace-no-wrap"
                  >
                    {{item.group_name}}
                  </td>
                  <td
                    class="p-2 font-mono text-xs text-black whitespace-no-wrap"
                  >
                    {{item.sum_volume_lots}}
                  </td>
                  <td
                    class="p-2 font-mono text-xs text-black whitespace-no-wrap"
                  >
                    {{item.sum_volume_mln_usd}}
                  </td>
                  <td
                    class="p-2 font-mono text-xs text-black whitespace-no-wrap"
                  >
                    {{item.sum_orders_count}}
                  </td>
                  <td
                    class="p-2 font-mono text-xs text-black whitespace-no-wrap"
                  >
                    {{item.sum_reward_usd}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <vue-good-table
            fixed-header
            :rows="rows"
            :columns="columns"
            max-height="600px"
            max-width="100px"
            ref="table"
            :pagination-options="paginationOptions"
          >
            <template #table-row="props">
              <span v-if="props.column.field == 'action'">
                <img
                  @click="onRemove(props.row.pid_account)"
                  width="20"
                  style="display: inline"
                  class="float-right cursor-pointer"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZElEQVRIiWNgGOqAkRhFP428Ghj/M9Qji/1n+N/Jfn57BckW/DL0+k+8+zAB2/ltKGYyUWLYyABYI5nceEAPfwYGOsQBQQvYzm9jxOYyXOIkW0ApGLVg1IJRC+hgwdAv7IY+AABHeRpR7gJWRgAAAABJRU5ErkJggg=="
                />
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
      <!-- End table Desktop -->
    </div>
  </main-layout>
</template>

<style lang="postcss" scoped></style>

<script>
import moment from "moment";
import { http } from "@/http.js";
import { VueGoodTable } from "vue-good-table-next";
import MainLayout from "@/pages/MainLayout";

export default {
  data() {
    return {
        loading: false,
        loadingSumData: false,
        form: [],
        rows: [],
        sumData: [],
        request: {
            offset: 0,
            limit: 100,
            search: null,
            stop_date: moment().format("YYYY-MM-DD"),
            start_date: moment().startOf("month").format("YYYY-MM-DD"),
        },
        paginationOptions: {
            perPage: 100,
            enabled: true,
            mode: "pages",
            perPageDropdown: [100, 200, 500, 1000],
        },
        columns: [
            {
                label: "Date",
                field: "reward_date",
            },
            {
                label: "Account",
                field: "client_account",
            // type: 'double',
            },
            {
                label: "Type",
                field: "client_account_type",
            // type: 'double',
            },
            {
                label: "Country",
                field: "country",
            },
            {
                label: "Currency",
                field: "currency",
            },
            {
                label: "Lots",
                field: "volume_lots",
            },
            {
                label: "MLN USD",
                field: "volume_mln_usd",
            },
            {
                label: "USD",
                field: "reward_usd",
            },
            {
                label: "Count",
                field: "orders_count",
            },
            {
                label: "Order",
                field: "reward_order",
            },
            {
                label: "GN",
                field: "group_name",
            },
        ],
    };
  },
  components: {
    MainLayout,
    VueGoodTable,
  },
  mounted() {
    this.getSumData();
    this.getDataRewardReport();
  },
  methods: {
    async getDataRewardReport() {
      this.loading = true;

      await http("api/reward-report", this.request)
        .then((responses) => {
          let status = responses.data.status;
          let data = responses.data.data;

          if (status) {
            this.rows = data.data;
            this.loading = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getSumData() {
      this.loadingSumData = true;

      await http("api/reward-report/sum-data", this.request)
        .then((responses) => {
          let status = responses.data.status;
          let data = responses.data.data;

          if (status) {
            this.sumData = data;
            this.loadingSumData = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onInsertState() {
      this.file = this.$refs.myFiles.files[0];
    },
    onSubmit() {
      let that = this;
      let reader = new FileReader();

      reader.readAsText(this.file);

      reader.onload = function () {
        let csv = reader.result;
        let lines = csv.split("\n");
        let result = [];
        let headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {
          let obj = {};
          let currentline = lines[i].split(",");

          for (let j = 0; j < headers.length; j++) {
            let index = headers[j].replace(/\s/g, "");
            let value = currentline[j];

            if (value != undefined) {
              obj[index] = value;
            }
          }

          if (obj["id"] != "") {
            result.push(obj);
          }
        }

        that.onSend(result);
      };
    },
    async onSend(result) {
      let that = this;
      await http("api/reward-report/store", { data: result })
        .then(function (responses) {
          let data = responses.data;

          if (data.status != undefined && data.status) {
            that.$swal
              .mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
              })
              .fire({
                icon: "success",
                title: data.remark,
              });

            location.reload();
          } else if (data.status != undefined && !data.status) {
            that.$swal
              .mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
              })
              .fire({
                icon: "warning",
                title: data.remark,
              });

            console.log(data.remark);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
          // this.getData();
        });
    },
    async onRemove(reward_order) {
      let that = this;

      return await this.$swal
        .fire({
          icon: "question",
          title: `Do you want to delete Reward Order = <b>${reward_order}</b> ?`,
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            http("api/rewardReport/delete", { reward_order: reward_order })
              .then(function (responses) {
                let data = responses;

                if (data.status != undefined && data.status) {
                  that.$swal
                    .mixin({
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timerProgressBar: true,
                      timer: 2000,
                    })
                    .fire({
                      icon: "success",
                      title: data.remark,
                    });

                  that.getDataAccounts();
                } else if (data.status != undefined && !data.status) {
                  that.$swal
                    .mixin({
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timerProgressBar: true,
                      timer: 2000,
                    })
                    .fire({
                      icon: "warning",
                      title: data.remark,
                    });

                  console.log(data.remark);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (result.isDenied) {
            this.$swal.fire("Changes are not saved", "", "info");
          }
        });
    },
    onApply() {
        this.getSumData();
        this.getDataRewardReport();
    },
  },
};
</script>
