import { Component } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss'
})
export class TodoPageComponent {

  allCompleted: boolean = false;

  constructor( private store: Store<AppState> ) {};

  toggleAll() {
    this.allCompleted = !this.allCompleted;

    this.store.dispatch( actions.toggleAll({ completed: this.allCompleted }) )
  }
}
