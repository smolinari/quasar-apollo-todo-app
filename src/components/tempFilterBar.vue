<template>
  <div class="q-pa-sm text-center">
    <q-btn
      color="primary"
      :flat="!filter.active"
      v-for="(filter, index) in filters"
      :key="index"
      @click="setFilter(filter.name)"
    >
            {{ filter.label }}
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  data () {
    return {
      filters: [
        {
          name: 'SHOW_ALL',
          label: 'All',
          active: true
        },
        {
          name: 'SHOW_COMPLETED',
          label: 'Completed',
          active: false
        },
        {
          name: 'SHOW_ACTIVE',
          label: 'Active',
          active: false
        }
      ]
    }
  },
  methods: {
    setFilter (filter) {
      this.setActiveFilter(filter)
      this.$emit('click', filter)
    },
    activeStyle (active) {
      return !active ? 'text-decoration: none' : 'text-decoration: underline'
    },
    setActiveFilter (filterName) {
      this.filters.map(filter => {
        filterName === filter.name
          ? filter.active = true
          : filter.active = false
      })
    }
  }
}
</script>
