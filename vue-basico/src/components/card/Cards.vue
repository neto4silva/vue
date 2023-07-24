<template>
  <div>
    <div class="card">
      <div class="header">
        <img src="https://revistacarro.com.br/wp-content/uploads/2022/05/Ferrari-SP48-Unica_3.jpg" alt="">
      </div>
      <div class="info">
        <h1>
          <slot name="nome"></slot>
        </h1>
        <h3>
          <slot name="valor"></slot>
        </h3>
        <p>
          <slot name="observacao"></slot>
        </p>
      </div>
      <div class="botoes">
        <slot name="acoes"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CardView',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
h1 {
  margin-top: -10px;
  color: var(--primaryColor);
  margin-bottom: -10px;
}

h3 {
  color: var(--primaryColor);
}

p {
  color: var(--primaryColor);
}

i {
  color: var(--primaryColor);
}

.card {
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  border: 2px solid var(--primaryColor);
  background-color: var(--quaternaryColor);
  width: 255px;
  height: 400px;
  margin-right: 2em;
}

.card:hover {
  background-color: var(--quintenaryColor);
  box-shadow: 0px 0px 10px 0px var(--secondaryColor);
}

i {
  cursor: pointer;
}

i:hover {
  color: var(--quaternaryColor);
}

img {
  width: 100%;
  border: 1px solid var(--primaryColor);
}

.info {
  border: none;
  padding: 1.5rem;
  text-align: center;
}

.botoes {
  margin-top: auto;
  display: flex;
  justify-content: space-evenly;
  padding: 1em;
  background-color: rgba(0, 140, 255, 0.082);
}

.card:hover {
  background-color: var(--quintenaryColor);
  box-shadow: 0px 0px 10px 0px var(--secondaryColor);
}

i {
  cursor: pointer;
}

i:hover {
  color: var(--quaternaryColor);
}

.header {
  position: relative;
  background-clip: border-box;
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.75rem;
  height: 14rem;
}

img {
  width: 100%;
  border: 1px solid var(--primaryColor);
}

.info {
  border: none;
  padding: 1.5rem;
  text-align: center;
}

.botoes {
  display: flex;
  justify-content: space-evenly;
  padding: 1em;
  background-color: rgba(0, 140, 255, 0.082);
}</style>