import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';  // Importa o serviço de tarefas

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  tasks: any[] = [];  // Armazena a lista de tarefas
  newTask: string = '';  // Controla a nova tarefa inserida
  editingTask: any = null;  // Controla a tarefa que está sendo editada

  constructor(private todoService: TodoService) { }

  // Método chamado ao inicializar a página
  ngOnInit() {
    this.getTasks();  // Carrega as tarefas ao iniciar a página
  }

  // Carrega todas as tarefas do servidor
  getTasks() {
    this.todoService.getTasks().subscribe((data) => {
      this.tasks = data;  // Atualiza a lista de tarefas com os dados recebidos
    }, (error) => {
      console.error('Erro ao carregar tarefas:', error);
    });
  }

  // Adiciona uma nova tarefa
  addTask() {
    if (this.newTask.trim().length === 0) return;  // Verifica se o campo de nova tarefa está vazio
    const task = { name: this.newTask };  // Cria um objeto com o nome da nova tarefa

    this.todoService.addTask(task).subscribe(() => {
      this.getTasks();  // Atualiza a lista de tarefas após adicionar uma nova
      this.newTask = '';  // Limpa o campo de nova tarefa
    }, (error) => {
      console.error('Erro ao adicionar tarefa:', error);
    });
  }

  // Inicia o modo de edição para uma tarefa específica
  editTask(task: any) {
    this.editingTask = { ...task };  // Cria uma cópia da tarefa para ser editada
  }

  // Cancela o modo de edição
  cancelEdit() {
    this.editingTask = null;  // Define null para sair do modo de edição
  }

  // Atualiza a tarefa no servidor
  updateTask() {
    if (!this.editingTask) return;

    this.todoService.updateTask(this.editingTask.id, this.editingTask).subscribe(() => {
      this.getTasks();  // Atualiza a lista de tarefas após a edição
      this.editingTask = null;  // Sai do modo de edição
    }, (error) => {
      console.error('Erro ao atualizar tarefa:', error);
    });
  }

  // Deleta uma tarefa pelo ID
  deleteTask(id: number) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.getTasks();  // Atualiza a lista de tarefas após a exclusão
    }, (error) => {
      console.error('Erro ao deletar tarefa:', error);
    });
  }
}
