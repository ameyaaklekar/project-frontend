<template>
  <v-navigation-drawer
    v-model="toggleDrawer"
    :mini-variant.sync="mini"
    clipped
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
      <template v-for="item in menuItems">
        <v-list-group
          :prepend-icon="item.icon"
          no-action
          :key="item.title"
          v-if="item.children"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.title"
            :to="child.url"
            :exact="child.exact"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
         <v-list-item 
          link 
          v-else
          :key="item.title"
          :to="item.url"
          :exact="item.exact"
          class="primary--text"
          >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </template>
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
  computed: {
    toggleDrawer: {
      get() {
        return this.drawer
      },
      set(value) {
        return value
      }
    }
  },
  data: () => ({ 
    menuItems: [
      {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard',
        exact: true,
        url: {
          name: 'Dashboard'
        }
      },
      {
        title: 'Suppliers',
        icon: 'mdi-factory',
        url: {
          name: 'Suppliers'
        },
      },
      {
        title: 'Stocks',
        icon: 'mdi-store',
        children: [
          {
            title: 'Available Stocks',
            url: '/stocks', 
          },
          {
            title: 'Stock List',
            url: '/stock-list', 
          }
        ]
      },
      {
        title: 'Stock Orders',
        icon: 'mdi-receipt',
        url: '/orders'
      },
      {
        title: 'Recepies',
        icon: 'mdi-food',
        url: '/recepies'
      },
      {
        title: 'Reports',
        icon: 'mdi-file-chart',
        url: '/reports'
      },
      {
        title: 'Budget',
        icon: 'mdi-cash-multiple',
        url: '/budget'
      },
      {
        title: 'Roster',
        icon: 'mdi-calendar-clock',
        url: '/roster'
      },
      {
        title: 'Employees',
        icon: 'mdi-account-group',
        url: '/employees'
      },
    ]
  }),
}
</script>