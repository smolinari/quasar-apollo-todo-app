<template>
  <div class="row">
    <q-item-section avatar>
        <TodoToggle :id="todo.id" :completed="todo.completed" />
    </q-item-section>
    <q-item-section
      v-if="!editTodo"
      @click="toggleEdit"
      class="text-body1 cursor-pointer"
      :style="checkedStyle"
    >
      {{ todo.text }}
    </q-item-section>
    <TodoEdit v-else :id="todo.id" :text="todo.text" @input="toggleEdit"/>
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
      editTodo: false
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
      this.editTodo = !this.editTodo
    }
  }
}
</script>
