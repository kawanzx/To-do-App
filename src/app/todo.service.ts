import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importa HttpClient para fazer requisições HTTP
import { Observable } from 'rxjs';  // Importa Observable para trabalhar com respostas assíncronas

@Injectable({
  providedIn: 'root',  // O serviço é injetado em toda a aplicação
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/tasks';  // URL da API (alterar para o IP correto se necessário)

  constructor(private http: HttpClient) { }

  // Função para obter todas as tarefas
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Retorna um Observable com a lista de tarefas
  }

  // Função para adicionar uma nova tarefa
  addTask(task: { name: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);  // Envia uma requisição POST para adicionar a tarefa
  }

  // Função para atualizar uma tarefa existente
  updateTask(id: number, task: { name: string }): Observable<any> {
    const url = `${this.apiUrl}/${id}`;  // Concatena o ID da tarefa à URL
    return this.http.put<any>(url, task);  // Envia uma requisição PUT para atualizar a tarefa
  }

  // Função para deletar uma tarefa
  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;  // Concatena o ID da tarefa à URL
    return this.http.delete<any>(url);  // Envia uma requisição DELETE para remover a tarefa
  }
}
