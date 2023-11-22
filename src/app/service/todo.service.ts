import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type todoType = {
  id: number;
  todo: string;
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private getApiUrl = 'http://34.91.132.189:3000/getData';
  private postApiUrl = 'http://34.91.132.189:3000/postData';
  private deleteApiUrl  = 'http://34.91.132.189:3000/deleteData';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<todoType[]> {
    return this.http.get<todoType[]>(this.getApiUrl);
  }

  addTask(newTask: string): Observable<todoType> {
    return this.http.post<todoType>(this.postApiUrl, {todo:newTask});
  }

  removeTask(taskId: number): Observable<any> {
    const url = `${this.deleteApiUrl}/${taskId}`;
    return this.http.delete(url);
  }
}
