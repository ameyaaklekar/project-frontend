<template>
  <v-app id="inspire">
    <Navigation/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation/Navigation.vue'
  export default {
    components: { 
      Navigation 
    },
  }
</script>
