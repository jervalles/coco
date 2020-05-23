<template>
  <div class="items-list">
    <div v-for="(item, i) in items"
      :key="i"
    >
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
import ItemsCard from './ItemsCard'

export default {
  name: 'ItemsList',
  components: {
    ItemsCard
  },
  data() {
    return {
      selectedItem: []
    }
  },
  props: {
    items: Array,
    selectedCategory: Number
  },
  methods: {
    addItem(i) {
      this.$emit('addItem', i)
    },
    removeItem(i) {
      this.$emit('removeItem', i)
    }
  }
}

</script>

<style lang="scss">

.items-list {
  background-color:rgb(240, 240, 240);
  border-radius: 2px;
  width: calc(100% - 114px);
}

</style>