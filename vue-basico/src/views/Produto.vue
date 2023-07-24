<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>{{ modoCadastro ? 'Adicionar' : 'Editar' }} Produto</h1>
        <hr />
      </div>

      <div class="row">
        <div class="col-sm-2">
          <div class="form-group">
            <label for="id">Código</label>
            <input type="text" id="id" v-model="produto.id" disabled class="form-control">
          </div>
        </div>

        <div class="col-sm-10">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" v-model="produto.nome" class="form-control">
          </div>
        </div>

        <div class="col-sm-4">
          <div class="form-group">
            <label for="quantidade">Quantidade</label>
            <input type="text" id="quantidade" v-model="produto.quantidadeEstoque" class="form-control">
          </div>
        </div>

        <div class="col-sm-4">
          <div class="form-group">
            <label for="valor">Valor</label>
            <input type="text" id="valor" v-model="produto.valor" class="form-control">
          </div>
        </div>

        <div class="col-sm-4">
          <div class="form-group">
            <label for="data-cadastro">Data de Cadastro</label>
            <input type="date" id="data-cadastro" v-model="produto.dataCadastro" class="form-control">
          </div>
        </div>

        <div class="col-sm-12">
          <div class="form-group">
            <label for="observacao">Observação</label>
            <textarea id="observacao" class="form-control" v-model="produto.observacao" rows="4"></textarea>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <hr>
        </div>

        <div class="row">
          <div class="col-sm-12 botoes">
            <div class="col-sm-2">
              <Button value="Salvar" :callback="salvarProduto"></Button>
            </div>
            <div class="col-sm-2">
              <Button value="Cancelar" :callback="cancelarAcao"></Button>
            </div>

            <div class="customCheckBoxHolder">
              <div v-show="modoCadastro" class="check-continuar">
                <input v-model="continuarAdicionando" type="checkbox" id="cCB1" class="customCheckBoxInput">
                <label for="cCB1" class="customCheckBoxWrapper">
                  <div class="customCheckBox">
                    <div class="inner">Continuar Adicionando</div>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/button/Button.vue';
import Produto from '@/models/produto-model';
import produtoService from '@/services/produto-service';
import conversorData from '@/utils/conversor-data';

export default {
  name: 'ProdutoView',
  components: {
    Button
  },
  data() {
    return {
      produto: new Produto(),
      modoCadastro: true,
      continuarAdicionando: false,
    }
  },
  mounted() {
    let id = (this.$route.params.id);
    if (!id) return
    this.modoCadastro = false;

    this.obterProdutoPorId(id);
  },
  methods: {
    obterProdutoPorId(id) {
      produtoService.obterPorId(id)
        .then(response => {
          this.produto = new Produto(response.data);
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: 'Não foi possível obter o produto pelo ID ' + id,
            confirmButtonColor: '#263159',
          })
        })
    },

    cancelarAcao() {
      this.produto = new Produto();
      this.$router.push({ path: '/controle-de-produtos' });
    },

    cadastrarProduto() {
      if (!this.produto.modeloValidoParaCadastro()) {
        this.$swal({
          icon: 'warning',
          title: 'O Nome do produto é obrigatório para o cadastro!',
          confirmButtonColor: '#263159',
        })
        return;
      }

      this.produto.dataCadastro = conversorData.aplicarMascaraISOEmFormatoAmericano(this.produto.dataCadastro);
      produtoService.cadastrar(this.produto)
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'Produto Cadastrado com Sucesso!',
            confirmButtonColor: '#263159',
          })
          this.produto = new Produto();

          if (!this.continuarAdicionando) {
            this.$router.push({ path: '/controle-de-produtos' });
          }
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: 'Não foi possível cadastrar o produto',
            confirmButtonColor: '#263159',
          })
        })
    },

    atualizarProduto() {
      if (!this.produto.modeloValidoParaAtualizar()) {
        this.$swal({
          icon: 'warning',
          title: 'O Código e nome do produto são obrigatórios para o cadastro!',
          confirmButtonColor: '#263159',
        })
        return;
      }

      this.produto.dataCadastro = conversorData.aplicarMascaraISOEmFormatoAmericano(this.produto.dataCadastro);

      produtoService.atualizar(this.produto)
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'Produto Atualizado com Sucesso!',
            confirmButtonColor: '#263159',
          })
          this.$router.push({ path: '/controle-de-produtos' });
        })
        .catch(error => {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: 'Não foi possível atualizar o produto',
            confirmButtonColor: '#263159',
          })
        })
    },

    salvarProduto() {
      (this.modoCadastro) ? this.cadastrarProduto() : this.atualizarProduto();
    },
  }
}
</script>

<style scoped>
.botoes {
  display: flex;
  align-items: flex-end;
  flex-direction: row-reverse;
  align-items: baseline;
}

.customCheckBoxHolder {
  margin: 5px;
  display: flex;
}

.customCheckBox {
  width: fit-content;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  padding: 2px 8px;
  background-color: rgba(0, 0, 0, 0.16);
  border-radius: 0px;
  color: var(--quaternaryColor);
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 300ms;
  transition-property: color, background-color, box-shadow;
  display: flex;
  height: 35px;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px 1px 1px 0px;
  outline: none;
  justify-content: center;
  min-width: 55px;
}

.customCheckBox:hover {
  background-color: var(--secondaryColor);
  color: var(--quaternaryColor);
  box-shadow: rgba(0, 0, 0, 0.23) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, var(--secondaryColor) 0px 2px 4px 1px;
}

.customCheckBox .inner {
  font-size: 18px;
  font-weight: 900;
  pointer-events: none;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 300ms;
  transition-property: transform;
  transform: translateY(0px);
}

.customCheckBox:hover .inner {
  transform: translateY(-2px);
}

/* Multiple Checkboxes can be chained together for a radio input */
.customCheckBoxWrapper:first-of-type .customCheckBox {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-right: 0px;
}

.customCheckBoxWrapper:last-of-type .customCheckBox {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  border-left: 0px;
}

.customCheckBoxInput {
  display: none;
}

.customCheckBoxInput:checked+.customCheckBoxWrapper .customCheckBox {
  background-color: var(--secondaryColor);
  color: var(--quaternaryColor);
  box-shadow: var(--secondaryColor) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, var(--secondaryColor) 0px 2px 4px 1px;
}

.customCheckBoxInput:checked+.customCheckBoxWrapper .customCheckBox .inner {
  transform: translateY(-2px);
}

.customCheckBoxInput:checked+.customCheckBoxWrapper .customCheckBox:hover {
  background-color: var(--secondaryColor);
  box-shadow: var(--secondaryColor) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, var(--secondaryColor) 0px 3px 6px 2px;
}

.customCheckBoxWrapper .customCheckBox:hover .inner {
  transform: translateY(-2px);
}

label {
  color: var(--secondaryColor);
}

input[type="text"] {
  color: var(--label-color);
}

input[type="text"]:focus {
  box-shadow: 0px 0px 5px 0px var(--secondaryColor);
  border: none;
}
</style>