<template>
    <header class="d-flex justify-space-between align-center w-100">
        <img class="py-5 mx-5" width="100" src="/public/img/iliad-test.png" alt="Benvenuto su Iliad test" />
        <div v-if="isAuthenticated" class="d-flex justify-end flex-column flex-sm-row">
            <div class="mb-2 mb-sm-0">
                <v-avatar :image="user.image"></v-avatar>
                <span class="pa-5">
                    {{ user.firstName + ' ' + user.lastName }}
                </span>
            </div>
            <v-btn @click="logout">Log out <v-icon icon="mdi-logout" end></v-icon></v-btn>
        </div>
    </header>
</template>
<script setup lang="ts">
import type { User } from '~/model/user';
    const user = useState<User>('user');
    const isAuthenticated = useState<boolean>('isAuthenticated');
    const logout = () => {
        isAuthenticated.value = false;
        useCookie('accessToken').value = null;
        return navigateTo('/login');
    }
</script>