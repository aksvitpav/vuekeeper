<template>
  <mdb-col col="6">
    <mdb-card class="card-body py-2">
      <form v-on:submit.prevent>
        <mdb-input class="my-1" label="Заголовок заметки" icon="pencil-alt" v-model="newNoteTitle" v-on:focus="newNoteExpand=true" />
        <template v-if="newNoteExpand">
        <mdb-input class="my-1" type="textarea" label="Текст заметки" icon="sticky-note" v-model="newNoteText" />
        <mdb-btn color="success" v-on:click="newNoteAdd">Сохранить</mdb-btn>
        <mdb-btn color="warning" v-on:click="newNoteCancel">Отмена</mdb-btn>
        </template>
      </form>
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
      newNoteText: ""
    };
  },
  methods: {
    newNoteCancel: function () {
      this.newNoteExpand=false;
      this.newNoteTitle='';
      this.newNoteText='';
    },
    newNoteAdd: function () {
      this.addNote(this.newNoteTitle, this.newNoteText);
      this.newNoteExpand=false;
      this.newNoteTitle='';
      this.newNoteText='';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
