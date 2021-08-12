<template>

      <main class="tm-main " >
        <!-- Search form -->
        <div class="row tm-row">
           <div v-if="TrueShelf & Language" class="col-12" >
              <h2 class="main">Мої продукти:</h2>
           </div>
          <div v-if="TrueShelf & !Language" class="col-12" >
            <h2 class="main">My Product:</h2>
          </div>
            <Cells v-if="TrueShelf"> </Cells>

            <a href="#" v-if="!TrueShelf & Language"> <button @click="goAdd" class="myButton">Добавить новую полку</button></a>
            <a href="#" v-if="!TrueShelf &!Language"> <button @click="goAdd" class="myButton">Add new shelf</button></a>

                  </div>
                  <div v-if="Language" class="col-4 row tm-row" >
                    <article class="col-12   tm-post">
                      <div>
                      <table class="styled-table"  v-for="shelf in Shelf" :key="shelf.id">

                        <thead>
                        <tr class="active-row">
                          <th>ID </th>
                          <th>Останнє з'єднання</th>
                          <th>Відв'язати</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td><a>{{shelf.ident}}</a></td>
                          <td>{{formatDate(shelf.last_connect)}}</td>
                          <td ><a href="#" style="color:red"><button @click="Delete(shelf.ident)" class="myButton">Відв'язати поличку</button></a></td>


                        </tr>

                        </tbody>
                      </table>
                      </div>
                    </article>
        </div>











        <div v-if="!Language" class="col-4 row tm-row" >
          <article class="col-12   tm-post">
            <div>
              <table class="styled-table"  v-for="shelf in Shelf" :key="shelf.id">

                <thead>
                <tr class="active-row">
                  <th>ID </th>
                  <th>Last connect</th>
                  <th>Disconnect</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                  <td><a>{{shelf.ident}}</a></td>
                  <td>{{formatDate(shelf.last_connect)}}</td>
                  <td ><a href="#" style="color:red"><button @click="Delete(shelf.ident)" class="myButton">Disconnect</button></a></td>


                </tr>

                </tbody>
              </table>
            </div>
          </article>
        </div>

      </main>


</template>

<script>
import Cells from "../components/Cells";
import axios from 'axios'

export default {
  name: 'Home',
  components: {Cells},
  data(){
    return{
      Shelf : [],
      Cells:[],
      cell_id:null,
    }
  },

  computed: {
    TrueShelf() {
      if (this.Shelf.length > 0) {
        return true
      }
      else{
        return false
      }
    },
    Language(){
      if (localStorage.getItem('language')==='en')
        return false
      else
        return true
    }

  },

  methods : {
    async loadShelf()
    {
    this.Shelf = await
        axios({
        method: 'get',
        url: this.$store.getters.getServerUrl +'/shelf/',
        headers: {
          Authorization: 'Token '+ localStorage.getItem("auth_token")
        }
      })
          .then(response => response.data );
    },
    goAdd() {
      this.$router.push({name: "add"})
    },

    async Delete(ident)
    {
      await axios({
            method: 'get',
            url: this.$store.getters.getServerUrl + '/delete/'+ ident +'/',
          });
      location.reload()
    },
    formatDate(str) {
      return str ? new Date(str).toLocaleString() : ""
    },
    login_check() {
      if (localStorage.getItem("auth_token")) {
        console.log(localStorage.getItem("auth_token"))
      }
      else {
        this.$router.push({name: "login"})
      }
    },

  },
  created() {
    this.login_check()
    this.loadShelf()
    console.log(localStorage)

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
  color: #ffcc99;
}

</style>