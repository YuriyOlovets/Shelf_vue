<template>
  <div class="container-fluid">
    <main class="tm-main">
      <!-- Search form -->
      <h1>Введите название продукта</h1>
      <div class="login-form">

          <ejs-autocomplete  v-model = "product" :dataSource = "product_list" :fields = "fields" placeholder = 'Введите название'
          >

          </ejs-autocomplete>

          <br><br>
          <button @click="ChangeCells" type="submit" style="min-width: 220px" class="myButton">Изменить</button>

      </div>


    </main>
  </div>
</template>

<script>
import Vue from "vue";
import {AutoCompletePlugin} from "@syncfusion/ej2-vue-dropdowns";
Vue.use(AutoCompletePlugin);
import axios from "axios";

export default {
  name: "Change_name",
  props:['ident','name'],
  data(){
    return{
      product:'',
      product_list:[],
      fields:{value:'product_name'},
      problem:'ddd',
    }
  },
  methods: {
    async ChangeCells() {
      this.problem = 'ddd'
      await axios({
        method: 'post',
        url: this.$store.getters.getServerUrl +'/redact/'+ this.ident+'/'+this.name+'/',
        data:{
          name: this.product
        },
      }).catch(error => {this.problem = 1})
      console.log(this.problem)
      if (this.problem === 1){
        alert('Сделайте выбор из выпадающего списка пожалуйста.')
      }else {
        this.$router.push({name: "Home"})
      }


    },
    async LoadProducts(){
      this.product_list = await axios({
        method: 'get',
        url: 'https://smart-shelf-bbc6g.ondigitalocean.app/api/v1/products/',
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => response.data);

    },
  },
  created() {
    this.LoadProducts()
  }


}
</script>

<style scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);
</style>