<template>
  <q-page class="q-pa-sm fit column content-center">
    <div class="text-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" class="" style="width: 180px">

      <h5 class="">My Todo List</h5>
    </div>
    <TodoInput style="width: 300px" />
    <TodosList :listFilter="filter" />
    <FilterBar @click="setFilter" />
    <DeleteBar />
  </q-page>
</template>

<script>
import TodoInput from 'components/TodoInput'
import TodosList from 'components/TodosList'
import FilterBar from 'components/FilterBar'
import DeleteBar from 'components/DeleteBar'

export default {
  name: 'TodosPage',
  components: { TodoInput, TodosList, FilterBar, DeleteBar },
  data () {
    return {
      filter: 'SHOW_ALL'
    }
  },
  methods: {
    setFilter (filter) {
      this.filter = filter
    }
  }
}
</script>
