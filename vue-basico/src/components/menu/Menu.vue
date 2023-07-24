<template>
  <ul>
    <li>
      <a @click="() => this.$router.push({ path: '/' })">Dashboard</a>
    </li>
    <li>
      <a @click="() => this.$router.push({ path: '/controle-de-produtos' })">Produtos</a>
    </li>
    <li>
      <a @click="() => this.$router.push({ path: '/controle-de-clientes' })">Clientes</a>
    </li>
    <li>
      <label class="checkbox-label">
        <input v-model="modoDark" type="checkbox" @change="toggleDarkMode" name="modoDark" id="modoDark">
        Modo Dark
      </label>
    </li>
    <li>
      <a @click="logout">Sair</a>
    </li>
  </ul>
</template>

<script>
import usuarioService from '@/services/usuario-service';
import utilsStorage from '@/utils/storage';
export default {
  name: 'MenuView',
  data() {
    return {
      modoDark: false,
    }
  },
  methods: {
    toggleDarkMode() {
      const root = document.documentElement;
      if (this.modoDark) {
        // Aplicar cores do modo escuro
        root.style.setProperty('--primaryColor', '#F0E9D2');
        root.style.setProperty('--secondaryColor', '#F0E9D2');
        root.style.setProperty('--thirdColor', '#F0E9D2');
        root.style.setProperty('--quaternaryColor', '#263159');
        root.style.setProperty('--quintenaryColor', '#7c8cbd');
        root.style.setProperty('--menu-color', '#121d47');
        root.style.setProperty('--menu-itens-color', '#F0E9D2');
        root.style.setProperty('--hover-botao-tabela-color', '#beb9a8');
      } else {
        // Voltar para as cores do modo claro
        root.style.setProperty('--primaryColor', '#251749');
        root.style.setProperty('--secondaryColor', '#263159');
        root.style.setProperty('--thirdColor', '#495579');
        root.style.setProperty('--quaternaryColor', '#F0E9D2');
        root.style.setProperty('--quintenaryColor', '#beb9a8');
        root.style.setProperty('--menu-color', '#263159');
        root.style.setProperty('--menu-itens-color', '#F0E9D2');
        root.style.setProperty('--hover-botao-tabela-color', '#495579');
      }
    },
    logout() {
      usuarioService.logout()
        .then(() => {
          utilsStorage.removerTokenNaStorage();
          utilsStorage.removerUsuarioNaStorage();

          this.$router.push({ path: '/login' })
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: 'Não foi possível sair do sistema',
            confirmButtonColor: '#263159',
          })
        })
    }
  }
}
</script>

<style scoped>
ul {
  align-items: center;
  /* Alinhar verticalmente os elementos */
  list-style-type: none;
  /* Remove bullets */
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: var(--menu-color);
}

li {
  float: left;
}

li:first-child {
  margin-left: 20px;
}

li:last-child {
  float: right;
  margin-right: 20px;
}

li a {
  text-decoration: none;
  color: var(--menu-itens-color);
  display: block;
  padding: 1em;
  text-align: center;
}

li a:hover {
  background-color: var(--quaternaryColor);
  color: var(--primaryColor);
  cursor: pointer;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--menu-itens-color);
}
</style>