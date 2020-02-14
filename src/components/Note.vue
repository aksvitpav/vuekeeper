<template>
  <mdb-card>
    <mdb-card-body>
      <mdb-card-title tag="h5">{{title}}</mdb-card-title>
      <mdb-card-text>{{text}}</mdb-card-text>
    </mdb-card-body>
    <mdb-card-footer>
      <mdb-badge color="info">{{normalizeDateTime}}</mdb-badge>
      <mdb-btn color="danger" class="p-1" v-on:click="deleteNote(id)">
        <mdb-icon icon="trash-alt" />
      </mdb-btn>
    </mdb-card-footer>
  </mdb-card>
</template>

<script>
import { Timestamp } from '../config/firestore';

export default {
  name: "Note",
  props: {
    id: String,
    title: String,
    text: String,
    created_at: Timestamp,
    deleteNote: Function
  },
  computed: {
    normalizeDateTime: function() {
      var date = new Date(this.created_at.seconds * 1000);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      function addZero(t) {
        if (t < 10) {
          t = "0" + t;
        }
        return t;
      }
      return (
        day +
        "/" +
        addZero(month) +
        "/" +
        year +
        " " +
        addZero(hours) +
        ":" +
        addZero(minutes)
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
