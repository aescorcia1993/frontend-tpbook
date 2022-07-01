<template>

  <div
    class="row login centered-h"
  >
    <div class="modals-header">
      <h2 class="centered-v text-color">TPbook</h2>
    </div>
    <div class="col q-pa-md justify-center">

      <div class="row justify-center">
        <label class="text-h4">Sign in</label>
      </div>

      <div class="q-pa-sm">
        <q-input
          v-model="user"
          color="black"
          debounce="500"
          label="User"
        />

        <q-input
          v-model="password"
          color="black"
          debounce="500"
          label="Password"
          type="password"
        />

        <q-input
          v-model="confirmPassword"
          color="black"
          debounce="500"
          label="Confirm Password"
          type="password"
        />

        <q-input
          v-model="email"
          color="black"
          debounce="500"
          label="Email"
        />

        <q-input
          v-model="phone"
          color="black"
          debounce="500"
          label="Phone"
        />
        <q-input
          v-model="address"
          color="black"
          debounce="500"
          label="Address"
        />

      </div>

      <div class="row justify-center q-ma-md">
        <q-btn
          icon="mail"
          label="Log in"
          @click="login()"
        >
        </q-btn>
      </div>

      <div class="mb-4">
        <a class="text-color" href="/resetpass">Forgot password?</a>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import { computed, defineComponent, ref } from "vue";
import fetch from "../helpers/fetch";
import useVuelidate from "@vuelidate/core";
import { required, sameAs, email as vemail } from "@vuelidate/validators";

export default defineComponent({
  name: "LoginRegistration",
  components: {},
  props: {},
  setup(props, context) {

    let user = ref<string>("");
    let password = ref<string>("");
    let confirmPassword = ref<string>("");
    let phone = ref<string>("");
    let address = ref<string>("");
    let email = ref<string>("");

    let rules = computed(() => {
      return {
        user: { required },
        password: { required },
        confirmPassword: { required },
        phone: {required},
        address:{required},
        email:{required, vemail}
      };
    });
    const $v = useVuelidate(rules, { user, password, confirmPassword, phone, address, email  });

   async function login() {
     await $v.value.$validate().then(isValid => {
        if (isValid) {
          let payload = {
            "user": user.value,
            "password": password.value,
            "email": email.value,
            "phone": phone.value,
            "address" : address.value
          };

          fetch.post("user/register", payload).then(res => {
              console.log("Usuario creado",res)
          });

       } else {
         console.log("NO VALIDO");
         return;
       }
      });
    }

//computed
//methods
//event called from children
//watchers
//event exposed
    context.expose({});

    return {
//variables
      user, password, confirmPassword, phone, address, email, $v,
//ref
//computed
//methods
      login
//event called from children
//watchers
//event exposed

    };
  }
});
</script>

<style lang="scss" scoped>
.login {
  width: clamp(321px, 20vw, 400px);
  border: 0.3px black solid;
  margin-top: 10vh !important;
}

.body {
  overflow: hidden;
}
</style>