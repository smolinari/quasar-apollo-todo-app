import gql from 'graphql-tag'

export const typeDefs = gql`
  type Todo {
    id: String!
    todo: String!
    completed: Boolean!
  },

  type Filter {
    name: String!
    label: String!
    active: Boolean!
  },

  type Mutation {
    addTodo(todo: String!): Todo
    toggleTodo(id: String!): Todo
    setActiveFilter(name: String!): Filter
  }
`
