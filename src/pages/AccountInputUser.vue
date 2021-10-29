<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div id="app" class="justify-center w-full">
    <div>
      <div class="w-full relative">
        <div
          class="mt-1 relative border border-gray-300 overflow-hidden rounded-md shadow-sm"
        >
          <input
            id="email"
            @keyup="showOptions = true"
            v-model="formData.client"
            class=" input-custom "
            autocomplete="off"
          />
        </div>
        <div
          v-show="resultQuery().length && showOptions"
          class="absolute w-full z-50 bg-white border border-gray-300 mt-1 max-height-48 overflow-hidden overflow-y-scroll rounded-md shadow-md"
        >
          <ul class="py-1">
            <li
              v-for="(value, index) in resultQuery()"
              @click="setInput(value)"
              class="px-3 py-2 cursor-pointer hover:bg-gray-200"
              :key="index"
            >
              {{ value.clients_name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      formData: {},
      showOptions: false,
      data: [
        { id: 1, clients_name: "Jane Doe" },
        { id: 2, clients_name: "John Doe" },
        { id: 3, clients_name: "Hello World" },
      ]
    };
  },
  methods: {
    setInput(value) {
        this.formData.client_id = value.id;
        this.formData.client = value.clients_name;
        this.showOptions = false;
    },
    resultQuery() {
      if (this.formData.client) {
        let data = this.data.filter((item) => {
          return this.formData.client
            .toLowerCase()
            .split(" ")
            .every((v) => item.clients_name.toLowerCase().includes(v));
        });

        return data;
      } else {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.max-height-48 {
  max-height: 200px;
}
</style>
