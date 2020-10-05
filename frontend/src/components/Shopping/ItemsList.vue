<template>
  <div class="items-list">
    <div v-if="loading">
      <vcl-facebook :width="300" :height="100" />
      <vcl-facebook :width="300" :height="100" />
      <vcl-facebook :width="300" :height="100" />
      <vcl-facebook :width="300" :height="100" />
    </div>
    <div v-for="(item, i) in items" :key="i">
      <items-card
        v-if="item.category === selectedCategory"
        :item="item"
        :index="i"
        @addItem="addItem($event)"
        @removeItem="removeItem($event)"
      />
    </div>
  </div>
</template>

<script>
import { VclFacebook } from 'vue-content-loading'
import ItemsCard from './ItemsCard.vue'

export default {
  name: 'ItemsList',
  components: {
    ItemsCard,
    VclFacebook,
  },
  data() {
    return {
      selectedItem: [],
    }
  },
  props: {
    items: Array,
    selectedCategory: Number,
    loading: Boolean,
  },
  methods: {
    addItem(i) {
      this.$emit('addItem', i)
    },
    removeItem(i) {
      this.$emit('removeItem', i)
    },
  },
}
</script>

<style lang="scss">
.items-list {
  background-color: rgb(240, 240, 240);
  border-radius: 2px;
  width: calc(100% - 114px);
  display: flex;
  flex-direction: column;
  height: 460px;
  overflow: auto;
  #loading {
    align-self: center;
  }
}
</style>
