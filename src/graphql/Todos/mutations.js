import gql from 'graphql-tag'

export const addTodo = gql`
  mutation addTodo($todo: String!) {
    addTodo(todo: $todo) @client
  }
`
export const deleteTodos = gql`
  mutation deleteTodos {
    deleteTodos @client
  }
`
export const setActiveFilter = gql`
  mutation setActiveFilter($name: String!) {
    setActiveFilter(name: $name) @client
  }
`
export const editTodo = gql`
  mutation editTodo($id: String!, $todo: String!) {
    editTodo(id: $id, todo: $todo) @client
  }
`
