import nanoid from 'nanoid'

import { queries } from 'src/graphql/Todos'

export const resolvers = {
  Mutation: {
    addTodo: (_, { text }, { cache }) => {
      const previous = cache.readQuery({
        query: queries.getTodos
      })
      const newTodo = {
        id: nanoid(10),
        text,
        completed: false,
        __typename: 'TodoItem'
      }
      const data = {
        todos: previous.todos.concat([newTodo])
      }
      cache.writeData({ data })
      return newTodo
    },

    editTodo: (_, args, { cache }) => {
      const data = cache.readQuery({
        query: queries.getTodos
      })
      const todo = data.todos.find((todo) => {
        if (todo.id === args.id) {
          todo.text = args.text
        }
        return todo.todo
      })
      cache.writeData({ data: { todos: data.todos } })
      return todo
    },

    deleteTodos: (_, __, { cache }) => {
      const allTodos = cache.readQuery({
        query: queries.getTodos
      })
      const data = {
        todos: allTodos.todos.filter(t => !t.completed)
      }
      cache.writeData({ data })
    },

    setActiveFilter: (_, args, { cache }) => {
      const data = cache.readQuery({
        query: queries.getFilters
      })
      data.filters.forEach(filter => {
        filter.name === args.name
          ? filter.active = true
          : filter.active = false
      })
      cache.writeData({ data })
    }
  },

  Query: {
    todo: (_, args, { cache }) => {
      const data = cache.readQuery({
        query: queries.getTodos
      })
      const todo = data.todos.find(todo => todo.id === args.id)
      return { ...todo }
    }
  }
}
