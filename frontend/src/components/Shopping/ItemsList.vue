<template>
  <div class="items-list">
    <div v-for="(item, i) in items"
      :key="i"
    >
      <div v-if="item.category === selectedCategory">
        {{ item.name }} / {{ item.price}}€
        <v-btn rounded @click="addItem(i)">+</v-btn>
        <v-btn rounded @click="removeItem(i)">-</v-btn>
        <div>{{ item.added }}</div>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'ItemsList',
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
  width: calc(100% - 140px);
}

</style>