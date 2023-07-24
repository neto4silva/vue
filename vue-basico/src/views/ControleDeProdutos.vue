<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h2>Produtos</h2>
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="botoes">
        <div class="col-sm-2">
          <Button value="Adicionar" :callback="adicionarProduto" />
        </div>
        <div class="col-sm-3">
          <Button value="Ver em Cards" :callback="verProdutosEmCards" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <hr>
        <table class="table">
          <thead>
            <tr>
              <th @dblclick="obterTodosProdutos">Código</th>
              <th @dblclick="obterTodosProdutosPorNome">Nome</th>
              <th @dblclick="obterTodosProdutosPorValor">Valor</th>
              <th @dblclick="obterTodosProdutosPorQuantidade">Quantidade</th>
              <th @dblclick="obterTodosProdutosPorData">Dt. Cadastro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr @dblclick="editarProduto(item)" class="linha-tabela" v-for="item in produtos" :key="item.id">
              <td class="coluna-tabela">{{ item.id }}</td>
              <td class="coluna-tabela">{{ item.nome }}</td>
              <td class="coluna-tabela">{{ item.valor | real }}</td>
              <td class="coluna-tabela">{{ item.quantidadeEstoque }}</td>
              <td class="coluna-tabela">{{ item.dataCadastro | data }}</td>
              <td class="coluna-tabela">
                <i @click="editarProduto(item)" class="fa-solid fa-pen-to-square icones-tabela"></i>
                <i @click="excluirProduto(item)" class="fa-solid fa-trash icones-tabela"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import Button from '@/components/button/Button.vue';
import ProdutoMixin from '@/mixins/produto-mixin';

export default {
  name: 'ControleDeProdutos',
  mixins: [ProdutoMixin],
  components: {
    Button
  },
  methods: {
    verProdutosEmCards() {
      this.$router.push({ path: '/controle-de-produtos/lista-cards' });
    },
    adicionarProduto() {
      this.$router.push({ name: 'NovoProduto' });
    }    
  },
};
</script>

<style scoped>
h2 {
  color: var(--primaryColor);
}

th {
  background-color: var(--secondaryColor);
  color: var(--quaternaryColor);
  cursor: pointer;
  font-size: 18px;
}

tr {
  cursor: pointer;
}

th:hover {
  background-color: var(--hover-botao-tabela-color);
  color: var(--quaternaryColor);
  cursor: pointer;
  border: none;
}

.icones-tabela {
  margin-right: 30px;
  cursor: pointer;
  color: var(--primaryColor)
}

td {
  color: var(--thirdColor);
}

.table {
  margin-top: 2em;
}

.linha-tabela:hover {
  background-color: var(--quintenaryColor);
}


.botoes {
  display: flex;
  justify-content: space-between;
}
</style>