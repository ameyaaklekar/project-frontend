<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    app
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>John Leider</v-list-item-title>

      <v-btn
        icon
        @click.stop="mini = !mini"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item 
        v-for="item in menuItems" :key="item.title"
        link 
        :to="item.url">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    drawer: Boolean, 
    mini: Boolean
  },
  data: () => ({ 
    menuItems: [
      {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard',
        url: '/'
      },
      {
        title: 'Suppliers',
        icon: 'mdi-factory',
        url: '/suppliers'
      },
      {
        title: 'Stock',
        icon: 'mdi-store',
        url: '/stock'
      },
      {
        title: 'Employees',
        icon: 'mdi-account-group',
        url: '/employees'
      },
    ]
  })
}
</script>

<style>

</style>