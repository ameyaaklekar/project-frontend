<template>
  <v-card 
    class="pa-5"
    elevation="12"
  >
    <v-card-title 
      class="text-center block text-title justify-center"
    >
      <h1>Login</h1>
    </v-card-title>
    <v-card-subtitle 
      class="text-center block text-title justify-center"
    >
      Some text will go here
    </v-card-subtitle>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    > 
      <v-text-field
        v-model="form.email"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        hint="At least 8 characters"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        type="submit"
      >
        Sign In
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',

  data: () => ({
    form: {
      email: "", //ameya@gmail.com
      password: "",
    },
    valid: true,
    showPassword: false,
  }),
   methods: {
    validate () {
      this.$refs.form.validate()
    },
    async submit () {
      await axios.get('csrf-cookie')
      var login = await axios.post('login', this.form)

      var user = await axios.get('user')
      console.log(user)
    }
  },
}
</script>

<style>

</style>