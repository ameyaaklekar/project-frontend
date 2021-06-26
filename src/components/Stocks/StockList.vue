<template>
  <v-data-table
    :headers="headers"
    :items="suppliers"
    class="elevation-3"
    :search="search"
  >
    <template v-slot:item.status="{ item }">
      <v-chip
        small
        v-if="item.status"
        class="success"
        dark
      >
        Active
      </v-chip>
      <v-chip
        small
        v-else
        class="error"
        dark
      >
        Inactive
      </v-chip>
    </template>

    <template v-slot:top>
      <v-toolbar
        flat
        extended
      >
        <v-toolbar-title>Stock List</v-toolbar-title>

        <template v-slot:extension>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            flat
            label="Search"
            solo-inverted
            single-line
            clearable
            hide-details
          ></v-text-field>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-select
            v-model="supplierName"
            flat
            solo-inverted
            hide-details
            clearable
            :items="keys"
            label="Find by Supplier"
          ></v-select>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-btn
            color="primary mr-4"
            dark
            class="mb-2 d-none d-sm-flex"
          >
            Import CSV
          </v-btn>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add Stock
              </v-btn>
            </template>
            <StockListForm
              :item="editedItem"
              :viewMode="viewMode"
              :close="close"
              :save="save"
              :index="editedIndex"
             />
          </v-dialog>
        </template>

        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6 justify-center">Are you sure you want to delete this supplier?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="viewItem(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
import StockListForm from '../Forms/Stocks/StockListForm.vue'
  export default {
    components: { 
      StockListForm 
    },
    data: () => ({
      supplierName: '',
      search: '',
      dialog: false,
      dialogDelete: false,
      viewMode: false,
      suppliers: [],
      editedIndex: -1,
      editedItem: {
        status: 0,
        country: "",
        contact: "",
        email: "", //ameya@gmail.com
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        companyId: "",
        contactPerson: ""
      },
      defaultItem: {
        name: '',
        contactPerson: '',
        status: 0,
        countryCode: "",
        contact: "",
        email: "", //ameya@gmail.com
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        companyId: "",
      },

      keys: [
        'Supplier 1',
        'Supplier 2',
        'Supplier 3',
        'Supplier 4',
      ],
    }),
    

    computed: {
      headers() {
        return [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
            filter: value => {
              if (!this.supplierName) return true

              return value == this.supplierName
            },
          },
          { text: 'Contact Person', value: 'contactPerson' },
          { text: 'Email', value: 'email' },
          { text: 'Contact', value: 'contact' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },
        ]
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.suppliers = [
          {
            name: 'Supplier 1',
            contactPerson: 'Supplier',
            email: 'supplier@1.com',
            contact: '022 12345677',
            status: true,
            address: "Chelsea View",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            postalCode: "12345",
          },
          {
            name: 'Supplier 1',
            contactPerson: 'Supplier',
            email: 'supplier@1.com',
            contact: '022 12345677',
            status: true,
            address: "Chelsea View",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            postalCode: "12345",
          },
          {
            name: 'Supplier 2',
            contactPerson: 'Supplier',
            email: 'supplier@2.com',
            contact: '022 12345677',
            status: false,
            address: "Chelsea View",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            postalCode: "12345",
          },
          {
            name: 'Supplier 3',
            contactPerson: 'Supplier',
            email: 'supplier@3.com',
            contact: '022 12345677',
            status: true,
            address: "Chelsea View",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            postalCode: "12345",
          },
          {
            name: 'Supplier 4',
            contactPerson: 'Supplier',
            email: 'supplier@4.com',
            contact: '022 12345677',
            status: true,
            address: "Chelsea View",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            postalCode: "12345",
          },
        ]
      },

      viewItem (item) {
        this.editedIndex = this.suppliers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.viewMode = true
      },

      editItem (item) {
        this.editedIndex = this.suppliers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.viewMode = false
      },

      deleteItem (item) {
        this.editedIndex = this.suppliers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.suppliers.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.suppliers[this.editedIndex], this.editedItem)
        } else {
          this.suppliers.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style>

</style>