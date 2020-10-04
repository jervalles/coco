<template>
  <v-dialog v-model="dialog" :persistent="archeving" max-width="290">
    <v-card>
      <v-card-title class="headline">CONFIRMATION</v-card-title>
      <v-card-text
        >Êtes-vous sûr d'archiver cette commande ?
        <span>#{{ archiveInfos.orderId }}</span></v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          :disabled="archeving"
          @click="close()"
        >
          Annuler
        </v-btn>
        <v-btn
          color="red darken-1"
          :loading="archeving"
          dark
          @click="removeOrder()"
        >
          Archiver
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    archiveInfos: Object,
    archeving: Boolean,
  },
  methods: {
    close() {
      this.$emit('close-dialog')
    },
    removeOrder() {
      this.$emit('remove-order')
    },
  },
}
</script>

<style>
</style>