<template>
  <mdb-col col="6">
    <mdb-card class="card-body p-0">
      <mdb-card-body>
      <form v-on:submit.prevent>
        <mdb-input
          class="my-1"
          label="Заголовок заметки"
          v-bind:icon="icon"
          v-model="newNoteTitle"
          v-on:focus="expandForm"
        />
        <template v-if="newNoteExpand">
          <mdb-input
            class="my-1"
            type="textarea"
            label="Текст заметки"
            icon="sticky-note"
            v-model="newNoteText"
          />
        </template>
      </form>
      </mdb-card-body>
    <mdb-card-footer class="text-right" v-if="newNoteExpand">
      <template v-if="hasText">
            <mdb-btn color="success" v-on:click="newNoteAdd">Сохранить</mdb-btn>
          </template>
          <mdb-btn color="warning" v-on:click="newNoteCancel">Отмена</mdb-btn>
    </mdb-card-footer>
    </mdb-card>
  </mdb-col>
</template>

<script>
export default {
  name: "NoteAdd",
  props: {
    addNote: Function
  },
  data() {
    return {
      newNoteExpand: false,
      newNoteTitle: "",
      newNoteText: "",
      icon:'plus-circle'
    };
  },
  methods: {
    expandForm: function () {
      this.newNoteExpand=true;
      this.icon = "pencil-alt"
    },
    newNoteCancel: function() {
      this.newNoteExpand = false;
      this.icon = "plus-circle"
      this.newNoteTitle = "";
      this.newNoteText = "";
    },
    newNoteAdd: function() {
      this.addNote(this.newNoteTitle, this.newNoteText);
      this.newNoteExpand = false;
      this.newNoteTitle = "";
      this.newNoteText = "";
    }
  },
  computed: {
    hasText: function() {
      return this.newNoteText != "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
