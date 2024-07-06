

export class Todo {

  public id: number;
  public text: string;
  public completed: boolean;

  constructor( text: string ) {

    this.text = text;

    this.id = Math.trunc(Math.random() * Math.pow(10, 12));

    this.completed = false;

  }
}
