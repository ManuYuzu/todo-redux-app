import { Component } from '@angular/core';
import { Todo } from '../models/todo.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { validFilters } from '../../filter/filter.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos: Todo[] = [];
  currentFilter!: validFilters;

  constructor( private store: Store<AppState> ) {}

  ngOnInit(): void {

    this.store
      // .select('todos')
      // .subscribe( todos => this.todos = todos )
      .subscribe ( ({todos, filter}) => {
        this.todos = todos;
        this.currentFilter = filter
      })

  }
}
