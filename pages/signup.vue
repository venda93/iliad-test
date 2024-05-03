<template>
    <v-container fluid>
        <div class="text-center mb-2 mt-5">
            <h1 class="text-h4 pa-5">Registrati</h1>
            <p >o se hai già un account <NuxtLink class="text-red" to="/login">accedi</NuxtLink></p>
        </div>
        <v-form v-model="valid">
        <v-row>
                <v-col cols="12" sm="8" >

                <h2 class="text-center font-italic text-h5 pa-5">Dati anagrafici</h2>
                <v-row no-gutters>
                    <v-col cols="12" sm="6" class="pr-sm-6">
                        <v-text-field
                        clearable
                        label="Nome"
                        variant="solo"
                        v-model="signupForm.firstName"
                        :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                        clearable
                        label="Cognome"
                        variant="solo"
                        v-model="signupForm.lastName"
                        :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                        clearable
                        label="Data di nascita"
                        variant="solo"
                        v-model="signupForm.birthDate"
                        :rules="[rules.required, rules.date]"
                        ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="6">
                        <v-text-field
                        clearable
                        label="Città di nascita"
                        variant="solo"
                        v-model="signupForm.birthCity"
                        :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                        clearable
                        label="Codice fiscale"
                        variant="solo"
                        v-model="signupForm.fiscalCode"
                        :rules="[rules.required, rules.fiscalCode]"
                        ></v-text-field>
                        <v-radio-group inline label="Genere" v-model="signupForm.gender" :rules="[rules.required]">
                            <v-radio label="Maschio" value="male" :rules="[rules.required]"></v-radio>
                            <v-radio label="Femmina" value="female"></v-radio>
                            <v-radio label="Altro" value="other"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="4">
                <h2 class="text-center font-italic text-h5 pa-5">Dati di accesso</h2>
                <div class="mb-5">
                    <v-text-field
                    clearable
                    label="Nome Utente"
                    variant="solo"
                    v-model="signupForm.username"
                    :rules="[rules.required]"
                    ></v-text-field>
                    <v-text-field
ì                    label="Password"
                    variant="solo"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append-inner="showPassword = !showPassword"
                    v-model="signupForm.password"
                    :rules="[rules.required]"
                    ></v-text-field>
                    <v-text-field
                    label="Conferma password"
                    variant="solo"
                    :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    @click:append-inner="showConfirmPassword = !showConfirmPassword"
                    v-model="signupForm.passwordConfirmation"
                    :rules="[rules.required, rules.passwordMatch]"
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>
        <div class="d-flex justify-center">
            <v-btn :disabled="!valid" class="bg-red" @click="signup()">Registrati</v-btn>
        </div>
    </v-form>
    </v-container>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        prepend-icon="mdi-account-check"
        text="Esegui il login per accedere ai prodotti."
        title="Registrazione completata con successo!"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="navigateTo('/login'); dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import type { User } from '~/model/user';
    const dialog = ref(false);
    const rules = ref({
        required: (value: string) => !!value || 'Campo obbligatorio',
        passwordMatch: (value: string) => value === signupForm.value.password || 'Le password non corrispondono',
        date: (value: string) => {
            const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
            return pattern.test(value) || 'Inserire una data nel formato gg/mm//aaaa.'
          },
        fiscalCode: (value: string) => {
            const pattern = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
            return pattern.test(value) || 'Inserire un codice fiscale valido.'
          },

    })
    const valid = ref(false);
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const signupForm = ref<Partial<User> & { birthCity: string; fiscalCode: string; passwordConfirmation: string }>({
        firstName: '',
        lastName: '',
        birthDate: '',
        birthCity: '',
        fiscalCode: '',
        gender: '',
        username: '',
        password: '',
        passwordConfirmation: ''
    });
    const signup = async () => {
        try{
            await $fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupForm.value)
            });
            dialog.value = true;
        }catch(error){
            console.error(error);
        }
        
    }
</script>