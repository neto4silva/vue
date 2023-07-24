<template>
  <div id="app">
    <Menu v-if="this.$router.currentRoute.name != 'Login'"></Menu>

    <router-view />
  </div>
</template>

<script>
import Menu from '@/components/menu/Menu.vue';
export default {
  components: {
    Menu
  }
}
</script>

<style>
:root {
  --primaryColor: #251749;
  --secondaryColor: #263159;
  --thirdColor: #495579;
  --quaternaryColor: #F0E9D2;
  --quintenaryColor: #beb9a8;
  --label-color: #263159;
  --menu-color: #263159;
  --menu-itens-color: #F0E9D2;
  --hover-botao-tabela-color: #495579;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  background-color: var(--quaternaryColor);
}

label {
  color: var(--quaternaryColor);
}

h1 {
  color: var(--secondaryColor);
}

.container {
  margin-top: 1em;
}

hr {
  border-color: var(--primaryColor);
}

textarea {
  resize: none;
}
</style>
