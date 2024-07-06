import { Action, createReducer, on } from "@ngrx/store";
import { create, edit, remove, removeAllCompleted, toggle, toggleAll } from "./todo.actions";
import { Todo } from "./models/todo.models";

export const initialState: Todo[] = [
  new Todo('Estado inicial'),
  new Todo('Comprar sal gruesa'),
  new Todo('Pasear al pez'),
];

const _todoReducer = createReducer( initialState,

  on( create, (state, { text }) => [...state, new Todo( text )] ),

  on( toggle, (state, { id }) => state.map( todo => {

    if (todo.id === id ) {
      return { ...todo, completed: !todo.completed }
    } else {
      return todo;
    }

  })),

  on( toggleAll, (state, { completed }) => state.map( todo => {

      return { ...todo, completed: completed }

  })),

  on( edit, (state, { id, text }) => state.map( todo => {

    if (todo.id === id ) {
      return { ...todo, text: text }
    } else {
      return todo;
    }

  })),

  on( remove, (state, { id }) => state.filter( todo => todo.id !== id ) ),

  on( removeAllCompleted, ( state ) => state.filter( todo => !todo.completed ) )
)

export function todoReducer( state: any, action: Action ) {
  return _todoReducer( state, action )
}
