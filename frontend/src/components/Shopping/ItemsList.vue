<template>
  <div class="items-list">
    <div v-for="(item, i) in items"
      :key="i"
    >
      <div v-if="item.category === selectedCategory">
        {{ item.name }}
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'ItemsList',
  props: {
    items: Array,
    selectedCategory: Number
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