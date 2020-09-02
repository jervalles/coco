<template>
  <div class="admin-page">
    ADMIN PAGE
    <orders-list />
  </div>
</template>

<script>
import OrdersList from '../components/Orders/OrdersList'

export default {
  name: 'Admin',
  components: {
    OrdersList
  }
}

</script>

<style>

  .admin-page {
    height: 100vh;
  }

</style>