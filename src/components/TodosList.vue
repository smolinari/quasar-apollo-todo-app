<template>
  <div style="width: 300px">
    <q-list v-if="todos.length" bordered separator>
      <q-item v-for="todo in visibleTodos" :key="todo.id">
        <Todo :todo="todo" />
      </q-item>
    </q-list>
    <p v-else class="text-center"> Add some tasks and let's get some work done! </p>
  </div>
</template>

<script>
import { queries } from 'src/graphql/Todos'
import Todo from 'components/Todo'

export default {
  name: 'TodosList',

  components: { Todo },

  data () {
    return {
      todos: [],
      filters: [],
      activeFilter: ''
    }
  },

  apollo: {
    todos: queries.getTodos,
    filters: queries.getFilters
  },

  computed: {
    visibleTodos () {
      switch (this.activeFilter.name) {
        case 'SHOW_ALL':
          return this.todos
        case 'SHOW_COMPLETED':
          return this.todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
          return this.todos.filter(t => !t.completed)
        default:
          return this.todos
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
    },

    filters: {
      handler: function () {
        this.activeFilter = this.filters.find(filter => filter.active)
      },
      deep: true
    }
  }
}
</script>
