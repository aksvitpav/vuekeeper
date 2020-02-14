<template>
  <mdb-card>
    <mdb-card-body>
      <mdb-card-title tag="h5">{{title}}</mdb-card-title>
      <mdb-card-text>{{text}}</mdb-card-text>
    </mdb-card-body>
    <mdb-card-footer class="text-right">
      <mdb-badge color="grey">{{normalizeDateTime}}</mdb-badge>
      <mdb-btn color="primary" class="px-2 py-1" v-on:click="showDialog">
        <mdb-icon icon="edit" />
      </mdb-btn>
      <mdb-btn color="danger" class="px-2 py-1" v-on:click="deleteNote(id)">
        <mdb-icon icon="trash-alt" />
      </mdb-btn>
    </mdb-card-footer>
    <!-- Modal Window for Update Note on FireBase -->
    <mdb-modal :show="showModal" v-on:close="showModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Редактирование записи "{{title}}"</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form v-on:submit.prevent>
          <mdb-input
            class="my-1"
            label="Заголовок заметки"
            icon="pencil-alt"
            v-model="updated.title"
          />
          <mdb-input
            class="my-1"
            type="textarea"
            label="Текст заметки"
            icon="sticky-note"
            v-model="updated.text"
          />
        </form>
      </mdb-modal-body>
      <mdb-modal-footer>
        <template v-if="hasText">
        <mdb-btn color="success" v-on:click="updateNote">Сохранить</mdb-btn>
        </template>
        <mdb-btn color="warning" v-on:click.native="showModal = false">Отмена</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    </mdb-card>
</template>

<script>
import { Timestamp } from "../config/firestore";

export default {
  name: "Note",
  props: {
    id: String,
    title: String,
    text: String,
    created_at: Timestamp,
    deleteNote: Function,
    editNote: Function
  },
  data() {
    return {
      updated: {
        title: "",
        text: "",
        created_at: Timestamp
      },
      showModal: false
    };
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
    },
    hasText: function () {
      return (this.updated.text !='');
    }
  },
  methods: {
    showDialog: function() {
      this.showModal = true;
      this.updated.title = this.title;
      this.updated.text = this.text;
    },
    updateNote: function () {
      let nowDateTime = new Date();
      this.updated.created_at = Timestamp.fromDate(nowDateTime);
      this.editNote(this.id, this.updated);
      this.showModal = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
