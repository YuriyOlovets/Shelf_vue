<template>
  <div class="container-fluid">
    <main v-if="Language" class="tm-main">
      <!-- Search form -->
      <div class="row tm-row">
        <div class="col-12" >
          <h2 class="main">{{name}}</h2>
        </div>
      </div>
        <h3>Виберіть дату:</h3>
        <input v-model="day"  type="date" id="start" name="date" >
        <button @click="goDate(day,id)" type="submit" class="myButton">Переглянути</button>
      <br>
      <button @click="goDayList(id,name)" class="myButton">Перегляд по днях</button>
      <br><br>

      <div  class="row tm-row">
        <article class="col-12 col-md-6 tm-post">
          <table>
            <thead >
            <tr>
              <th>Вага</th>
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

    <main v-else-if="!Language" class="tm-main">
      <!-- Search form -->
      <div class="row tm-row">
        <div class="col-12" >
          <h2 class="main">{{name}}</h2>
        </div>
      </div>
      <h3>Choose date:</h3>
      <input v-model="day"  type="date" id="start" name="date" >
      <button @click="goDate(day,id)" type="submit" class="myButton">View</button>
      <br>
      <button @click="goDayList(id,name)" class="myButton">View by day</button>
      <br><br>

      <div  class="row tm-row">
        <article class="col-12 col-md-6 tm-post">
          <table>
            <thead >
            <tr>
              <th>Weight</th>
              <th>Date</th>
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
  props: ['id','name'],
  data() {
    return {
      History: [],
      day:''
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
    async LoadHistory() {
      this.History = await axios({
        method: 'get',
        url: this.$store.getters.getServerUrl +'/history/' + this.id + '/',
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => response.data);
      console.log(this.History)
    },
    goDate(day,cell){
      this.$router.push({name:'date', params:{day:day,cell:cell}})
    },
    goDayList(list){
      this.$router.push({name:'list', params:{list:list,name:name}})
    }
  },
  created() {
    this.LoadHistory()
  },
}
</script>

<style scoped>

</style>