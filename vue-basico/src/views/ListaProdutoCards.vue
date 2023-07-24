<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h1>Cards de Produtos</h1>
        <hr>
      </div>
    </div>

    <div class="row mt-3 cards">
      <div v-for="produto in produtos" :key="produto.id">
        <Cards>
          <template v-slot:nome>
            {{ produto.nome }}
          </template>

          <template v-slot:valor>
            {{ produto.valor | real }}
          </template>

          <template v-slot:observacao>
            {{ produto.observacao || 'Produto sem informação para apresentar nesta tela!'}}
          </template>

          <template v-slot:acoes>
            <i @click="editarProduto(produto)" class="fa-solid fa-pen-to-square icones-tabela"></i>
            <i @click="excluirProduto(produto)" class="fa-solid fa-trash icones-tabela"></i>
          </template>
        </Cards>
      </div>
    </div>
  </div>
</template>

<script>
import Cards from '@/components/card/Cards.vue'
import ProdutoMixin from '@/mixins/produto-mixin';
export default {
  name: 'ListaProdutosCards',
  mixins: [ProdutoMixin],
  components: {
    Cards
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

.cards {
  display: flex;
  margin-left: 1em;
}
</style>