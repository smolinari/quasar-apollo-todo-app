<template>
  <q-btn
    v-if="tasksCompleted(todos)"
    class="text-center"
    color="primary"
    outline
    @click="deleteTodos(todos)">
    delete completed todos
  </q-btn>
</template>

<script>
import gql from 'graphql-tag'
import TodosList from './TodosList'

const getTodos = TodosList.apollo.todos

export default {
  name: 'DeleteBar',
  data () {
    return {
      todos: []
    }
  },
  apollo: {
    todos: getTodos
  },
  methods: {
    deleteTodos (todos) {
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
          mutation: gql`
            mutation deleteTodos {
              deleteTodos @client
            }
          `
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    tasksCompleted (todos) {
      const completed = todos.filter(t => t.completed)
      return completed.length
    }
  }
}
</script>
