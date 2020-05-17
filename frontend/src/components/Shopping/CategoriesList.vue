<template>
  <div class="category-list">
    <div class="categoy-cards" v-for='(item, index) in categories' :key="index">
      <div class="category-text" >{{ item }} </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CategoriesList',
  data() {
    return {
      categories: [
        'Tous les Cocos',
        'Categorie 2',
        'Categorie 3',
        'Categorie 4',
        'Categorie 5',
        'Categorie 6'
      ]
    }
  }
}



</script>

<style lang="scss">

.category-list {
  background-color: rgb(221, 221, 221);
  width: 27%;
  padding-right: 2px;
  border-radius: 2px;
  .categoy-cards {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: red;
    height: 40px;
    .category-text {

    }
  }
}

</style>