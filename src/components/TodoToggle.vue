<template>
  <div>
  <q-checkbox
    v-model="todoToggle"
    @input="setToggle"
  />
  <p v-if="error">There has been an error<br>{{error}}</p>
  </div>
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
      error: '',
      todoToggle: this.completed
    }
  },

  methods: {
    setToggle () {
      this.$apollo.mutate({
        mutation: mutations.toggleTodo,
        variables: {
          id: this.id
        },
        update: (store, { data: { toggleTodo } }) => {
          const data = store.readQuery({ query: queries.getTodos })
          data.todos.find((todo) => {
            if (todo.id === this.id) {
              todo.completed = !todo.completed
            }
          })
          store.writeQuery({ query: queries.getTodos, data })
        }
      }).catch((error) => {
        this.error = error
      })
    }
  }
}
</script>
