<template>
  <div class="container-fluid">
    <main class="tm-main">
      <!-- Search form -->
      <div class="row tm-row">
        <div class="col-12" >
          <h2 class="main"></h2>
        </div>
      </div>
      <br>
      <a href='#'><button class="myButton">Просмотр по дням</button></a>
      <br><br>

      <div  class="row tm-row">
        <article class="col-12 col-md-6 tm-post">
          <table>
            <thead >
            <tr>
              <th>Вес</th>
              <th>Дата</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="cell in List" :key="cell.id">
              <td>{{cell.weight}}</td>
              <td>{{cell.update_time}}</td>
            </tr>

            </tbody>
          </table>
        </article>

      </div>

    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "list",
  props: ['list'],
  data(){
    return{
      List:[]
    }
  },
  methods:{
    async LoadHistoryList() {
      this.List = await axios({
        method: 'get',
        url: 'https://smart-shelf-fe863.ondigitalocean.app/api/v1/day_list/' + this.list + '/',
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => response.data);
    },
  },
  created() {
    this.LoadHistoryList()
  }
}
</script>

<style scoped>

</style>