<template>
  <ApolloMutation
    :mutation="addTodo"
    :variables="{
      todo
    }"
    @done="cleanup"
  >
    <template slot-scope="{ mutate, error }">
      <form @submit.prevent="mutate">
        <q-input v-model="todo" outlined class="col-3" label="Add a task" autocomplete="off" />
      </form>
      <p v-if="error">There has been an error<br>{{error}}</p>
    </template>
  </ApolloMutation>
</template>

<script>
import gql from 'graphql-tag'

const ADD_TODO = gql`
  mutation addTodo($todo: String!) {
    addTodo(todo: $todo) @client
  }
`

export default {
  name: 'TodoInput',
  data () {
    return {
      todo: '',
      addTodo: ADD_TODO
    }
  },
  methods: {
    cleanup () {
      this.todo = ''
    }
  }
}
</script>
