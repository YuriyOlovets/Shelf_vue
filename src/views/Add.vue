<template>
  <div class="container-fluid">
    <main class="tm-main">
      <!-- Search form -->
      <h1>Введите даные полки пожалуйста</h1>
      <div class="login-form">
          <h2>Номер идентификации:</h2>
          <input v-model="add" type="number"  name="ident" />
          <br><br>
          <button @click="AddShelf" type="submit" class="myButton">Добавить</button>

      </div>
    </main>
  </div>




</template>

<script>
import axios from "axios";

export default {
  name: "Add",
  data() {
    return {
      add: '',
      info:'',
    }
  },
  methods: {
    async AddShelf() {
       await axios({
        method: 'post',
        url: 'https://smart-shelf-bbc6g.ondigitalocean.app/api/v1/add/',
        data:{
          ident: this.add
        },
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => (this.info = response))
           .catch(error => {
             console.log(error)})

     if(this.info.status === 200){
       this.$router.push({name: "Home"})
     }
     else {
       alert("Вы ввели неправильный id полки,попробуйте еще")
     }

    },

  }
}
</script>

<style scoped>

</style>