<template>
  <main class="tm-main">
  <table class="styled-table">
    <thead >
    <tr>
      <th style="max-width: 15px">id</th>
      <th></th>
      <th>Продукт</th>

      <th>Вес</th>
    </tr>
    </thead>
    <tbody v-for="prod in Delivery.product" >
    <tr class="active-row">
      <td>{{prod}}</td>
      <td><img class="photo" :src="prod.product_image" alt=""></td>
      <td>1000г<br></td>
    </tr>
    </tbody>
  </table>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Delivery",
  data(){
    return{
      Delivery: [],

    }
  },
  methods:{
    async LoadDelivery(){
      this.Delivery = await axios({
        method: 'get',
        url: 'https://smart-shelf-fe863.ondigitalocean.app/api/v1/delivery/',
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => response.data);
      console.log(this.Delivery[0])
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