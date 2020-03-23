import nanoid from 'nanoid'

import { queries } from 'src/graphql/Todos'

export const resolvers = {
  Mutation: {
    addTodo: (_, { todo }, { cache }) => {
      const query = queries.getTodos
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

    editTodo: (_, args, { cache }) => {
      const data = cache.readQuery({
        query: queries.getTodos
      })
      const todos = data.todos
      const todo = todos.find((todo) => {
        if (todo.id === args.id) {
          todo.todo = args.todo
        }
        return todo.todo
      })
      cache.writeData({ data })
      return todo.todo
    },

    deleteTodos: (_, __, { cache }) => {
      const query = queries.getTodos
      const allTodos = cache.readQuery({ query })
      const data = {
        todos: allTodos.todos.filter(t => !t.completed)
      }
      cache.writeData({ data })
    },

    setActiveFilter: (_, args, { cache }) => {
      const query = queries.getFilters
      const data = cache.readQuery({ query })
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
      const query = queries.getTodos
      const data = cache.readQuery({ query })
      const todo = data.todos.find(todo => todo.id === args.id)
      return { ...todo }
    }
  }
}
