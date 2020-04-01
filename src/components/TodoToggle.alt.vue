<template>
  <ApolloMutation
    :mutation="mutation"
    :update="updateCache"
  >
    <template v-slot="{ mutate, loading, error }">
      <q-checkbox
        v-model="todoToggle"
        @input="mutate"
      />
      <p v-if="error">There has been an error<br>{{error}}</p>
    </template>
  </ApolloMutation>
</template>
<script>
import { queries, mutations } from 'src/graphql/Todos'

export default {
  name: 'TodoToggle',

  props: {
    id: String,
    completed: Boolean
  },

  data () {
    return {
      todoToggle: this.completed,
      mutation: mutations.toggleTodo
    }
  },

  methods: {
    updateCache (store, { data: { toggleTodo } }) {
      const data = store.readQuery({ query: queries.getTodos })
      data.todos.find((todo) => {
        if (todo.id === this.id) {
          todo.completed = !todo.completed
        }
      })
      store.writeQuery({ query: queries.getTodos, data })
    }
  }
}
</script>
