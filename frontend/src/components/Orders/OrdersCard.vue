<template>
  <div class="order-card">
    <div class="order-title">
      <div>ORDER N° #{{ order.orderId }}</div>
      <div class="order-email">{{ order.userEmail }}</div>
    </div>

    <div v-for="(item, i) in order.items" :key="i">
      {{ item.itemName }}:
      <span class="item-quantity">{{ item.quantity }}</span>
    </div>
    <v-btn @click="openDialog()" small color="success" class="order-delete"
      >RECEPTION FAITE</v-btn
    >
  </div>
</template>

<script>
export default {
  name: 'OrdersCard',
  components: {},
  data() {
    return {
      chip1: true,
    }
  },
  props: {
    order: Object,
    index: Number,
  },
  computer: {},
  methods: {
    openDialog() {
      this.$emit('open-dialog', {
        index: this.index,
        orderId: this.order.orderId,
      })
    },
  },
}
</script>

<style lang="scss">
.order-card {
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
  width: 100%;
  min-height: 150px;
  align-items: center;
  justify-content: space-around;
  border-radius: 3px;
  margin-bottom: 10px;
  -webkit-box-shadow: -1px 6px 7px 0px rgba(145, 145, 145, 0.82);
  -moz-box-shadow: -1px 6px 7px 0px rgba(145, 145, 145, 0.82);
  box-shadow: -1px 6px 7px 0px rgba(145, 145, 145, 0.82);
  .order-title {
    margin-top: 10px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .order-email {
    margin-bottom: 10px;
  }
  .order-delete {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .item-quantity {
    color: green;
  }
}
</style>
