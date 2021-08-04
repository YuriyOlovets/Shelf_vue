<template>
  <table class="styled-table">
    <thead >
    <tr>
      <th style="max-width: 15px">id</th>
      <th></th>
      <th>Продукт</th>

      <th>Вес</th>
    </tr>
    </thead>
    <tbody v-for="cell in Cells" :key="cell.id">
    <tr class="active-row">
      <td>{{cell.cell_number}}</td>
      <td><img class="photo" :src="cell.cell_description.product_image" alt=""></td>
      <td>{{cell.cell_description.product_name}}<br><br><button style="position: relative;
    left: 50%;
    transform: translate(-50%, 0);" class="myButton" @click="goChange(cell.parent_shelf,cell.id)">Изменить</button></td>

      <td>{{cell.weight}}г<br><br><button style="position: relative;
    left: 50%;
    transform: translate(-50%, 0);" class="myButton" @click="goHistory(cell.id)">История</button> </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
export default {
  name: "Cells",
  data(){
    return{
      Cells:[],
      cell_id:false,
      a:'',
    }
  },
  methods: {
    goChange(ident, name) {
      this.$router.push({name: 'change', params: {ident: ident, name: name}})
    },
    goHistory(id) {
      this.$router.push({name: 'history', params: {id: id}})
    },
    async LoadCells() {
      this.Cells = await axios({
        method: 'get',
        url: this.$store.getters.getServerUrl +'/cells/',
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => response.data);
    },
  },

   created() {
    this.LoadCells()
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