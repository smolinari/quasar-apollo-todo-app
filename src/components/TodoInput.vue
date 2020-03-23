<template>
  <div>
    <q-form @submit.prevent="mutate">
      <q-input v-model="todo" outlined class="col-3" label="Add a task" autocomplete="off" />
    </q-form>
    <p v-if="error">There has been an error<br>{{error}}</p>
  </div>
</template>

<script>
import { mutations } from 'src/graphql/Todos'

export default {
  name: 'TodoInput',
  data () {
    return {
      todo: '',
      error: ''
    }
  },

  methods: {
    mutate () {
      this.$apollo.mutate({
        mutation: mutations.addTodo,
        variables: {
          todo: this.todo
        }
      }).then(() => {
        this.todo = ''
      }).catch((error) => {
        this.error = error
      })
    }
  }
}
</script>
