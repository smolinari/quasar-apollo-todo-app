import gql from 'graphql-tag'

export const getTodos = gql`
  query GetTodos {
    todos @client {
      id
      text
      completed
    }
  }
`
export const getTodo = gql`
  query GetTodo($id: String!) {
    todos(id: $id) @client {
      id
      text
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
