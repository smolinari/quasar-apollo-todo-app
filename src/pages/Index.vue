<template>
  <q-page class="q-pa-xs fit column content-center">
    <Logos/>
    <div class="text-center row todo-title">
      <h5 class="col">My Todo List</h5>
    </div>
    <TodoInput/>
    <TodosList :listFilter="filter" />
    <FilterBar />
    <DeleteBar />
  </q-page>
</template>

<script>
import Logos from 'components/Logos'
import TodoInput from 'components/TodoInput'
import TodosList from 'components/TodosList'
import FilterBar from 'components/FilterBar'
import DeleteBar from 'components/DeleteBar'

export default {
  name: 'TodosPage',
  components: { Logos, TodoInput, TodosList, FilterBar, DeleteBar },
  data () {
    return {
      filter: 'SHOW_ALL'
    }
  },
  methods: {
    setFilterType (filter) {
      // this.filterType = filterType
    }
  }
}
</script>

<style>
.todo-title {
    height: 90px;
    margin-top: -40px;
}

</style>
