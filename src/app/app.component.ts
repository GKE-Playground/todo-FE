import { Component, OnInit } from '@angular/core';
import { TodoService } from './service/todo.service';

type TodoType = {
  id: number;
  todo: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: TodoType[] = [];
  newTask: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.todoService.getTasks().subscribe(
      (tasks: TodoType[]) => {
        this.tasks = tasks;
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.todoService.addTask(this.newTask.trim()).subscribe((newTask: TodoType) => {
        console.log('Task added:', newTask);
        this.fetchTasks();
      });
      this.newTask = '';
    }
  }

  removeTask(index: number) {
    const taskIdToDelete = this.tasks[index].id;

    this.todoService.removeTask(taskIdToDelete).subscribe(
      () => {
        console.log('Task removed successfully');
        this.fetchTasks();
      },
      (error: any) => {
        console.error('Error removing task:', error);
      }
    );
  }
}
