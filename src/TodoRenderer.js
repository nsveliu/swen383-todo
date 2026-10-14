export class TodoRenderer {
  constructor(containerId) { this.container = document.getElementById(containerId); }
  renderPendingRows(service) { return service.tasks.filter((task) => !task.completed).map(buildTaskRow).join(''); }
  renderCompletedRows(service) { return service.tasks.filter((task) => task.completed).map(buildTaskRow).join(''); }
  render(service, justAddedId) {
    if (!this.container) return;
    const pending = this.renderPendingRows(service);
    const completed = this.renderCompletedRows(service);
    const oldest = service.tasks.find((task) => !task.completed)?.desc ?? 'none';
    this.container.innerHTML = `<p class="status">${summarizeWorkload(service)} - oldest: ${oldest}</p><h2 class="section-title">To do</h2><ul>${pending || '<li>Nothing pending. Add a task above.</li>'}</ul><h2 class="section-title">Completed</h2><ul>${completed || '<li>Nothing completed yet.</li>'}</ul>`;
    this.container.querySelectorAll('[data-toggle]').forEach((button) => button.addEventListener('click', () => { service.toggleComplete(Number(button.dataset.toggle)); this.render(service); }));
    this.container.querySelectorAll('[data-delete]').forEach((button) => button.addEventListener('click', () => { service.deleteTask(Number(button.dataset.delete)); this.render(service); }));
    if (justAddedId) this.container.querySelector(`[data-row="${justAddedId}"]`)?.classList.add('flash');
    document.title = `Todo (${service.tasks.filter((task) => !task.completed).length})`;
  }
}

function buildTaskRow(task) {
  const label = task.desc.length > 40 ? `${task.desc.slice(0, 40)}...` : task.desc;
  return `<li class="${task.completed ? 'completed' : ''}" data-row="${task.id}"><span class="task-desc ${task.priority === 'high' ? 'priority-high' : ''}">${label}</span><span class="task-time">${task.createdAt}</span><span class="task-actions"><button data-toggle="${task.id}">${task.completed ? 'Undo' : 'Done'}</button><button data-delete="${task.id}">Delete</button></span></li>`;
}
function summarizeWorkload(service) {
  const done = service.tasks.filter((task) => task.completed).length;
  const urgent = service.tasks.filter((task) => !task.completed && task.priority === 'high').length;
  const normal = service.tasks.filter((task) => !task.completed && task.priority !== 'high').length;
  return `${done}/${service.tasks.length} done - ${urgent} urgent, ${normal} normal remaining`;
}
