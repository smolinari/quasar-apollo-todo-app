export function apolloClientBeforeCreate ({ apolloClientConfigObj }) {
  apolloClientConfigObj.cache.writeData({
    data: {
      todos: [],

      networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: false
      },

      filters: [
        {
          name: 'SHOW_ALL',
          label: 'All',
          active: true,
          __typename: 'Filter'
        },
        {
          name: 'SHOW_COMPLETED',
          label: 'Completed',
          active: false,
          __typename: 'Filter'
        },
        {
          name: 'SHOW_ACTIVE',
          label: 'Active',
          active: false,
          __typename: 'Filter'
        }
      ]
    }
  })
  // if needed you can modify here the config object used for apollo client
  // instantiation
}

export function apolloClientAfterCreate ({ apolloClient } /* {, app, router, store, ssrContext, urlPath, redirect } */) {
  // if needed you can modify here the created apollo client
}
