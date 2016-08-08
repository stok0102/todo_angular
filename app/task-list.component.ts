import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';
import {DonePipe} from './done.pipe';
import {PriorityPipe} from './priority.pipe';

@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  pipes: [DonePipe, PriorityPipe],
  directives: [TaskComponent, EditTaskDetailsComponent, NewTaskComponent],
  template: `
  <select #doneFilter class="filter">
    <option value="done">Show Done</option>
    <option value="notDone" selected="selected">Show Not Done</option>
    <option value="all">Show Both</option>
  </select>
  <select #priorityFilter>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low" selected="selected">Low</option>
    </select>
    <button (click)="onChange(doneFilter.value, priorityFilter.value)" class="filter">Filter</button>
  <task-display *ngFor="#currentTask of taskList  | priority:filterPriority | done:filterDone"
    (click)="taskClicked(currentTask)"
    [class.selected]="currentTask === selectedTask"
    [task]="currentTask">
  </task-display>
  <edit-task-details *ngIf="selectedTask" [task]="selectedTask">
  </edit-task-details>
  <new-task (onSubmitNewTask)="createTask($event.description, $event.priority, $event.category)"></new-task>
  `
})
export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  public selectedTask: Task;
  public filterDone: string = "notDone";
  public filterPriority: string = "Low";
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask);
  }
  createTask(description: string, priority: string, category: string): void {
    this.taskList.push(
      new Task(description, priority, category, this.taskList.length)
    );
  }
  onChange(filterDoneOption, filterPriorityOption) {
    this.filterDone = filterDoneOption;
    this.filterPriority = filterPriorityOption;
  }
}
