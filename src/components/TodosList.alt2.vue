<template>
  <ApolloQuery
    :query="require('src/graphql/Todos/GetTodos.gql')"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <div style="width: 300px">
        <q-list bordered separator v-if="data.todos.length">
          <q-item v-for="todo in visibleTodos(data.todos)" :key="todo.id">
            <Todo :todo="todo" />
          </q-item>
        </q-list>
        <p v-else class="text-center"> Add some tasks and let's get some work done! </p>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import { queries } from 'src/graphql/Todos'
import Todo from 'components/Todo'

export default {
  name: 'TodosList',

  components: { Todo },

  data () {
    return {
      filters: [],
      activeFilter: ''
    }
  },

  apollo: {
    filters: queries.getFilters
  },

  methods: {
    visibleTodos (todos) {
      switch (this.activeFilter.name) {
        case 'SHOW_ALL':
          return todos
        case 'SHOW_COMPLETED':
          return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
          return todos.filter(t => !t.completed)
        default:
          return todos
      }
    }
  },

  watch: {
    data: {
      handler: function () {
        if (this.data.todos.length === 0) return
        if (this.data.todos.every(todo => todo.completed)) {
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
