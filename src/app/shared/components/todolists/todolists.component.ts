import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Itodo } from 'src/app/modules/todoLists';

@Component({
selector: 'app-todolists',
templateUrl: './todolists.component.html',
styleUrls: ['./todolists.component.scss']
})
export class TodolistsComponent implements OnInit {
  
  isDarkMode = false;
toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;

  const body = document.body;
  if (this.isDarkMode) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
}


isEdit:boolean = false
editTodoId!: string
@ViewChild('todo') eleRef! : ElementRef;
constructor(private _snackBar: MatSnackBar) { }


uuid = () => {
return (
String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
).replace(/[xy]/g, (character) => {
const random = (Math.random() * 16) | 0;
const value = character === "x" ? random : (random & 0x3) | 0x8;
return value.toString(16);
});
};


todoArr:Array<Itodo> =[
{
todoItem:'Angular 14',
todoId:this.uuid()
},
{
todoItem:'Angular 18',
todoId:this.uuid()
}
]


ngOnInit(): void {
  // 👇 Page load hote hi input par focus dikhe
  setTimeout(() => {
    this.eleRef.nativeElement.focus();
  }, 0);
}



addTodo(todoInput:HTMLInputElement)
{
if(todoInput.value.length>0){
let todoObj:Itodo ={
todoItem:todoInput.value,
todoId:this.uuid()
 
}

console.log(todoObj);
this.todoArr.push(todoObj);
this._snackBar.open('SuccessFully Added', 'close', {
  horizontalPosition: 'center',
  verticalPosition: 'top',
  duration: 3000  // 3 seconds (optional)
});

todoInput.value = ''

}
}




onEdit(todo:Itodo)
{
this.isEdit = true;
console.log(todo);

 this.editTodoId = todo.todoId;
localStorage.setItem('Edit_Id' , this.editTodoId)
this.eleRef.nativeElement.value = todo.todoItem;
 this.eleRef.nativeElement.focus();
}



onUpdate(todoInput:HTMLInputElement)
{
let updated_Id = localStorage.getItem('Edit_Id')
localStorage.removeItem("EDIT_ID")
if(updated_Id)
{
let updated_Obj :Itodo = {
todoItem:todoInput.value,
todoId:updated_Id
}
todoInput.value = ''
let GET_INDEX = this.todoArr.findIndex((todo => todo.todoId === updated_Id))

this.todoArr[GET_INDEX] = updated_Obj
this._snackBar.open('SuccessFully Updated', 'close', {
  horizontalPosition: 'center',
  verticalPosition: 'top',
  duration: 3000  // 3 seconds (optional)
});
this.isEdit = false
this.editTodoId = ''
} 
}


onDelete(todoId:string)
{
  console.log(todoId);

  let REMOVE_ID =todoId
console.log(REMOVE_ID)


let index =this.todoArr.findIndex(todo => todo.todoId === REMOVE_ID)
this.todoArr.splice(index,1)
this._snackBar.open('SuccessFully Deleted', 'close', {
  horizontalPosition: 'center',
  verticalPosition: 'top',
  duration: 3000  // 3 seconds (optional)
});
}

}





