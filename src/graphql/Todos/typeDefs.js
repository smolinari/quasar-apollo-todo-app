import gql from 'graphql-tag'

export const typeDefs = gql`
  type Todo {
    id: String!
    text: String!
    completed: Boolean!
  },

  type Filter {
    name: String!
    label: String!
    active: Boolean!
  },

  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: String!): Todo
    setActiveFilter(name: String!): Filter
    editTodo(text: String!, id: String!): Todo
  }
`
