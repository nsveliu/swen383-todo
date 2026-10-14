import { LocalStorageHandler } from './LocalStorageHandler.js';
import { TodoRenderer } from './TodoRenderer.js';
import { TodoService } from './TodoService.js';

const service = new TodoService(new LocalStorageHandler());
const renderer = new TodoRenderer('task-container');
renderer.render(service);
const input = document.getElementById('task-input');
function add(type) { const id = service.addTask(input.value, type); if (id) { input.value = ''; renderer.render(service, id); } }
document.getElementById('add-task-btn').addEventListener('click', () => add('simple'));
document.getElementById('add-urgent-btn').addEventListener('click', () => add('urgent'));
input.addEventListener('keydown', (event) => { if (event.key === 'Enter') document.getElementById('add-task-btn').click(); });
