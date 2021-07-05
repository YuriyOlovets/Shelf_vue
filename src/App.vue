<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<style>

@import "assets/fontawesome/css/all.min.css";
@import "assets/css/templatemo-xtra-blog.css";
@import "assets/css/bootstrap.min.css";
@import "assets/css/my.css";
</style>
<script>

import Vue from "vue";
import {AutoCompletePlugin} from "@syncfusion/ej2-vue-dropdowns";
Vue.use(AutoCompletePlugin);
import Nav from "./components/Nav";
import axios from 'axios'
export default {
  components: {Nav},
  created() {
  }
}

</script>
