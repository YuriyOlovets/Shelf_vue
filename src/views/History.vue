<template>
  <div class="container-fluid">
    <main class="tm-main">
      <!-- Search form -->
      <div class="row tm-row">
        <div class="col-12" >
          <h2 class="main">имя</h2>
        </div>
      </div>
        <h3>Выбрать дату:</h3>
        <input v-model="day"  type="date" id="start" name="date" >
        <button @click="goDate(day,id)" type="submit" class="myButton">Смотреть</button>
      <br>
      <button @click="goDayList(id)" class="myButton">Просмотр по дням</button>
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
            <tr v-for="cell in History" :key="cell.id">
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
  name: "History",
  props: ['id'],
  data() {
    return {
      History: [],
      day:''
    }
  },

  methods: {
    async LoadHistory() {
      this.History = await axios({
        method: 'get',
        url: 'https://smart-shelf-bbc6g.ondigitalocean.app/api/v1/history/' + this.id + '/',
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => response.data);
    },
    goDate(day,cell){
      this.$router.push({name:'date', params:{day:day,cell:cell}})
    },
    goDayList(list){
      this.$router.push({name:'list', params:{list:list}})
    }
  },
  created() {
    this.LoadHistory()
  },
}
</script>

<style scoped>

</style>