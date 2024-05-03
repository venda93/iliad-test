<template>
    <v-container fluid>
        <v-row class="justify-center">
            <v-col cols="12" sm="6">
                <v-alert text="Le credenziali inserite non sono corrette." type="error" v-model="alert"></v-alert>
                <h1 class="text-center font-italic text-h4 pa-5 mb-2 mt-5">Accedi per vedere i tuoi prodotti</h1>
                <form class="mb-5">
                    <v-text-field
                    clearable
                    label="Nome Utente"
                    variant="solo"
                    v-model="loginForm.username"
                    :disabled="loading"
                    ></v-text-field>
                    <v-text-field
                    label="Password"
                    variant="solo"
                    v-model="loginForm.password"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append-inner="showPassword = !showPassword"
                    :disabled="loading"
                    ></v-text-field>
                    <v-btn class="bg-red w-100" @click="login()" :disabled="loading">Accedi</v-btn>
                </form>
                <div class="text-center pa-5">
                    <p>Non hai un account?</p>
                    <NuxtLink class="text-red" to="/signup">Registrati</NuxtLink>
                </div>
            </v-col>
        </v-row>

    </v-container>
</template>
<script setup lang="ts">
    const alert = ref(false);
    const loginForm = ref({
        username: 'kminchelle',
        password: '0lelplR'
    })
    const showPassword = ref(false);
    const loading = useState<boolean>('loading');

    const login = async () => {
        loading.value = true;
        alert.value = false;
        try{
            const data = await $fetch<any>('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: loginForm.value.username,
                    password: loginForm.value.password
                })
            });               
            if(data) {
                const accessToken = useCookie('accessToken');
                accessToken.value = data.token;
            }
        } catch (error) {     
            alert.value = true;
        }
        loading.value = false;
        return navigateTo('/');
    }
</script>