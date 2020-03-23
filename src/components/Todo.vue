<template>
  <div class="row">
    <q-item-section avatar>
        <TodoToggle :todo="todo"/>
    </q-item-section>
    <q-item-section v-if="!editTodo"
      @click="toggleEdit"
      class="text-body1 cursor-pointer"
      :style="checkedStyle"
    >
      {{ todo.todo }}
    </q-item-section>
    <TodoEdit v-else :todoId="todo.id" @input="toggleEdit"/>
  </div>
</template>
<script>
import TodoToggle from 'components/TodoToggle'
import TodoEdit from 'components/TodoEdit'

export default {
  name: 'Todo',
  components: { TodoToggle, TodoEdit },
  props: {
    todo: {}
  },
  data () {
    return {
      editTodo: false,
      todoInternal: this.todo
    }
  },

  computed: {
    checkedStyle () {
      const style = !this.editTodo && this.todo.completed ? 'line-through' : 'none'
      return `textDecoration: ${style}`
    }
  },

  methods: {
    toggleEdit () {
      this.todo = this.todoInternal
      this.editTodo = !this.editTodo
    }
  }
}
</script>
