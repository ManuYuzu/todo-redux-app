import { createAction, props } from "@ngrx/store"

export const create = createAction(
  '[TODO] Create ToDo',
  props<{ text: string }>()
);

export const toggle = createAction(
  '[TODO] Toggle ToDo state',
  props<{ id: number }>()
);

export const toggleAll = createAction(
  '[TODO] Toggle all ToDo state',
  props<{ completed: boolean }>()
);

export const edit = createAction(
  '[TODO] Edit ToDo',
  props<{ id: number, text: string }>()
);

export const remove = createAction(
  '[TODO] Remove ToDo',
  props<{ id: number }>()
);

export const removeAllCompleted = createAction(
  '[TODO] Remove all completed ToDos'
);
