import gql from 'graphql-tag'
import nanoid from 'nanoid'

import TodosList from 'components/TodosList'

const getTodos = TodosList.apollo.todos

export const typeDefs = gql`
  type Todo {
    id: Int!
    todo: String!
    completed: Boolean!
  }

  type Mutation {
    addTodo(todo: String!): Todo
    toggleTodo(id: String!): Todo
  }

  type Query {
    visibilityFilter: String
    todos: [Todo]
  }
`

export const defaults = {
  todos: []
}

export const resolvers = {
  Mutation: {
    addTodo: (_, { todo }, { cache }) => {
      const query = getTodos
      const previous = cache.readQuery({ query })
      const newTodo = {
        id: nanoid(10),
        todo,
        completed: false,
        __typename: 'TodoItem'
      }
      const data = {
        todos: previous.todos.concat([newTodo])
      }
      cache.writeData({ data })
      return newTodo
    },

    toggleTodo: (_, variables, { cache }) => {
      console.log('toggling completed')
      const id = `TodoItem:${variables.id}`
      const fragment = gql`
        fragment completeTodo on TodoItem {
          completed
        }
      `
      const todo = cache.readFragment({ fragment, id })
      const data = { ...todo, completed: !todo.completed }
      cache.writeData({ id, data })
      return null
    },

    deleteTodos: (_, __, { cache }) => {
      const query = getTodos
      const allTodos = cache.readQuery({ query })
      const data = {
        todos: allTodos.todos.filter(t => !t.completed)
      }
      cache.writeData({ data })
    }
  }
}
