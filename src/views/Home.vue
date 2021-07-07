<template>

      <main class="tm-main">
        <!-- Search form -->
        <div class="row tm-row">
          <div v-if="TrueShelf" class="col-12" >
            <h2 class="main">Моя полка:</h2>
          </div>
        </div>
        <div class="col-4 row tm-row" >
          <article class="col-12   tm-post">
            <div>
            <table class="styled-table"  v-for="shelf in Shelf" :key="shelf.id">

              <thead>
              <tr class="active-row">
                <th>ID полки</th>
                <th>Последнее соединение</th>
                <th>Отвязать</th>

              </tr>
              </thead>
              <tbody>
              <tr>
                <td><a>{{shelf.ident}}</a></td>
                <td>{{formatDate(shelf.last_connect)}}</td>
                <td ><a href="#" style="color:red"><button @click="Delete(shelf.ident)" class="myButton">Отвязать полку</button></a></td>


              </tr>

              </tbody>
            </table>
            </div>
            <Cells v-if="TrueShelf"> </Cells>

            <a href="#" v-if="!TrueShelf"> <button @click="goAdd" class="myButton">Добавить новую полку</button></a>

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
      check_login:localStorage.getItem("auth_token"),
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
    }
  },

  methods : {
    async loadShelf()
    {
    this.Shelf = await
        axios({
        method: 'get',
        url: 'https://smart-shelf-fe863.ondigitalocean.app/api/v1/shelf/',
        headers: {
          Authorization: 'Token '+ localStorage.getItem("auth_token")
        }
      })
          .then(response => response.data );
    },
    goAdd() {
      this.$router.push({name: "add"})
    },
    async LoadIdent(){
      this.cell_id = await axios({
        method: 'get',
        url: 'https://smart-shelf-fe863.ondigitalocean.app/api/v1/shelf',
        headers: {
          Authorization: 'Token ' + localStorage.getItem("auth_token")
        }
      }).then(response => response.data[0]['ident']).then(response => {
        this.loadShelf()
      })
    },

    async Delete(ident)
    {
      await axios({
            method: 'get',
            url: 'https://smart-shelf-fe863.ondigitalocean.app/api/v1/delete/'+ ident,
          });
      location.reload()
    },
    formatDate(str) {
      return str ? new Date(str).toLocaleString() : ""
    },
    check_log(){
      if(!this.check_login){
      }
    }

  },
  created() {

    this.loadShelf()


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