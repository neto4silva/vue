<template>
  <div>
    <button @click="callback">{{ value }}</button>
  </div>
</template>

<script>
export default {
  name: 'ButtonView',
  props: {
    value: { type: String, require },
    callback: { type: Function, defaul: () => { } }
  }
}
</script>

<style scoped>
button {
  margin-top: 1em;
  width: 100%;
  font-size: 17px;
  padding: .3em 0;
  border: transparent;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  background: var(--secondaryColor);
  color: var(--quaternaryColor);
  border-radius: 4px;
}

button:hover {
  color: var(--quaternaryColor);
  background: var(--hover-botao-tabela-color)
}

button:active {
  transform: translate(0em, 0.2em);
}
</style>