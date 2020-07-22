<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="display-1 my-2">
        Digital Drift 實作題
      </h1>
    </v-card-title>

    <div class="text-center my-5">{{ tab }}</div>

    <v-tabs grow :class="{ fixed: active }">
      <v-tab v-for="item in items" :key="item.index" @click="changeTab(item)">
        {{ item }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  props: {
    initialState: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tab: '狗',
      items: ['狗', '貓'],
      active: false,
    }
  },
  watch: {
    initialState(value) {
      this.active = value
    },
  },
  methods: {
    changeTab(data) {
      this.tab = data
      this.$emit('changeTarget', data)
    },
  },
}
</script>

<style>
.fixed {
  position: fixed;
  z-index: 100;
  top: 0;
  background-color: '#fffbe6' !important;
}
</style>
