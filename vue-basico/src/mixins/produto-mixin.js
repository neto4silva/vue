import produtoService from '@/services/produto-service';
import Produto from '@/models/produto-model';
import conversorData from '@/utils/conversor-data';
import conversorValor from '@/utils/conversor-monetario';

let ProdutoMixin = {
  filters: {
    data(data) {
      return conversorData.aplicarMascaraEmDataIso(data);
    },
    real(valor) {
      return conversorValor.aplicarMascaraParaRealcomPrefixo(valor);
    }
  },
  data() {
    return {
      produtos: []
    }
  },
  mounted() {
    this.obterTodosProdutos();
  },
  methods: {
    editarProduto(produto) {
      this.$router.push({ name: 'EditarProduto', params: { id: produto.id } });
    },

    excluirProduto(produto) {
      this.$swal({
        title: `Tem certeza que quer deletar o Produto ${produto.id} - ${produto.nome}`,
        text: "Você não poderá reverter isso!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não, cancelar!',
        confirmButtonColor: '#263159',
        reverseButtons: true
      })
        .then((result) => {
          if (result.isConfirmed) {
            produtoService.deletar(produto.id)
              .then(() => {
                let indice = this.produtos.findIndex(p => p.id == produto.id);
                this.produtos.splice(indice, 1);
                setTimeout(() => {
                  this.$swal({
                    icon: 'success',
                    title: 'Produto excluído com Sucesso!',
                    confirmButtonColor: '#263159',
                  })
                }, 100);
              })
              .catch(error => {
                console.log(error)
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível excluir o produto',
                  confirmButtonColor: '#263159',
                })
              })
          }
        })
    },
    ordenarProdutosPorData(data1, data2) {
      return (data1.dataCadastro < data2.dataCadastro) ? -1 : (data1.dataCadastro > data2.dataCadastro) ? 1 : 0;
    },
    obterTodosProdutosPorData() {
      produtoService.obterTodos()
        .then(response => {
          let produtos = response.data.map(p => new Produto(p));
          this.produtos = produtos.sort(this.ordenarProdutosPorData).reverse();
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: 'Não foi possível obter o produto por Data',
            confirmButtonColor: '#263159',
          })
        })
    },
    ordenarProdutosPorValor(valor1, valor2) {
      return (valor1.valor < valor2.valor) ? -1 : (valor1.valor > valor2.valor) ? 1 : 0;
    },
    obterTodosProdutosPorValor() {
      produtoService.obterTodos()
        .then(response => {
          let produtos = response.data.map(p => new Produto(p));
          this.produtos = produtos.sort(this.ordenarProdutosPorValor).reverse();
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: 'Não foi possível obter o produto por Valor',
            confirmButtonColor: '#263159',
          })
        })
    },
    ordenarProdutosPorQuantidade(quantidade1, quantidade2) {
      return (quantidade1.quantidadeEstoque < quantidade2.quantidadeEstoque) ? -1 : (quantidade1.quantidadeEstoque > quantidade2.quantidadeEstoque) ? 1 : 0;
    },
    obterTodosProdutosPorQuantidade() {
      produtoService.obterTodos()
        .then(response => {
          let produtos = response.data.map(p => new Produto(p));
          this.produtos = produtos.sort(this.ordenarProdutosPorQuantidade).reverse();
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: 'Não foi possível obter o produto por Quantidade',
            confirmButtonColor: '#263159',
          })
        })
    },
    ordenarProdutosPorNome(nome1, nome2) {
      return (nome1.nome < nome2.nome) ? -1 : (nome1.nome > nome2.nome) ? 1 : 0;
    },
    obterTodosProdutosPorNome() {
      produtoService.obterTodos()
        .then(response => {
          let produtos = response.data.map(p => new Produto(p));
          this.produtos = produtos.sort(this.ordenarProdutosPorNome);
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: 'Não foi possível obter o produto por Nome',
            confirmButtonColor: '#263159',
          })
        })
    },

    obterTodosProdutos() {
      produtoService.obterTodos()
        .then(response => {
          let produtos = response.data.map(p => new Produto(p));

          this.produtos = produtos.reverse();
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: 'Não foi possível obter todos os produtos',
            confirmButtonColor: '#263159',
          })
        })
    }
  }
}

export default ProdutoMixin;