// Shared task details overlay for Week and Month views.
const modalStyles = document.createElement('style');
modalStyles.textContent = `
.task,.week-task,.event{cursor:pointer}.task:hover,.week-task:hover{background:#f8faf7}.event:hover{filter:brightness(.96)}
.task-overlay{position:fixed;inset:0;background:#14251d66;display:none;justify-content:flex-end;z-index:20;backdrop-filter:blur(2px)}.task-overlay.open{display:flex}
.task-overlay{align-items:center;justify-content:center;padding:20px}
.task-dialog{width:min(520px,100%);height:auto;max-height:min(760px,calc(100vh - 40px));overflow:auto;background:#fff;box-shadow:0 24px 80px #14251d38;padding:30px;border-radius:18px;display:flex;flex-direction:column;animation:dialogin .18s ease-out}
@keyframes dialogin{from{transform:translateY(10px) scale(.985);opacity:.7}to{transform:translateY(0) scale(1);opacity:1}}
.dialog-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}.dialog-label{font-size:10px;font-weight:700;letter-spacing:1.4px;color:#77867b;text-transform:uppercase}
.dialog-close{width:36px;height:36px;border:1px solid #e8ece8;border-radius:10px;background:#fff;font-size:20px;color:#66746a}.dialog-title{font:700 26px Manrope;letter-spacing:-.7px;line-height:1.25;margin:13px 0 15px}
.dialog-desc{font-size:14px;line-height:1.7;color:#6e7b72}.dialog-impact{margin-top:24px;padding:15px;background:#eff5ed;border-radius:11px;color:#476b51;font-size:12px}
.dialog-facts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px}.dialog-fact{padding:13px;border:1px solid #e8ece8;border-radius:10px}.dialog-fact small{display:block;color:#88948c;font-size:10px;margin-bottom:6px}.dialog-fact strong{font-size:12px}
.dialog-actions{margin-top:24px;padding-top:10px;display:flex;flex-direction:column;gap:10px}.dialog-complete{border:0;border-radius:10px;background:#315f4d;color:#fff;padding:14px;font-weight:700}.dialog-complete:hover{background:#264e3d}.dialog-complete:disabled{background:#e9eee9;color:#627068;cursor:default}.dialog-link{text-align:center;color:#315f4d;font-size:11px;font-weight:600;text-decoration:none;padding:8px}
.month-calendar-title{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;padding:0 1px 6px;font:700 14px Manrope;color:#34483b}.month-calendar-title button{border:1px solid #e5eae4;background:#fff;border-radius:7px;padding:5px 9px;color:#486252}.month-weekday{text-align:center;padding:6px 2px;color:#8a958d;font-size:9px;font-weight:700;text-transform:uppercase}.cell.outside{background:#fafbf9;color:#b2bbb4}.cell.today{border-color:#9db49d;background:#f5f8f2}.event.done{text-decoration:line-through;opacity:.62}.event.overdue{background:#fff1df;color:#9a652e}.task-overdue{font-size:9px;font-weight:700;color:#a56f38;margin-top:5px}.task-group-label{margin:15px 21px 0;color:#78857b;font-size:10px;font-weight:700;letter-spacing:.8px;text-transform:uppercase}.task-group-label:first-child{margin-top:0}.calendar-date{display:flex;align-items:center;gap:7px}.calendar-date button{border:1px solid #e5eae4;background:white;border-radius:7px;padding:5px 8px;color:#486252}.empty-date{font-size:10px;color:#849087}
.event.preboarding{background:#f1eee7;color:#74684f}.week-task{display:block;cursor:pointer}.week-task:hover{border-color:#d5e1d5;box-shadow:0 2px 8px #203b2d0a}.week-task.overdue{border-color:#efd9ba;background:#fffaf3}.week-task-deadline{margin-top:5px;font-size:9px;color:#879188}.week-task.overdue .week-task-deadline{color:#a56f38;font-weight:700}.week-task.done .week-task-deadline{color:#9aa49c}
.roadmap-intro-copy{font-size:10px;color:#839087;line-height:1.5;margin:5px 0 0}.roadmap-status{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;padding:3px 18px 7px}.roadmap-panel{min-width:0;border:1px solid #e9ede8;border-radius:11px;padding:12px;background:#fff}.roadmap-panel.completed{background:#f6f9f5;border-color:#e1ebe0}.roadmap-panel.current{background:#fffdfa}.roadmap-panel.upcoming{background:#f8fafc;border-color:#e8edf0}.roadmap-panel-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}.roadmap-panel-head strong{font:700 11px Manrope;color:#34483b}.roadmap-panel-head span{font-size:9px;color:#839087;background:#fff;padding:4px 7px;border:1px solid #e9ede8;border-radius:20px;white-space:nowrap}.roadmap-panel.completed .roadmap-panel-head span{color:#527254}.roadmap-panel.current .roadmap-panel-head span{color:#9a6a2c}.roadmap-panel.upcoming .roadmap-panel-head span{color:#5e7180}.roadmap-items{display:flex;flex-direction:column;gap:6px}.roadmap-item{display:flex;align-items:flex-start;gap:7px;padding:6px 0;color:#56645a;font-size:10px;line-height:1.4;cursor:pointer}.roadmap-item:hover .roadmap-item-title{color:#315f4d;text-decoration:underline}.roadmap-item-mark{flex:none;color:#638365;font-size:11px;font-weight:700}.roadmap-panel.current .roadmap-item-mark{color:#a56f38}.roadmap-item-title{min-width:0;flex:1}.roadmap-item-state{flex:none;color:#88948c;font-size:8px;text-transform:uppercase;letter-spacing:.3px}.roadmap-item.in-progress .roadmap-item-state{color:#477357;font-weight:700}.roadmap-empty{font-size:10px;color:#939d95;padding:5px 0}.roadmap-more{font-size:9px;color:#829087;padding:2px 0}.roadmap-group-label{margin:7px 0 2px;font-size:8px;font-weight:700;color:#78857b;text-transform:uppercase;letter-spacing:.7px}.dialog-progress{border:1px solid #dce6dc;border-radius:9px;background:#f5f8f4;color:#315f4d;padding:12px;font-size:12px;font-weight:700}.dialog-progress:disabled{display:none}
@media(max-width:760px){.roadmap-status{grid-template-columns:1fr}.roadmap-panel{padding:11px}.roadmap-items{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:12px}}@media(max-width:480px){.roadmap-items{grid-template-columns:1fr}}
@media(max-width:600px){.task-dialog{padding:24px 20px;max-height:calc(100vh - 32px)}.dialog-top{margin-bottom:20px}.dialog-title{font-size:23px}}
`;
document.head.append(modalStyles);
document.body.insertAdjacentHTML('beforeend', `<div class="task-overlay" id="taskOverlay" aria-hidden="true"><section class="task-dialog" role="dialog" aria-modal="true" aria-labelledby="dialogTitle"><div class="dialog-top"><span class="dialog-label" id="dialogLabel">Task details</span><button class="dialog-close" id="dialogClose" aria-label="Close task details">×</button></div><div class="dialog-content"></div><div class="dialog-actions"><button class="dialog-progress" id="dialogProgress">Mark as In Progress</button><button class="dialog-complete" id="dialogComplete">Mark as Complete</button><a class="dialog-link" id="dialogLink" href="#" target="_blank" rel="noreferrer">Open task resource ↗</a></div></section></div>`);

const taskOverlay = document.getElementById('taskOverlay');
const dialogClose = document.getElementById('dialogClose');
const dialogComplete = document.getElementById('dialogComplete');
const dialogProgress = document.getElementById('dialogProgress');
const dialogLink = document.getElementById('dialogLink');
const taskContent = document.querySelector('.dialog-content');
function readSharedObject(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback}}
window.launchpadCurrentEmployee=(()=>{try{return localStorage.getItem('launchpad.currentEmployee')||'alex'}catch{return 'alex'}})();
window.launchpadEmployeeTasks=readSharedObject('launchpad.employeeTasks',{});
const validTaskDates=list=>Array.isArray(list)&&list.length>0&&list.every(task=>{if(!task||!/^\d{4}-\d{2}-\d{2}$/.test(task.dueDate||''))return false;const parsed=new Date(`${task.dueDate}T12:00:00`);return !Number.isNaN(parsed.getTime())&&`${parsed.getFullYear()}-${String(parsed.getMonth()+1).padStart(2,'0')}-${String(parsed.getDate()).padStart(2,'0')}`===task.dueDate;});
if(!validTaskDates(window.launchpadEmployeeTasks.alex)){const legacy=readSharedObject('launchpad.tasks',null);window.launchpadEmployeeTasks.alex=validTaskDates(legacy)?legacy:tasks.map(task=>({...task}));}
Object.keys(window.launchpadEmployeeTasks).forEach(id=>{if(!validTaskDates(window.launchpadEmployeeTasks[id]))delete window.launchpadEmployeeTasks[id];});
if(!validTaskDates(window.launchpadEmployeeTasks[window.launchpadCurrentEmployee]))window.launchpadCurrentEmployee='alex';
if(window.launchpadEmployeeTasks[window.launchpadCurrentEmployee])tasks.splice(0,tasks.length,...window.launchpadEmployeeTasks[window.launchpadCurrentEmployee]);
let monthCursor=new Date(new Date().getFullYear(),new Date().getMonth(),1);
const todayDate=()=>{const d=new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate(),12);};
const dateISO=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const parseISO=s=>new Date(`${s}T12:00:00`);
const mondayOf=d=>{const x=new Date(d);x.setDate(x.getDate()-((x.getDay()+6)%7));return x;};
const shortDate=d=>new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric'}).format(d);
function deadlineLabel(task){const d=parseISO(task.dueDate);return `${shortDate(d)} · ${task.dueTime==='23:59'?'11:59 PM':(task.dueTime||'11:59 PM')}`;}
function isLate(task){return task.status!=='done'&&Boolean(task.dueDate)&&new Date(`${task.dueDate}T${task.dueTime||'23:59'}:59`)<new Date();}
function publishSharedTasks(){window.launchpadEmployeeTasks[window.launchpadCurrentEmployee]=tasks.map(task=>({...task}));try{localStorage.setItem('launchpad.employeeTasks',JSON.stringify(window.launchpadEmployeeTasks));localStorage.setItem('launchpad.tasks',JSON.stringify(tasks));}catch{}window.dispatchEvent(new CustomEvent('launchpad:tasks-updated',{detail:{employeeId:window.launchpadCurrentEmployee,tasks:tasks.map(task=>({...task}))}}));}
window.launchpadPublishTasks=publishSharedTasks;
window.launchpadApplyTasks=(employeeId,nextTasks)=>{window.launchpadEmployeeTasks[employeeId]=nextTasks.map(task=>({...task}));try{localStorage.setItem('launchpad.employeeTasks',JSON.stringify(window.launchpadEmployeeTasks));}catch{}if(window.launchpadCurrentEmployee===employeeId){tasks.splice(0,tasks.length,...window.launchpadEmployeeTasks[employeeId]);draw();publishSharedTasks();}else window.dispatchEvent(new CustomEvent('launchpad:team-state-updated',{detail:{employeeId}}));};
window.launchpadChooseEmployee=employeeId=>{if(!window.launchpadEmployeeTasks[employeeId])return;window.launchpadCurrentEmployee=employeeId;try{localStorage.setItem('launchpad.currentEmployee',employeeId);}catch{}tasks.splice(0,tasks.length,...window.launchpadEmployeeTasks[employeeId]);draw();window.dispatchEvent(new CustomEvent('launchpad:tasks-updated',{detail:{employeeId,tasks:tasks.map(task=>({...task}))}}));};
window.addEventListener('storage',event=>{if(event.key==='launchpad.employeeTasks'&&event.newValue){try{window.launchpadEmployeeTasks=JSON.parse(event.newValue)||{};const shared=window.launchpadEmployeeTasks[window.launchpadCurrentEmployee];if(shared){tasks.splice(0,tasks.length,...shared);draw();window.dispatchEvent(new CustomEvent('launchpad:tasks-updated',{detail:{employeeId:window.launchpadCurrentEmployee,tasks:shared}}));}}catch{}}if(event.key==='launchpad.currentEmployee'&&event.newValue&&window.launchpadEmployeeTasks[event.newValue]){window.launchpadCurrentEmployee=event.newValue;tasks.splice(0,tasks.length,...window.launchpadEmployeeTasks[event.newValue]);draw();window.dispatchEvent(new CustomEvent('launchpad:tasks-updated',{detail:{employeeId:event.newValue,tasks:tasks.map(task=>({...task}))}}));}});

function openTask(id) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;
  taskOverlay.dataset.taskId = String(id);
  document.getElementById('dialogLabel').textContent = task.tag + ' · TASK DETAILS';
  taskContent.innerHTML = `<h2 class="dialog-title" id="dialogTitle">${task.title}</h2><p class="dialog-desc">${task.desc}</p><div class="dialog-impact">✦ &nbsp; ${task.impact}</div><div class="dialog-facts"><div class="dialog-fact"><small>TIME ESTIMATE</small><strong>◷ &nbsp; ${task.mins} minutes</strong></div><div class="dialog-fact"><small>DEADLINE</small><strong>▣ &nbsp; ${task.due}</strong></div></div>`;
  dialogComplete.textContent = task.status === 'done' ? 'Completed' : 'Mark as Complete';
  dialogComplete.disabled = task.status === 'done';
  dialogProgress.disabled = task.status==='done'||task.status==='in-progress';
  dialogProgress.textContent = task.status==='in-progress'?'In Progress':'Mark as In Progress';
  const resourceUrl=/^https?:\/\//i.test(task.link||'')?task.link:'';
  dialogLink.textContent = (resourceUrl?'Open task resource':'Resource details') + ' ↗';
  dialogLink.href = resourceUrl || '#';
  dialogLink.hidden = !resourceUrl;
  taskOverlay.classList.add('open');
  taskOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  dialogClose.focus();
}
function closeTask() {
  taskOverlay.classList.remove('open');
  taskOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
dialogClose.onclick = closeTask;
taskOverlay.onclick = event => { if (event.target === taskOverlay) closeTask(); };
document.addEventListener('keydown', event => { if (event.key === 'Escape' && taskOverlay.classList.contains('open')) closeTask(); });
dialogComplete.onclick = () => {
  const task = tasks.find(item => item.id === Number(taskOverlay.dataset.taskId));
  if (!task) return;
  if (task.status === 'done') return;
  task.status = 'done';
  publishSharedTasks();
  draw();
  closeTask();
  confettiBurst();
};
dialogProgress.onclick=()=>{const task=tasks.find(item=>item.id===Number(taskOverlay.dataset.taskId));if(!task||task.status==='done')return;task.status='in-progress';publishSharedTasks();draw();closeTask();};

const roadmapStatus=document.getElementById('roadmapStatus');
function roadmapTask(task,status){const mark=status==='done'?'✓':status==='in-progress'?'◒':'○';const state=status==='done'?'Completed':status==='in-progress'?'In progress':isLate(task)?'Overdue':'To do';return `<div class="roadmap-item ${status==='in-progress'?'in-progress':''}" data-task-id="${task.id}" tabindex="0" role="button" aria-label="Open task: ${escape(task.title)}"><span class="roadmap-item-mark">${mark}</span><span class="roadmap-item-title">${escape(task.title)}</span><span class="roadmap-item-state">${state}</span></div>`;}
function drawRoadmapStatus(){if(!roadmapStatus)return;const today=todayDate(),todayKey=dateISO(today),completed=tasks.filter(task=>task.status==='done').sort((a,b)=>b.dueDate.localeCompare(a.dueDate)),outstanding=tasks.filter(task=>task.status!=='done'&&(task.status==='in-progress'||task.dueDate<=todayKey)).sort((a,b)=>(a.status==='in-progress'?-1:0)-(b.status==='in-progress'?-1:0)||a.dueDate.localeCompare(b.dueDate)),future=tasks.filter(task=>task.status!=='done'&&task.status!=='in-progress'&&task.dueDate>todayKey).sort((a,b)=>a.dueDate.localeCompare(b.dueDate)),day=[],week=[],month=[];future.forEach(task=>{const delta=Math.ceil((parseISO(task.dueDate)-today)/86400000);(delta<=1?day:delta<=7?week:month).push(task);});const rows=(list,status,limit=3)=>list.slice(0,limit).map(task=>roadmapTask(task,status)).join('')+(list.length>limit?`<div class="roadmap-more">+ ${list.length-limit} more</div>`:'');roadmapStatus.innerHTML=`<section class="roadmap-panel completed"><div class="roadmap-panel-head"><strong>Completed · Past</strong><span>${completed.length} done</span></div><div class="roadmap-items">${completed.length?rows(completed,'done'):'<div class="roadmap-empty">Your completed milestones will appear here.</div>'}</div></section><section class="roadmap-panel current"><div class="roadmap-panel-head"><strong>Outstanding · Present</strong><span>${outstanding.length} to do</span></div><div class="roadmap-items">${outstanding.length?rows(outstanding,'todo',4):'<div class="roadmap-empty">Nothing needs your attention right now.</div>'}</div></section><section class="roadmap-panel upcoming"><div class="roadmap-panel-head"><strong>Coming Up · Future</strong><span>${future.length} ahead</span></div><div class="roadmap-items">${day.length?`<div class="roadmap-group-label">Day · Next 24 hours</div>${rows(day,'todo',2)}`:''}${week.length?`<div class="roadmap-group-label">Week · Next 7 days</div>${rows(week,'todo',2)}`:''}${month.length?`<div class="roadmap-group-label">Month · Later milestones</div>${rows(month,'todo',2)}`:''}${future.length?'':'<div class="roadmap-empty">No upcoming tasks yet.</div>'}</div></section>`;}

function draw() {
  const today=todayDate(),todayKey=dateISO(today),weekStart=mondayOf(today),weekEnd=new Date(weekStart);weekEnd.setDate(weekEnd.getDate()+6);const startKey=dateISO(weekStart),endKey=dateISO(weekEnd);
  const shown = tasks.filter(task => view === 'day' ? task.phase==='preboarding'||task.timeline==='Before Day 1'||task.dueDate===todayKey||(task.status!=='done'&&task.dueDate<todayKey) : view === 'week' ? task.dueDate>=startKey&&task.dueDate<=endKey : false);
  drawRoadmapStatus();
  taskList.style.display = view === 'month' ? 'none' : 'block';
  monthGrid.style.display = view === 'month' ? 'grid' : 'none';
  const monthTitle=new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric'}).format(monthCursor);
  const monthFirst=new Date(monthCursor.getFullYear(),monthCursor.getMonth(),1,12),gridStart=mondayOf(monthFirst);
  const monthDays=Array.from({length:42},(_,i)=>{const d=new Date(gridStart);d.setDate(d.getDate()+i);const key=dateISO(d),events=tasks.filter(task=>task.dueDate===key);return `<div class="cell ${d.getMonth()!==monthCursor.getMonth()?'outside':''} ${key===todayKey?'today':''}"><b>${d.getDate()}</b>${events.map(task=>`<div class="event ${task.status==='done'?'done':''} ${isLate(task)?'overdue':''} ${task.phase==='preboarding'||task.timeline==='Before Day 1'?'preboarding':''}" data-task-id="${task.id}" title="${task.title} · ${deadlineLabel(task)}">${task.phase==='preboarding'||task.timeline==='Before Day 1'?'Pre · ':''}${task.status==='done'?'✓ ':''}${task.title}${isLate(task)?' · Late':''}</div>`).join('')}</div>`;});
  monthGrid.innerHTML=`<div class="month-calendar-title"><button type="button" data-month="prev" aria-label="Previous month">‹</button><span>${monthTitle}</span><button type="button" data-month="next" aria-label="Next month">›</button></div>${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day=>`<div class="month-weekday">${day}</div>`).join('')}${monthDays.join('')}`;
  monthGrid.querySelector('[data-month="prev"]').onclick=()=>{monthCursor=new Date(monthCursor.getFullYear(),monthCursor.getMonth()-1,1);draw();};monthGrid.querySelector('[data-month="next"]').onclick=()=>{monthCursor=new Date(monthCursor.getFullYear(),monthCursor.getMonth()+1,1);draw();};
  const dateLabel=document.getElementById('calendarDate');if(dateLabel)dateLabel.innerHTML=view==='day'?shortDate(today).toUpperCase():view==='week'?`${shortDate(weekStart)} – ${shortDate(weekEnd)}`:'';
  const taskMarkup=task=>`<article class="task ${task.status==='done'?'done':''}" data-id="${task.id}"><button class="check" aria-label="${task.status==='done'?'Mark incomplete':'Mark complete'}">${task.status==='done'?'<svg viewBox="0 0 16 16" fill="none"><path d="m3 8 3 3 7-7" stroke="currentColor" stroke-width="2"/></svg>':''}</button><div><div class="task-title">${task.title} <span class="tag">${task.tag}</span></div><div class="task-desc">${task.desc}</div><div class="task-meta"><span>◷ ${task.mins} min</span><span>▣ Due ${deadlineLabel(task)}</span><span class="impact">✦ ${task.impact}</span></div>${isLate(task)?'<div class="task-overdue">⚠ OVERDUE · CHECK IN WITH YOUR MANAGER</div>':''}</div><a href="#" class="task-action">${task.link} ↗</a></article>`;
  const preboarding=shown.filter(task=>task.phase==='preboarding'||task.timeline==='Before Day 1'||task.tag==='PRE-BOARDING'),onboarding=shown.filter(task=>!preboarding.includes(task));
  taskList.innerHTML=shown.length?`${preboarding.length?`<div class="task-group-label">Pre-boarding · Before Day 1</div>${preboarding.map(taskMarkup).join('')}`:''}${onboarding.length?`${preboarding.length?'<div class="task-group-label">Onboarding</div>':''}${onboarding.map(taskMarkup).join('')}`:''}`:'<div class="empty">🌿<strong>All caught up!</strong>No tasks due today or overdue.</div>';
  if (view === 'week') {
    taskList.innerHTML = `<div class="week-board">${Array.from({length:7},(_,index)=>{const date=new Date(weekStart);date.setDate(date.getDate()+index);const key=dateISO(date),dayTasks=tasks.filter(task=>task.dueDate===key);return `<section class="week-day ${key===todayKey?'is-today':''}"><div class="week-day-head"><strong>${new Intl.DateTimeFormat('en-US',{weekday:'short'}).format(date)}${key===todayKey?' · Today':''}</strong><span>${new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric'}).format(date)}</span></div>${dayTasks.length?dayTasks.map(task=>`<div class="week-task ${task.status==='done'?'done':''} ${isLate(task)?'overdue':''}" data-id="${task.id}"><div class="week-task-name">${task.status==='done'?'✓ ':''}${task.title}</div><div class="week-task-deadline">${deadlineLabel(task)}${isLate(task)?' · Late':''}</div></div>`).join(''):'<div class="week-empty">No tasks scheduled</div>'}</section>`;}).join('')}</div>`;
  }
  document.querySelectorAll('.check').forEach(button => button.onclick = event => {
    event.stopPropagation();
    const task = tasks.find(item => item.id === Number(button.closest('[data-id]').dataset.id));
    task.status = task.status === 'done' ? 'todo' : 'done';
    publishSharedTasks();
    draw();
    if (task.status === 'done') confettiBurst();
  });
  document.querySelectorAll('.task,.week-task,.event,.roadmap-item').forEach(card => {card.onclick = event => {
    if (event.target.closest('.check') || event.target.closest('.task-action')) return;
    openTask(Number(card.dataset.id || card.dataset.taskId));
  };card.onkeydown=event=>{if((event.key==='Enter'||event.key===' ')&&card.classList.contains('roadmap-item')){event.preventDefault();openTask(Number(card.dataset.taskId));}};});
  progress();
}
draw();
