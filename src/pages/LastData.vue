<template>
  <main-layout>
    <div class="grid md:mt-28 mt-10 md:mx-6">
      <h1>Last data</h1>
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

<script src="./LastData.js"></script>
