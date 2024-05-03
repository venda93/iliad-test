<template>
  <v-app>
    <v-container>
      <AppHeader />
      <v-overlay
      :model-value="loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="red"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
      <NuxtPage/>
    </v-container>
  </v-app>
</template>
<script setup lang="ts">
  const loading = useState<boolean>('loading', () => false);
  console.log('Ciao! 🙋🏻‍♂️ \nBenvenuto su Iliad test! 🚀\nLa mia prima applicazione sviluppata con Vue!🤞🏻\n\nSe hai domande, non esitare a contattarmi. 📧\nHappy coding! 🎉\n\n👨🏻‍💻 - Nicolò\n\n');

</script>