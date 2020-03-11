<template>
  <div>
    <q-list bordered separator v-if="todos.length">
      <q-item v-for="todo in visibleTodos(todos)" :key="todo.id">
        <Todo :todo="todo" />
      </q-item>
    </q-list>
    <p v-else class="text-center"> Add some tasks and let's get some work done! </p>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Todo from './Todo'

export default {
  name: 'TodosList',
  components: { Todo },
  props: {
    listFilter: {
      type: String
    }
  },
  data () {
    return {
      todos: []
    }
  },
  apollo: {
    todos: gql`
      {
        todos @client {
          id
          todo
          completed
        }
      }
    `
  },
  methods: {
    visibleTodos (todos) {
      switch (this.listFilter) {
        case 'SHOW_ALL':
          return todos
        case 'SHOW_COMPLETED':
          return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
          return todos.filter(t => !t.completed)
        default:
          throw new Error('Unknown filter: ' + this.listFilter)
      }
    }
  },
  watch: {
    todos: {
      handler: function () {
        if (this.todos.length === 0) return
        if (this.todos.every(todo => todo.completed)) {
          this.$q.notify({
            message: 'You finished all your tasks. Awesome!👍'
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style>

</style>
