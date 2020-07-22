<template>
  <div class="items-list">
    <v-progress-circular
      v-if="loading"
      id="loading"
      :size="50"
      color="primary"
      indeterminate
      ></v-progress-circular>
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
    selectedCategory: Number,
    loading: Boolean
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
  display: flex;
  flex-direction: column;
  #loading {
    align-self: center;
  }
}

</style>