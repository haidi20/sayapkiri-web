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
            v-model="name_user"
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
              {{ value.nama }}
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
      showOptions: false,
    };
  },
  props: {
    data: Array,
    nameUser: String,
    onChooseUser: Function,
  },
  emits: ['update:nameUser'],
  computed: {
      name_user: {
          get() {
              return this.nameUser
          },
          set(value) {
              this.$emit('update:nameUser', value)
          }
      }
  },
  methods: {
    setInput(value) {
        this.$emit('update:nameUser', value.nama);
        this.showOptions = false;

        this.onChooseUser(value);
    },
    resultQuery() {
      if (this.nameUser) {
        let data = this.data.filter(item => {
          return this.nameUser
            .toLowerCase()
            .split(" ")
            .every(v => item.nama?.toLowerCase().includes(v));
        });

        // let data = this.data.filter(item => 
        //   this.nameUser == item.nama
        // )

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
