<template>
  <q-btn
    v-if="tasksCompleted()"
    class="text-center"
    color="primary"
    outline
    @click="deleteTodos()">
    delete completed todos
  </q-btn>
</template>

<script>
import { queries, mutations } from 'src/graphql/Todos'

export default {
  name: 'DeleteBar',

  data () {
    return {
      todos: []
    }
  },

  apollo: {
    todos: queries.getTodos
  },

  methods: {
    deleteTodos () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you certain you want to delete your completed tasks?',
        cancel: true,
        persistent: true,
        ok: {
          label: 'confirm deletion',
          flat: true,
          outline: true
        }
      }).onOk(() => {
        // console.log('>>>> OK')
      }).onOk(() => {
        this.$apollo.mutate({
          mutation: mutations.deleteTodos
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },

    tasksCompleted () {
      const completed = this.todos.filter(t => t.completed)
      return completed.length
    }
  }
}
</script>
