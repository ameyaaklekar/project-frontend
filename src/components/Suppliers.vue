<template>
  <v-data-table
    :headers="headers"
    :items="suppliers"
    sort-by="calories"
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
      >
        <v-toolbar-title>Suppliers</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
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

        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2 ml-4"
              v-bind="attrs"
              v-on="on"
            >
              New Supplier
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Supplier name"
                      :disabled="viewMode"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.contactPerson"
                      label="Contact Person"
                      :disabled="viewMode"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      :disabled="viewMode"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="4"
                  >
                    <v-autocomplete
                      auto-select-first
                      :items="countries"
                      label="Country Code"
                      v-model="editedItem.country"
                      :disabled="viewMode"
                      required
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="8"
                  >
                    <v-text-field
                      v-model="editedItem.contact"
                      label="Phone Number"
                      :disabled="viewMode"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.address"
                      label="Address Line"
                      required
                      :disabled="viewMode"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.city"
                      label="City"
                      required
                      :disabled="viewMode"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.state"
                      label="State"
                      required
                      :disabled="viewMode"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.postalCode"
                      label="Postal Code"
                      required
                      :disabled="viewMode"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-autocomplete
                      auto-select-first
                      :items="countries"
                      label="Country"
                      v-model="editedItem.country"
                      :disabled="viewMode"
                      required
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-switch 
                      v-model="editedItem.status"
                      :disabled="viewMode"
                    >
                      <template v-slot:label>
                        <label v-if="editedItem.status">Active</label>
                        <label v-else>Inactive</label>
                        <!-- <v-progress-circular
                          :indeterminate="editedItem.status"
                          :value="0"
                          size="24"
                          class="ml-2"
                        ></v-progress-circular> -->
                      </template>
                    </v-switch>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                v-if="!viewMode"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
  export default {
    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      viewMode: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Contact Person', value: 'contactPerson' },
        { text: 'Email', value: 'email' },
        { text: 'Contact', value: 'contact' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
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

      countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
    }),
    

    computed: {
      formTitle () {
        if (!this.viewMode) {
          return this.editedIndex === -1 ? 'New Supplier' : 'Edit Supplier'
        } else {
          return 'View Supplier'
        }
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