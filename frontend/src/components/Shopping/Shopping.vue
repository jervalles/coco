<template>
  <div class="shopping">
    <category-list 
      :categories="categories" 
      @selectCategory="selectCategory($event)" 
    />
    <items-list :items="items" 
      :selectedCategory="selectedCategory" />
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
    },
    data() {
      return {
        categories: [
          { name: 'Tous les Cocos' },
          { name: 'Categorie 2' },
          { name: 'Categorie 3' },
          { name: 'Categorie 4' },
          { name: 'Categorie 5' },
          { name: 'Categorie 6' },
        ],
        selectedCategory: 0,
        items: [
          {
            name: 'nom1',
            category: 0,
          },
          {
            name: 'nom2',
            category: 1,
          },
          {
            name: 'nom3',
            category: 2,
          },
          {
            name: 'nom4',
            category: 3,
          },
          {
            name: 'nom5',
            category: 4,
          },
          {
            name: 'nom6',
            category: 5,
          },
          {
            name: 'nom7',
            category: 5,
          },
        ]
      }
    },
    methods: {
      selectCategory(event) {
        this.selectedCategory = event
        console.log(this.selectedCategory)
      }
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