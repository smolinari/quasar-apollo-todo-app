<template>
  <ApolloMutation
    :mutation="gql => gql`
    mutation toggleTodo($id: id!) {
      toggleTodo(id: $id) @client
    }
  `"
    :variables= "{ id: todo.id }"
  >
    <template v-slot="{ mutate }">
      <q-checkbox
        :id="todo.id"
        v-model="todo.completed"
        @click="mutate()"
      />
    </template>
  </ApolloMutation>
</template>
<script>

export default {
  name: 'CompleteTodoCheckbox',
  props: {
    todo: {}
  }
}
</script>
