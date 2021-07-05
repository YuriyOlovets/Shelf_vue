<template>
  <div class="container-fluid">
    <main class="tm-main">
      <!-- Search form -->
      <div class="row tm-row">
        <div class="col-12" >
          <h2 class="main">имя</h2>
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
            <tr v-for="cell in Day" :key="cell.id">
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
  name: "date",
  props: ['day','cell'],
  data(){
  return{
    Day:[]
  }
  },
  methods:{
    async LoadDay() {
       this.Day = await axios({
        method: 'post',
        url: 'https://smart-shelf-fe863.ondigitalocean.app/api/v1/date/' + this.cell + '/',
        data:{
          date:this.day
        }
      }).then(response => response.data);


    },
  },

  created() {
      this.LoadDay()
  }

}
</script>

<style scoped>

</style>