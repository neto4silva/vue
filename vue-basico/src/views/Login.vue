<template>
  <div class="box-login">

    <div class="logo">
      <h1>Login</h1>
    </div>

    <Input label="Email" placeHolder="Digite seu e-mail" type="text" v-model="usuario.email"></Input>

    <Input label="Senha" placeHolder="Digite sua senha" type="password" v-model="usuario.senha"></Input>

    <Button value="Entrar" :callback="login"></Button>
  </div>
</template>

<script>
import Input from '@/components/input/Input.vue';
import Button from '@/components/button/Button.vue'
import Usuario from '@/models/usuario-model';
import usuarioService from '@/services/usuario-service';
import utilsStore from '@/utils/storage';

export default {
  name: 'LoginView',
  components: {
    Input,
    Button
  },
  data() {
    return {
      usuario: new Usuario(),
    }
  },
  methods: {
    login() {

      if (!this.usuario.modeloValidoLogin()) {
        this.$swal({
          icon: 'warning',
          title: 'Preencha as informações de login!!',
          confirmButtonColor: '#263159',
        })
        return;
      }

      usuarioService.login(this.usuario.email, this.usuario.senha)
        .then(response => {
          this.usuario = new Usuario(response.data.usuario);
          utilsStore.salvarUsuarioNaStorage(this.usuario);
          utilsStore.salvarTokenNaStorage(response.data.token);

          this.$router.push({ path: '/controle-de-produtos' });
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: 'Não foi possível acessar o sistema!',
            confirmButtonColor: '#263159',
          })
        })
      
    },
  }
};
</script>

<style scoped>
.box-login {
  text-align: center;
  width: 350px;
  margin: auto;
  border: 0px solid var(--thirdColor);
  margin-top: 200px;
  box-shadow: 0px 0px 31px 0px var(--secondaryColor);
  border-radius: 20px;
  padding: 1.5em;
}

.logo {
  text-align: center;
  color: var(--primaryColor);
}

h1 {
  font-size: 36px;
}
</style>