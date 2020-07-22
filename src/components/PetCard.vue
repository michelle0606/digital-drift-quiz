<template>
  <v-col cols="6">
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="white--text align-end"
        height="200px"
        :src="pet.album_file"
        lazy-src="https://via.placeholder.com/150"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-row class="text-center" dense>
        <template>
          <v-col v-if="pet.animal_sex === 'M'" class="py-2">男生</v-col>
          <v-col v-else class="py-2">女生</v-col>
        </template>
        <v-col class="py-2">{{ pet.animal_colour }}</v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: {
    initialPet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pet: this.initialPet,
      isProcessing: false,
    }
  },
}
</script>
