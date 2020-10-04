<template>
  <div class="orders-list">
    <confirmation-dialog
      :dialog="this.dialog"
      :archeving="this.archeving"
      :archiveInfos="this.archiveInfos"
      @close-dialog="closeDialog()"
      @remove-order="removeOrder()"
    />
    <div v-if="orders.length === 0">Aucune commande en cours</div>
    <div class="orders-list-container" v-for="(order, i) in orders" :key="i">
      <orders-card
        :order="order"
        :index="i"
        :dialog="dialog"
        @open-dialog="openDialog($event)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OrdersCard from './OrdersCard.vue'
import ConfirmationDialog from '../ConfirmationDialog.vue'

export default {
  name: 'OrdersList',
  components: {
    OrdersCard,
    ConfirmationDialog,
  },
  data() {
    return {
      dialog: false,
      archiveInfos: {},
      archeving: false,
    }
  },
  computed: {
    ...mapGetters(['orders', 'archiveOrderStatus']),
  },
  mounted() {
    this.init()
  },
  watch: {
    archiveOrderStatus(status) {
      if (status.error) {
        console.log('error')
      } else if (status.success) {
        this.orders.splice(this.archiveInfos.index, 1)
        this.archeving = false
        this.archiveInfos = {}
        this.closeDialog()
      }
    },
  },
  methods: {
    ...mapActions(['fetchOrders', 'archiveOrder']),
    async init() {
      await this.fetchOrders()
      await setInterval(() => {
        this.fetchOrders()
      }, 10000)
    },
    async removeOrder() {
      this.archeving = true
      await this.archiveOrder(this.archiveInfos.orderId)
    },
    openDialog(event) {
      this.archiveInfos = event
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
  },
}
</script>

<style lang="scss">
.orders-list {
  padding: 0px 10px 0px 10px;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .orders-list-container {
    display: flex;
    flex-direction: row;
    width: 48%;
  }
}
</style>
