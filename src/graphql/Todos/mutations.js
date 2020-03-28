import gql from 'graphql-tag'

export const addTodo = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client
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
  mutation editTodo($id: String!, $text: String!) {
    editTodo(id: $id, text: $text) @client
  }
`

export const toggleTodo = gql`
  mutation toggleTodo($id: String!) {
    toggleTodo(id: $id) @client
  }
`
