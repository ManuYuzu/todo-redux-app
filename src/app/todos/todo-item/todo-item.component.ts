import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.models';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @ViewChild('physicalInput') physicalTxt!: ElementRef;
  private todoSubscription!: Subscription

  chkComplete!: FormControl;
  txtInput!: FormControl;

  editing: boolean = false;

  constructor ( private store: Store<AppState> ) {}

  ngOnInit(): void {
    this.chkComplete = new FormControl( this.todo.completed );
    this.txtInput = new FormControl( this.todo.text, Validators.required )

    this.chkComplete.valueChanges.subscribe( value =>
      this.store.dispatch( actions.toggle({ id: this.todo.id }) )
    );

    this.todoSubscription = this.store
      .select('todos')
      .subscribe( todos => {
        const currentTodo = todos.find( todo => todo.id === this.todo.id );
        if (currentTodo && this.chkComplete.value !== currentTodo.completed) {
          this.chkComplete.setValue( currentTodo.completed, { emitEvent: false })
        }
      })
  }
  ngOnDestroy(): void {
    if (this.todoSubscription) {
      this.todoSubscription.unsubscribe();
    }
  }

  edit() {
    this.editing = true;
    this.txtInput.setValue( this.todo.text );

    setTimeout(() => {
      this.physicalTxt.nativeElement.select();
    }, 1)
  }

  finishEdit() {
    this.editing = false;

    if ( this.txtInput.invalid ) return
    if ( this.txtInput.value === this.todo.text ) return

    this.store.dispatch( actions.edit({
      id: this.todo.id,
      text: this.txtInput.value
    }) )
  }

  remove() {
    this.store.dispatch( actions.remove({ id: this.todo.id }) )
  }

}
