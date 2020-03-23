<template>
  <div>
    <q-form @submit.prevent="mutate">
      <q-input style="width: 200px" dense borderless v-model="todo.todo" autocomplete="off" @keyup.escape="mutate" />
    </q-form>
    <p v-if="error">There has been an error<br>{{error}}</p>
  </div>
</template>

<script>
import { queries, mutations } from 'src/graphql/Todos'

export default {
  name: 'TodoEdit',

  props: {
    todoId: String
  },

  data () {
    return {
      todo: {},
      error: ''
    }
  },

  apollo: {
    todo: {
      query: queries.getTodo,
      variables: function () {
        return { id: this.todoId }
      }
    }
  },

  methods: {
    mutate () {
      this.$apollo.mutate({
        mutation: mutations.editTodo,
        variables: {
          id: this.todoId,
          todo: this.todo.todo
        }
      }).catch((error) => {
        this.error = error
      })
      this.$emit('input')
    }
  }
}
</script>
