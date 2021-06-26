<template>
  <v-app>
    <Navigation/>
    <v-main>
      <v-container fluid>
        <div style="height: 5px"></div>
        <router-view/>
      </v-container>
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
