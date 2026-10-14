import { LocalStorageHandler } from './LocalStorageHandler.js';
import { TodoRenderer } from './TodoRenderer.js';
import { TodoService } from './TodoService.js';
import { TodoController } from './TodoController.js';

const service = new TodoService(new LocalStorageHandler());
const renderer = new TodoRenderer('task-container');
const controller = new TodoController(service, renderer);
controller.start();
const input = document.getElementById('task-input');
function add(type) { if (controller.addTask(input.value, type)) input.value = ''; }
document.getElementById('add-task-btn').addEventListener('click', () => add('simple'));
document.getElementById('add-urgent-btn').addEventListener('click', () => add('urgent'));
input.addEventListener('keydown', (event) => { if (event.key === 'Enter') document.getElementById('add-task-btn').click(); });
