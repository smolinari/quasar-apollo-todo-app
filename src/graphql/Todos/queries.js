import gql from 'graphql-tag'

export const getTodos = gql`
  query GetTodos {
    todos @client {
      id
      todo
      completed
    }
  }
`
export const getTodo = gql`
  query GetTodo($id: String!) {
    todo(id: $id) @client {
      id
      todo
      completed
    }
  }
`

export const getFilters = gql`
  query GetFilters {
    filters @client {
      name
      label
      active
    }
  }
`
