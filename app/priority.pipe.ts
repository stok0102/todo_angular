import {Pipe, PipeTransform} from 'angular2/core';
import {Task} from './task.model';

@Pipe({
  name: "priority",
  pure: false
})
export class PriorityPipe implements PipeTransform {
  transform(input: Task[], args) {
    var desiredPriority = args[0];
    if(desiredPriority === "High") {
      return input.filter((task) => {return task.priority === "High"});
    } else if (desiredPriority === "Medium") {
      return input.filter((task) => {return task.priority === "Medium"});
    } else if (desiredPriority === "Low") {
      return input.filter((task) => {return task.priority === "Low"});
    } else {
      return input;
    }
  }
}
