<template>
    <v-list >
      <v-list-item-group v-model="selectedCategory" color="primary">
        <v-list-item
          v-for="(item, i) in categories"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>



    <!-- <v-list-item-group class="category-list" v-model="selectedCategory" color="primary">
      <v-list-item
        v-for="(item, i) in categories"
        :key="i"
        :inactive="inactive"
      > {{ item.name }}
        <v-list-item-avatar v-if="avatar">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group> -->
</template>

<script>

export default {
  name: 'CategoriesList',
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
    }
  }
}

</script>

<style lang="scss">

// .category-list {
    
//     width: 140px;
//     padding-right: 4px;
//     border-radius: 4px;
//   .categoy-cards {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     background-color: red;
//     height: 40px;
//     .category-text {

//     }
//   }
// }

</style>