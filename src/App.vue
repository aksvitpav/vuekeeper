<template>
  <div id="app">
    <mdb-container>
      <mdb-row>
        <mdb-col class="text-center">
          <img src="../src/assets/logo.svg" class="logo rounded m-2" alt="...">
          <h1>Добро пожаловать в VueKeeper</h1>
        </mdb-col>
      </mdb-row>
      <mdb-row class="mb-4">
        <NoteAdd :addNote="addNote"></NoteAdd>
        <mdb-col md="12" lg="6">
          <Weather></Weather>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col>
          <mdb-card-group column>
          <Note v-for="(note, index) in notes"
          :id="note.id"
          :title="note.title"
          :text="note.text"
          :created_at="note.created_at"
          :key="index"
          :deleteNote = "deleteNote"
          :editNote = "editNote" />
          </mdb-card-group>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import Note from "./components/Note.vue";
import NoteAdd from "./components/NoteAdd.vue";
import Weather from "./components/Weather.vue"
import { db, Timestamp } from "./config/firestore";

export default {
  name: "App",
  components: {
    Note,
    NoteAdd,
    Weather
  },
  data() {
    return {
      notes: [],
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
        created_at: Timestamp.fromDate(nowDateTime)
      });
      this.getNotes();
    },
    //Edit Note on FireBase
    editNote: function (id, updated) {
      db.collection('notes').doc(id).set(updated);
      this.getNotes();
    },
    //Delete Note from FireBase
    deleteNote: function(id) {
      db.collection('notes').doc(id).delete()
    }
  },
  beforeMount() {
    //Get All Notes onAppMount
    this.getNotes();
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
.logo {
  max-width: 100px;
}
</style>
