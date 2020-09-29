<template>
  <v-list id="category-list">
    <v-list-item-group v-model="selectedCategory" color="primary">
      <v-list-item
        v-for="(item, i) in categories"
        :key="i"
        @click="selectCategory(i)"
      >
        <v-list-item-content>
          <v-list-item-title class="category-text" v-text="item.name">
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'CategoriesList',
  data() {
    return {
      selectedCategory: 0
    }
  },
  props: {
    categories: Array
  },
  methods: {
    selectCategory(i) {
      this.$emit('selectCategory', i)
    }
  }
}
</script>

<style lang="scss">
#category-list {
  width: 110px;
  .category-text {
    font-size: 11px;
  }
}
</style>
