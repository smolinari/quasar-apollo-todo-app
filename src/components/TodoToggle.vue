<template>
  <q-checkbox
    :id="todo.id"
    v-model="todo.completed"
  />
</template>
<script>

export default {
  name: 'TodoToggle',
  props: {
    todo: {}
  }
}
</script>
