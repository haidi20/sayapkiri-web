<template>
  <main-layout>
    <modal
      v-bind:open="open"
      v-bind:getLast="getLast"
      v-bind:sortedBy="request.sorted_by"
      @update:sortedBy="request.sorted_by = $event"
    />
    <div v-if="list.length <= 0 && !loading" class="bg-white h-screen flex">
      <div class="text-center m-auto">
        <img
          class="m-auto"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAwUlEQVRIie2UQQrCMBBFH130CIIguPAqigp6moJ4AC8j7vQwuq7QraC41oUzEFJDp4kLF3kQCtOZ95MGCpkIJkADvHquRmY7OUXIdR275DNpvANDy26EAXCT2WWoqQQu0lT1kCuVzJ7F1WJL/Kfx18aXj4DHDwOewNgNOHgNsbiOvRb1Yt0TpAaoa1oAK3m5M+7MclJ1rbUw53PzoUFrgNZLcQYbYmnNFwkyEzng/wKu8oz9RbiOryyAOiGgFkfGzhvuZpNwB/LJQQAAAABJRU5ErkJggg=="
        />
        <p class="">Data Empty</p>
      </div>
    </div>
    <div
      v-if="list.length > 0"
      class="grid md:grid-cols-4 md:gap-5 md:mx-10 md:my-6 mt-12 md:mt-20"
    >
      <div
        v-for="(item, index) in list"
        :id="'card_' + index"
        :key="index"
        @click="capture(index)"
        class="
          max-w-sm
          overflow-hidden
          mb-2
          bg-white
          rounded-lg
          transform
          duration-200
          cursor-pointer
        "
      >
        <div class="mx-6 border-b grid bg-white">
          <div class="row flex my-4">
            <div class="flex-1">
              <div class="grid">
                <div class="text-lg font-bold">
                  {{ item.account }}
                </div>
                <div class="text-green-600">
                  <!-- {{item.account_name}} -->
                  {{ !hiddenName ? sortName(item.account_name) : "*****" }}
                </div>
              </div>
            </div>
            <div class="flex-1">
              <div class="grid">
                <div class="text-right">
                  <strong
                    >{{ item.ea_enable == 1 ? "Active" : "Non-Active" }}
                  </strong>
                  <span
                    v-if="item.location"
                    class="
                      text-xs
                      font-semibold
                      inline-block
                      mx-1
                      pb-2
                      px-2
                      rounded-sm
                      text-white
                      bg-green-500
                    "
                  >
                    {{ item.location }}
                  </span>
                </div>
                <div class="text-xs text-right">
                  <!-- Aync: 17 Oct 21 15:09 -->
                  Sync: {{ formatDate(item.broker_time) }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex my-4">
            <div class="flex-1">
              <div class="grid">
                <div class="">
                  <strong style="display: inline"> Floating </strong>
                  <p
                    class="text-sm text-blue-500 font-bold"
                    style="display: inline"
                  >
                    {{ item.dd }}%
                  </p>
                </div>
                <div class="text-red-500 font-bold text-2xl">
                  {{ item.floating }}
                </div>
              </div>
            </div>
            <div class="flex-1">
              <div class="grid text-right">
                <!-- pnlday -->
                <div class="font-bold">
                  <p
                    class="text-sm text-blue-500 font-bold"
                    style="display: inline"
                  >
                    {{ item.pnlday }}%
                  </p>
                  <strong style="display: inline"> Profit/Day </strong>
                </div>
                <div
                  :class="colorProfit(item.profit)"
                  class="font-bold text-2xl"
                >
                  {{ item.profit }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          :class="bgFooter(item.ea_enable)"
          class="flex text-center text-white py-2"
        >
          <div class="flex-1">
            <div class="grid">
              <div class="text-lg font-bold">
                {{ item.trade }}
              </div>
              <div class="text-sm">Open</div>
            </div>
          </div>
          <div class="flex-1">
            <div class="grid">
              <div class="text-lg font-bold">
                {{ customNumber(item.equity) }}
              </div>
              <div class="text-sm">Equity USC</div>
            </div>
          </div>
          <div class="flex-1">
            <div class="grid">
              <div class="text-lg font-bold">
                {{ customNumber(item.pnlmnt) }}%
              </div>
              <div class="text-sm">PnL Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      type="button"
      @click="hiddenName = !hiddenName"
      class="
        bg-white
        border-4 border-green-300
        text-white
        font-bold
        py-2
        px-2
        rounded-lg
        focus:outline-none focus:shadow-outline
        btn-hidden-name
      "
    >
        <svg v-if="!hiddenName" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-eye text-green-300 " width="20" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
        </svg>
        <svg v-if="hiddenName" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-eye-slash-fill text-green-300 " width="20" viewBox="0 0 16 16">
            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
        </svg>
    </button>
    <button
      type="button"
      @click="toggleModal"
      class="
        bg-white
        border-4 border-green-300
        text-white
        font-bold
        py-2
        px-2
        rounded-lg
        focus:outline-none focus:shadow-outline
        btn-orderBy
      "
    >
      <img
        width="20"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAyklEQVRIie2TMQqDQBBF/9hYp7VZQbBLn0vYeoggmDKdm84LeJs9QHob2cqcwFpQTJEQRGZXBJMi7O92hnl/2dkPOK2I5oe4LaY9oDq8fbjeHsD/FnHFuC0qAOeNqEqHMltW2R0EgnIAagNdBQIX1tY0cXxcD/3k3wHEK3DtU3+qRdlxTeMvqkXZeSMlALGD7/t13kiJCW41AIAmkhqEFMDAtAcQ0iaS2sZYzYEWUgET876Uv3p2GXew1DLl87Ta9PUkOwNn4PQDPQExqS/MSsyAVgAAAABJRU5ErkJggg=="
      />
    </button>
    <button
      type="button"
      @click="refresh"
      class="
        bg-white
        border-4 border-green-300
        text-white
        font-bold
        py-2
        px-2
        rounded-lg
        focus:outline-none focus:shadow-outline
        btn-refresh
      "
    >
      <img
        width="20"
        v-if="!loading"
        class="transition-all duration-300"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAADCklEQVRIie2WTYhTVxTHf+fmZabQLqo4LeJgJjOZPIXSRaG4culGsEMddVGhKC5EB8UWilhs5pL6QRHH1UiLC7G4Mp1atRS6dyO4EkTyMSbRKNoR24VddF7ePV0kSDKJmckYZ+V/dXjnvPs753LvuQfeaoUkSw0cnrXro4btKroF2ADyIYAqj0UoAH+E1eDabOLkw56Ah2ftes8jjfIFaHSR5QLQS2G1ml4sgY5gv2x3qOoF4H2QQNCMU/1djLn1Tv+LpwD/Bu+tNVX3qYh8BjJeT+4fJ/plIZa+0TV4Y+nbtSHRCmCAX6uhfHV/xD7omGjpeBy8M4qOg6qqOZiP2x+7q1gRvzyZVpF8LmZ/7gRsSaBoj6i4KTAOZUcubn9bOvg1lSzZr0HPAs9dML+hMHp6rtFv3hQ4N2SnVLkOrI5E+39Y6G8C++XUTr+c2tkreOjkEEig6O5E/thAW3Aif2xA1UyrmumFQcvV/RH7QOA60Bfx+ne3BZto/zToAOhAze6NnLoZABXd3AL2y3YXaMMWa8+23HPudt38uPG7JB/bNczrXeCDBf88C1zwUXH41NPlAJMle6W5mAYpVwzznG8DBVgTjfT9tBwoAH0cBGmX9LMwlENN9zhZsgXQkUgYJu+NnMgvG1qXX0yNqUhT8xDRXdlYOrPwHt8BCI355HWhANl4+hpIpgGbycbSGWhtIDdrfjPeCzCAC/6bAJkDmavZNTWBwyqX60/bWKJiB3sBLoyenhNxEyJuorFttvTqZHnyIsoekKu5Ibu9F/B2aunVYSBHQf4G/dwv2iMrBp5N2L/A7QMJVdzUaNke7nbR0aLd45cmv0df/fq90uEXUwdUmAYRQWag+k126ESxE9AvHY+reOdQHQNcVGXd3bh90hUYIFFObTNqLoGuqh+6GUVuREJu97374hHURh8vdJtUzDZUxwEPeC4i+7Mx+0vXFb+EV+ygCfQ7RPYuPuwxr3BZPZksDNpKp8AlTyCJih00VTcGshVIgKyDl+NtTsX9qRFzdTHgW624/geaOjjHP3ou7AAAAABJRU5ErkJggg=="
      />
      <img
        style="display: inline"
        v-if="loading"
        width="20"
        class="transition-all duration-300"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADvElEQVRoge2ZT2wUVRzHv7833XbdTSyBeoMQL+KBttGWmBBjSuSPRvEgbiF4MBHYhgSNPajFi3uQpieL9GC2VL2oYFtOJD1YoY0H0oSlKS1JqdAQQry5FCutw27nfT3YrWU7s76BWaRxPrd57/fe7/fNe783v3kDhISErGqkHJOmBprWO9rqFMEuACA4SG21fbZ78FrQvgIXkBpoWq9pXQawtqjrtqNZd2z3+V+D9KeCnAwAHG11YmXwALC2QuHzoP0FLqCwbdwgxLPvQakwNSQhx87tbIbCDgUVJfTPNU9mv2lpvJQvNg04xpIYrUAqlVLt53d+LyKnhXKA5NugpLOzNQPpTENkuS3Bn7zmITH4sAEXYyQg8uLIfkD2uQS0PXvnqXeXt1mQoxBkXaa5bVU4R718jE1Ovz42ef3IhVu3njCJqYCRACps9+wT3bT8OfXauV8ch/UC9gKYBTBLol9ZzgupV4avu80xOjm9h8KzFHTF5u55inTDOAf8sHhU7jW1V0pvJAsnusz58WUkQIhhAO+4d2LIj0M35mPRL2N37WqIml+4O+PrqDUSkFf2txFdtR/Ajvs6yJG8yn3tx6EbWzds+BPApw8y1vhNfGLg1ao/onwfmi9TREQwXJnXJz7c9aOvJQ8JecwomQPpTDJiL8zUaTqMRWomWhq7i8uG/xxPAcdH9tSJgz4InllsmlJQife29k08otiMcBWQziQj9r3slWXBF5iKVq6rLfdKDN0YisbtNa0AMBe907nt6W22l63reyBnZ+uhVgQPAJvm87/VAhgNJlR34vaaVgjaASCeqyaADi9b11powaL2GmBRyl8uKy75IFVJf64rEIvUTNi57BSATUVdV6sq1115+AhLM1f5+/F4rhqk4nzVzBelbD2TuOtColZD9+EfEVcVVPOqSOIC6Uwysrjn8bgeoyEh/3d83cz1ZJIJCpMAAM30oS09/WWJygfGAnoyyQT+/lBfgmQiCBFnp7qeFUenAcS15uE3Nn9w0XSs+c0cdUtxk4gcMh5fAnH0VwBeAtAgStJ+xhoLoFpZQkhwt3BLFYECLD8DjQUIpbu4TZM9XvYkpHe8raF3vK2BLL1VteYRANMAbgpVq2lMgM8kPnnx4FsikgRAIboPbDl5xs2OhPww/nE/RN5c9HJm7+aOhEjw96Zl+cFxauKjRqG6LxEV0Nhc13EpaF+BX68DgOgKz3I8aMoiYF99+yiA7wrPAvYnajvK+hFUFk6NtT13+vInz/9bEoeEhISsXv4CWyNMJld+0aMAAAAASUVORK5CYII="
      />
    </button>
  </main-layout>
</template>

<style lang="scss">
.btn-hidden-name {
    position: fixed;
    right: 15px;
    bottom: 120px;
}

.btn-orderBy {
  position: fixed;
  right: 15px;
  bottom: 75px;
}

.btn-refresh {
  position: fixed;
  right: 15px;
  bottom: 30px;
}


</style>

<script>
import moment from "moment";
import axios from "axios";
import MainLayout from "@/pages/MainLayout";
import Modal from "@/pages/DashboardModal";
import html2canvas from "html2canvas";
const { ClipboardItem } = window;

export default {
  data() {
    return {
      loading: false,
      hiddenName: false,
      token: localStorage.getItem("token"),
      list: [],
      request: {
        sorted_by: "trade_desc",
      },
      open: false,
    };
  },
  components: {
    MainLayout,
    Modal,
  },
  mounted() {
    this.getLast();
  },
  methods: {
    async getLast() {
      let that = this;
      this.loading = true;

      await axios
        .post(
          process.env.VUE_APP_BASE_URL + "api/dashboard/last-data",
          this.request,
          {
            headers: {
              Authorization: `Bearer ` + that.token,
            },
          }
        )
        .then(function (responses) {
          if (responses.data.status) {
            that.list = responses.data.data;

            that.open = false;
          } else if (!responses.data.status) {
            that.$router.push({
              name: "login",
            });
          }

          that.loading = false;
        })
        .catch((error) => {
          that.loading = false;
          console.log(error);
        });
    },
    refresh() {
      this.getLast();
    },
    formatDate(date) {
      return moment(date).format("DD MMM YYYY HH:mm");
    },
    colorProfit(profit) {
      return profit <= 0 ? "text-red-500" : "text-green-500";
    },
    bgFooter(eaEnable) {
      return eaEnable == 1 ? "bg-green-500" : "bg-gray-500";
    },
    sortName(name) {
      return name.substring(0, 18);
    },
    toggleModal() {
      this.open = !this.open;
    },
    customNumber(number) {
      return Intl.NumberFormat().format(number);
    },
    capture(index) {
      let elementCard = document.getElementById("card_" + index);

      html2canvas(elementCard).then((canvas) => {
        try {
          canvas.toBlob((blob) =>
            navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]),
          );

        //   document.body.append(canvas);
        } catch (err) {
          console.error(err.name, err.message);
        }

        this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
        })
        .fire({
            icon: "success",
            title: "Copy image",
        });
      });
    },
  },
};
</script>
