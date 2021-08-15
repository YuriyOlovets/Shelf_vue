<template>
  <div class="container-fluid">
    <main v-if="Language" class="tm-main">
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

    <main v-else class="tm-main">
      <!-- Search form -->
      <h1>Enter product name</h1>
      <div class="login-form">

        <ejs-autocomplete  v-model = "product" :dataSource = "product_list" :fields = "fields" placeholder = 'Enter name'
        >

        </ejs-autocomplete>

        <br><br>
        <button @click="ChangeCells" type="submit" style="min-width: 220px" class="myButton">Change</button>

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
      i:'',
      product:'',
      product_list:[],
      en_product_list:[],
      fields:{value:'product_name'},
      problem:'ddd',
    }
  },
  computed: {
    Language(){
      if (localStorage.getItem('language')==='en')
        return false
      else
        return true
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
        url: this.$store.getters.getServerUrl +'/products/',
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => response.data);
    },
  },
  created() {
    this.LoadProducts()
    console.log(this.product_list)
  }


}
</script>

<style scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);
</style>