(() => {
  const titleInput = document.getElementById('titleInput');
  const dateInput = document.getElementById('dateInput');
  const addBtn = document.getElementById('addBtn');
  const listEl = document.getElementById('list');
  const showCompleted = document.getElementById('showCompleted');
  const sortSelect = document.getElementById('sortSelect');

  const hasDesktopAPI = typeof window.todoAPI !== 'undefined';

  const storage = {
    async load() {
      if (hasDesktopAPI) return await window.todoAPI.loadTasks();
      const raw = localStorage.getItem('tasks');
      return raw ? JSON.parse(raw) : [];
    },
    async save(tasks) {
      if (hasDesktopAPI) return await window.todoAPI.saveTasks(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return { ok: true };
    },
  };

  let tasks = [];

  function uid() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function fmtDate(iso) {
    if (!iso) return '未設定到期日';
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function daysLeft(iso) {
    if (!iso) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(iso);
    due.setHours(0, 0, 0, 0);
    const diff = (due - today) / (1000 * 60 * 60 * 24);
    return Math.round(diff);
  }

  function sortTasks(arr) {
    const mode = sortSelect.value;
    const copy = [...arr];
    copy.sort((a, b) => {
      const ad = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const bd = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      if (mode === 'dueAsc') return ad - bd;
      if (mode === 'dueDesc') return bd - ad;
      return 0;
    });
    return copy;
  }

  function render() {
    const showDone = showCompleted.checked;
    const sorted = sortTasks(tasks);
    listEl.innerHTML = '';

    sorted.forEach((t) => {
      if (!showDone && t.completed) return;

      const item = document.createElement('div');
      item.className = 'item';

      const left = document.createElement('div');
      const title = document.createElement('div');
      title.className = 'item-title' + (t.completed ? ' completed' : '');
      title.textContent = t.title;

      const meta = document.createElement('div');
      meta.className = 'item-meta';
      const dl = daysLeft(t.dueDate);
      let badgeCls = 'neutral';
      let badgeText = '';
      if (dl === null) {
        badgeCls = 'neutral';
        badgeText = '未設定到期日';
      } else if (dl < 0) {
        badgeCls = 'danger';
        badgeText = `逾期 ${Math.abs(dl)} 天`;
      } else if (dl === 0) {
        badgeCls = 'warning';
        badgeText = '今天到期';
      } else if (dl <= 3) {
        badgeCls = 'warning';
        badgeText = `剩 ${dl} 天`;
      } else {
        badgeCls = 'neutral';
        badgeText = `剩 ${dl} 天`;
      }
      meta.innerHTML = `<span class="badge ${badgeCls}">${badgeText}</span> · 到期日：${fmtDate(t.dueDate)}`;

      left.appendChild(title);
      left.appendChild(meta);

      const actions = document.createElement('div');
      actions.className = 'item-actions';

      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'btn';
      toggleBtn.textContent = t.completed ? '標記未完成' : '標記完成';
      toggleBtn.addEventListener('click', async () => {
        t.completed = !t.completed;
        await storage.save(tasks);
        render();
      });

      const editDate = document.createElement('button');
      editDate.className = 'btn';
      editDate.textContent = '改到期日';
      editDate.addEventListener('click', async () => {
        const preset = t.dueDate ? fmtDate(t.dueDate) : '';
        const next = prompt('請輸入新到期日（YYYY-MM-DD，年份需四位），留空清除：', preset);
        if (next === null) return;
        const trimmed = next.trim();
        if (!trimmed) {
          t.dueDate = null;
        } else {
          const re = /^\d{4}-\d{2}-\d{2}$/;
          if (!re.test(trimmed)) {
            alert('請輸入正確格式：YYYY-MM-DD（年份四位數）');
            return;
          }
          const d = new Date(trimmed + 'T00:00:00');
          if (!isNaN(d)) t.dueDate = d.toISOString();
        }
        await storage.save(tasks);
        render();
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn';
      delBtn.textContent = '刪除';
      delBtn.addEventListener('click', async () => {
        tasks = tasks.filter((x) => x.id !== t.id);
        await storage.save(tasks);
        render();
      });

      actions.appendChild(toggleBtn);
      actions.appendChild(editDate);
      actions.appendChild(delBtn);

      item.appendChild(left);
      item.appendChild(document.createElement('div'));
      item.appendChild(actions);

      listEl.appendChild(item);
    });
  }

  addBtn.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const date = dateInput.value;
    if (!title) return;
    const dueISO = date ? new Date(date).toISOString() : null;
    const task = { id: uid(), title, dueDate: dueISO, completed: false };
    tasks.unshift(task);
    titleInput.value = '';
    dateInput.value = '';
    await storage.save(tasks);
    render();
  });

  sortSelect.addEventListener('change', render);
  showCompleted.addEventListener('change', render);

  (async function init() {
    tasks = await storage.load();
    render();
  })();
})();