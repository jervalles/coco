<template>
  <div class="shopping">
    <category-list />
    <items-list />
  </div>
</template>

<script>
import CategoryList from './CategoriesList'
import ItemsList from './ItemsList'

export default {
    name: 'Shopping',
    components: {
      CategoryList,
      ItemsList
    }
}

</script>

<style lang="scss">

  .shopping {
    position: absolute;
    justify-content: center;
    width: 100%;
    height: auto;
    top: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

</style>