<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <button v-on:click="addNote('title2', 'text2')">Add</button>
    <Note msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Note from "./components/Note.vue";
import { db, Timestamp } from "./config/firestore";

export default {
  name: "App",
  components: {
    Note
  },
  data() {
    return {
      notes: []
    };
  },
  methods: {
    //Get Notes from FireBase
    getNotes: function() {
      db.collection("notes").onSnapshot(querySnapshot => {
        let notes = [];
        querySnapshot.forEach(doc => {
          //Get Notes Data
          let noteData = doc.data();
          //Get Notes Id
          noteData.id = doc.id;
          notes.push(noteData);
        });
        this.notes = notes; //Push to Data.notes
      });
    },
    //Add Note to FireBase
    addNote: function(title, text) {
      let nowDateTime = new Date();
      db.collection("notes").add({
        title: title,
        text: text,
        created_at:Timestamp.fromDate(nowDateTime),
      });
      this.getNotes();
    }
  },
  beforeMount() {
    //Get All Notes onAppMount
    this.getNotes();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
