<template>
  <div class="row">
    <q-item-section avatar>
        <CompleteTodoCheckbox :todo="todo"/>
    </q-item-section>
    <q-item-section class="text-body1" :style="checkedStyle">
            {{ todo.todo}}
    </q-item-section>
  </div>
</template>
<script>
import CompleteTodoCheckbox from './CompleteTodoCheckbox'

export default {
  name: 'Todo',
  components: { CompleteTodoCheckbox },
  props: {
    todo: {}
  },
  computed: {
    checkedStyle () {
      const style = this.todo.completed ? 'line-through' : 'none'
      return `textDecoration: ${style}`
    }
  }
}
</script>
