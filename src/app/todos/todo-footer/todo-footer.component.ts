import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filter/filter.actions';
import { removeAllCompleted } from '../todo.actions'

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.scss'
})
export class TodoFooterComponent implements OnInit {

  currentFilter!: actions.validFilters;
  filters: actions.validFilters[] = ['all', 'completed', 'pending'];
  pendings: number = 0;

  constructor( private store: Store<AppState> ) {}

  ngOnInit(): void {
    this.store
      // .select('filter')
      // .subscribe( filter => this.currentFilter = filter );
      .subscribe( state => {
        this. currentFilter = state.filter;
        this.pendings = state.todos.filter( todo => !todo.completed).length;
      });
  }

  changeFilter( filter: actions.validFilters ) {

    this.store.dispatch( actions.setFilter({ filter }) );

  }

  removeAllCompleted() {

    this.store.dispatch ( removeAllCompleted() )

  }
}
