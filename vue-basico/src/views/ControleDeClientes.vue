<template>

  <div>
    <h1>{{ mensagem }}</h1>
  </div>
  
</template>


<script>
  export default {
    name: 'ControleDeClientes',
    data() {
      return {
        mensagem: 'Estou na tela de Controle de Clientes'
      }
    }
  }
</script>

<style scoped>
  h1 {
    color:  aqua;
  }


</style>