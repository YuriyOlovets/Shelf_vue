<template>
  <main class="tm-main">
  <table v-if="Language"  style="width: 350px" class="styled-table">
    <thead>
    <tr>
      <th></th>
      <th>Продукт</th>
      <th>Вага</th>
    </tr>
    </thead>
    <tbody v-for="prod in Delivery" :key="prod.id" >
    <tr class="active-row">
      <td><img class="photo" :src="prod.product[0].product_image"></td>
      <td>{{prod.product[0].product_name}}</td>
      <td>1000г<br></td>
    </tr>
    </tbody>
  </table>
    <table v-else  style="width: 350px" class="styled-table">
      <thead>
      <tr>
        <th></th>
        <th>Product</th>
        <th>Weight</th>
      </tr>
      </thead>
      <tbody v-for="prod in Delivery" :key="prod.id" >
      <tr class="active-row">
        <td><img class="photo" :src="prod.product[0].product_image"></td>
        <td>{{prod.product[0].product_name_en}}</td>
        <td>1000g<br></td>
      </tr>
      </tbody>
    </table>

    <button v-if="Language" style="width: 300px" class="myButton">Замовити</button>
    <button v-else style="width: 300px" class="myButton">To order</button>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Delivery",
  data(){
    return{
      Delivery: [],
      Delivery_list:[],
      i:'',

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
  methods:{
    async LoadDelivery(){
      this.Delivery = await axios({
        method: 'get',
        url: this.$store.getters.getServerUrl +'/delivery/',
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => response.data);

    },
  },
  created() {
    this.LoadDelivery()

  }
}
</script>

<style scoped>
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #008c8c;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #ffcc99;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
.styled-table tbody tr.active-row {
  font-weight: bold;
  color: black;
}

.photo{
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 100px; /* Радиус скругления */
  border: 1px solid black;
  width: 60px;
  height: 60px;
}

</style>
