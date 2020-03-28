<template>
  <div>
    <q-form @submit="submit">
      <q-input style="width: 200px" dense borderless v-model="innerText" autocomplete="off" @keyup.escape="mutate" />
    </q-form>
  </div>
</template>

<script>
import { mutations } from 'src/graphql/Todos'

export default {
  name: 'TodoEdit',

  props: {
    id: String,
    text: String
  },

  data () {
    return {
      innerText: this.text
    }
  },

  methods: {
    submit () {
      this.$emit('input')
      this.$apollo.mutate({
        mutation: mutations.editTodo,
        variables: {
          id: this.id,
          text: this.innerText
        }
      })
    }
  },
  mounted () {
    console.log(this.text)
  }
}
</script>
