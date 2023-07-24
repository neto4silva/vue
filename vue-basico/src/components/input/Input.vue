<template>
    <div>
      <label for="">{{ label }}</label>
      <div class="input-wrapper">
        <input class="input-box" :type="type" :placeholder="placeHolder" v-model="valor">
        <span class="underline"></span>
      </div>
    </div>  
</template>

<script>
  export default {
    name: 'InputView',
    model: {
      prop: "value",
      event: "onChange"
    },
    props: {
      label: {type: String, require},
      placeHolder: {type: String},
      type: {type: String},
      value: {type: String},
    },
    data() {
      return {
        valor: this.value,
        emailValue:'',
        passwordValue:''
      }
    },
    watch: {
      valor(){
        this.$emit('onChange', this.valor)
      }
    }
  }

</script>

<style scoped>

label {
  display: flex;
  margin-left: 45px;
  color: var(--secondaryColor);
}

.input-wrapper {
  position: relative;
  width: 70%;
  margin: 10px auto 20px;
}

.input-box {
  font-size: 16px;
  padding: 10px 0;
  border: none;
  border-bottom: 2px solid #ccc;
  color: var(--secondaryColor);
  width: 100%;
  background-color: transparent;
  transition: border-color 0.3s ease-in-out;
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--secondaryColor);
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.input-box:focus {
  border-color: #08AEEA;
  outline: none;
}

.input-box:focus + .underline {
  transform: scaleX(1);
}


</style>