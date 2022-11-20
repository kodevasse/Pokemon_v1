<template>
  <div class="h-full ">
    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <label for="my-modal-4" class="modal cursor-pointer">
      <label
        class="modal-box relative h-[30rem] w-[24rem] bg-gray-800 border border-teal-200 overflow-hidden "
        for=""
      >
        <h3 class="normal-case font-extrabold text-transparent text-3xl  sm:w-3/5 bg-clip-text bg-gradient-to-r  from-teal-300 to-fuchsia-900">
          {{ pokemon.name }}
        </h3>
        <p class="py-4">
        <div class="flex flex-row w-full space-x-2">
          <span
            
            v-for="(info, index) in pokemon.types"
          >
            <p class="bg-gray-900 px-3 py-1 rounded-full text-fuchsia-300">
              {{ info.type.name }}
            </p></span
          ></div>
        </p><NwImg v-if="pokemon.name"
              class="-mb-3 w-72 mx-auto "
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                pokemon.id
              }.png`"
            />
      </label>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  pokemon: {
    Type: Object,
    default: {},
  },
});
</script>
