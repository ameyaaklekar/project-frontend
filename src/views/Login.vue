<template>
  <v-row justify="center">
    <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <Login />
    </v-col>
  </v-row>
</template>

<script>
import Login from '../components/Login.vue'
export default {
  components: { 
    Login 
  },
}
</script>

<style>

</style>