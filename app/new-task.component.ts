import { Component, EventEmitter } from 'angular2/core';
import { Task } from './task.model';

@Component({
  selector: 'new-task',
  outputs: ['onSubmitNewTask'],
  template:`
    <div class="task-form">
      <h3>Create Task:</h3>
      <input placeholder="Description" class="col-sm-8 input-lg" #newDescription>
      <label for="new-priority">Priority</label>
      <select placeholder="Priority" #newPriority id="new-priority">
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low" selected="selected">Low</option>
      </select>
      <label for="new-category">Category</label>
      <select placeholder="Category" #newCategory id="new-category">
        <option value="Work">Work</option>
        <option value="Home">Home</option>
        <option value="Hobby" selected="selected">Hobby</option>
      </select>
      <button (click)="addTask(newDescription, newPriority, newCategory)" class="btn-success btn-lg add-button">Add</button>
    </div>
  `
})
export class NewTaskComponent {
  public onSubmitNewTask: EventEmitter<Object>;
  constructor(){
    this.onSubmitNewTask = new EventEmitter();
  }
  addTask(userDescription: HTMLInputElement, userPriority: HTMLSelectElement, userCategory: HTMLSelectElement){
    this.onSubmitNewTask.emit({
      description: userDescription.value,
      priority: userPriority.value,
      category: userCategory.value
    });
    userDescription.value = "";
  }
}
