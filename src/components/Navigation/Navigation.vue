<template>
  <nav>
    <v-app-bar 
      app
      tile
      short
      clipped-left
    >
      <v-app-bar-nav-icon @click="() => { drawer = !drawer; mini = false }"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <NotificationMenu />

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="150"
        offset-y
        left
        bottom
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account-cog</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
                <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item 
              v-for="item in settingsMenu" :key="item.title"
              link 
              :to="item.url">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <Sidebar v-bind:drawer="drawer" v-bind:mini="mini" />

  </nav>
</template>

<script>
import NotificationMenu from './NotificationMenu.vue'
import Sidebar from './Sidebar.vue'
export default {
  name: 'Navigation',
  components: { 
    Sidebar,
    NotificationMenu 
  },
  data: () => ({
    message: true,
    hints: true,
    drawer: null,
    mini: false,
    menu: false,
    settingsMenu: [
      {
        title: 'Profile',
        url: '/profile'
      },
      {
        title: 'Company Profile',
        url: '/suppliers'
      },
      {
        title: 'Preferences',
        url: '/stock'
      }
    ]
  }),
}
</script>

<style>

</style>