<template>
  <div class="q-pa-sm text-center">
    <q-btn
      color="primary"
      v-for="(filter, index) in filters"
      :flat="!filter.active"
      :key="index"
      @click="setFilter(filter.name)"
    >
      {{ filter.label }}
    </q-btn>
    <p v-if="error">There has been an error<br>{{error}}</p>
  </div>
</template>

<script>
import { queries, mutations } from 'src/graphql/Todos'

export default {
  name: 'FilterBar',

  data () {
    return {
      filters: [],
      error: ''
    }
  },

  apollo: {
    filters: queries.getFilters
  },

  methods: {
    setFilter (filterName) {
      this.$apollo.mutate({
        mutation: mutations.setActiveFilter,
        variables: {
          name: filterName
        }
      }).catch((error) => {
        this.error = error
      })
    }
  }
}
</script>
