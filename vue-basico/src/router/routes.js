import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import ControleDeProdutos from "@/views/ControleDeProdutos.vue";
import ControleDeClientes from "@/views/ControleDeClientes.vue";
import ListaProdutoCards from "@/views/ListaProdutoCards.vue";
import Produto from "@/views/Produto";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    title: "Login",
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    title: "Dashboard",
    meta: { requiresAuth: true },
  },
  {
    path: "/controle-de-produtos",
    name: "ControleDeProdutos",
    component: ControleDeProdutos,
    title: "Produtos",
    meta: { requiresAuth: true },
  },
  {
    path: "/controle-de-clientes",
    name: "ControleDeClientes",
    component: ControleDeClientes,
    title: "Clientes",
    meta: { requiresAuth: true },
  },
  {
    path: "/controle-de-produtos/novo",
    name: "NovoProduto",
    component: Produto,
    title: "Adicionar Produto",
    meta: { requiresAuth: true },
  },
  {
    path: "/controle-de-produtos/editar",
    name: "EditarProduto",
    component: Produto,
    title: "Editar Produto",
    meta: { requiresAuth: true },
  },
  {
    path: "/controle-de-produtos/lista-cards",
    name: "ListaProdutoCards",
    component: ListaProdutoCards,
    title: "Lista de produtos em Cards",
    meta: { requiresAuth: true },
  },
];

export default routes;
