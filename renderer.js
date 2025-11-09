(() => {
  // i18n translations
  const translations = {
    'zh-Hant': {
      app_title: '待辦清單',
      input_placeholder: '輸入待辦事項...',
      add_button: '加入',
      show_completed: '顯示已完成',
      sort_due_asc: '到期日（近→遠）',
      sort_due_desc: '到期日（遠→近）',
      no_due: '未設定到期日',
      overdue_days: '逾期 {n} 天',
      due_today: '今天到期',
      days_left: '剩 {n} 天',
      weeks_left: '剩 {n} 週',
      due_date_label: '到期日：{date}',
      mark_complete: '標記完成',
      mark_incomplete: '標記未完成',
      edit_due: '改到期日',
      prompt_edit_due: '請輸入新到期日（YYYY-MM-DD，年份需四位），留空清除：',
      alert_date_format: '請輸入正確格式：YYYY-MM-DD（年份四位數）',
      no_due_option: '不限期',
      delete: '刪除',
      footer_copyright: '© 2025 版權所有',
    },
    en: {
      app_title: 'To‑Do List',
      input_placeholder: 'Enter a task...',
      add_button: 'Add',
      show_completed: 'Show completed',
      sort_due_asc: 'Due date (near → far)',
      sort_due_desc: 'Due date (far → near)',
      no_due: 'No due date',
      overdue_days: 'Overdue {n} days',
      due_today: 'Due today',
      days_left: '{n} days left',
      weeks_left: '{n} weeks left',
      due_date_label: 'Due date: {date}',
      mark_complete: 'Mark complete',
      mark_incomplete: 'Mark incomplete',
      edit_due: 'Edit due date',
      prompt_edit_due: 'Enter new due date (YYYY-MM-DD, 4-digit year). Leave blank to clear:',
      alert_date_format: 'Please enter correct format: YYYY-MM-DD (4-digit year)',
      no_due_option: 'No due date',
      delete: 'Delete',
      footer_copyright: '© 2025 All rights reserved',
    },
    ja: {
      app_title: 'やることリスト',
      input_placeholder: 'タスクを入力...',
      add_button: '追加',
      show_completed: '完了を表示',
      sort_due_asc: '期限（近い→遠い）',
      sort_due_desc: '期限（遠い→近い）',
      no_due: '期限未設定',
      overdue_days: '{n}日遅延',
      due_today: '本日が期限',
      days_left: '残り{n}日',
      weeks_left: '残り{n}週',
      due_date_label: '期限：{date}',
      mark_complete: '完了にする',
      mark_incomplete: '未完了にする',
      edit_due: '期限を変更',
      prompt_edit_due: '新しい期限を入力（YYYY-MM-DD、年は4桁）。空欄でクリア：',
      alert_date_format: '正しい形式で入力してください：YYYY-MM-DD（年は4桁）',
      no_due_option: '期限なし',
      delete: '削除',
      footer_copyright: '© 2025 著作権所有',
    },
    ko: {
      app_title: '할 일 목록',
      input_placeholder: '할 일을 입력...',
      add_button: '추가',
      show_completed: '완료 항목 표시',
      sort_due_asc: '마감일 (가까움→먼)',
      sort_due_desc: '마감일 (멀음→가까움)',
      no_due: '마감일 없음',
      overdue_days: '{n}일 지연',
      due_today: '오늘 마감',
      days_left: '남은 {n}일',
      weeks_left: '남은 {n}주',
      due_date_label: '마감일: {date}',
      mark_complete: '완료로 표시',
      mark_incomplete: '미완료로 표시',
      edit_due: '마감일 변경',
      prompt_edit_due: '새 마감일을 입력하세요 (YYYY-MM-DD, 연도 4자리). 비우면 삭제:',
      alert_date_format: '올바른 형식을 입력하세요: YYYY-MM-DD (연도 4자리)',
      no_due_option: '마감일 없음',
      delete: '삭제',
      footer_copyright: '© 2025 판권 소유',
    },
    'zh-Hans': {
      app_title: '待办清单',
      input_placeholder: '输入待办事项...',
      add_button: '添加',
      show_completed: '显示已完成',
      sort_due_asc: '到期日（近→远）',
      sort_due_desc: '到期日（远→近）',
      no_due: '未设置到期日',
      overdue_days: '逾期 {n} 天',
      due_today: '今天到期',
      days_left: '剩余 {n} 天',
      weeks_left: '剩余 {n} 周',
      due_date_label: '到期日：{date}',
      mark_complete: '标记完成',
      mark_incomplete: '标记未完成',
      edit_due: '修改到期日',
      prompt_edit_due: '请输入新到期日（YYYY-MM-DD，年份需四位），留空清除：',
      alert_date_format: '请输入正确格式：YYYY-MM-DD（年份四位数）',
      no_due_option: '不限期',
      delete: '删除',
      footer_copyright: '© 2025 版权所有',
    },
    fr: {
      app_title: 'Liste de tâches',
      input_placeholder: 'Saisir une tâche...',
      add_button: 'Ajouter',
      show_completed: 'Afficher les terminées',
      sort_due_asc: 'Échéance (proche → lointain)',
      sort_due_desc: 'Échéance (lointain → proche)',
      no_due: 'Pas d’échéance',
      overdue_days: '{n} jours de retard',
      due_today: 'Échéance aujourd’hui',
      days_left: 'Il reste {n} jours',
      weeks_left: 'Il reste {n} semaines',
      due_date_label: 'Échéance : {date}',
      mark_complete: 'Marquer terminé',
      mark_incomplete: 'Marquer non terminé',
      edit_due: 'Modifier l’échéance',
      prompt_edit_due: 'Entrez la nouvelle date (YYYY-MM-DD, année 4 chiffres). Vide pour effacer :',
      alert_date_format: 'Veuillez saisir le format correct : YYYY-MM-DD (année 4 chiffres)',
      no_due_option: 'Sans échéance',
      delete: 'Supprimer',
      footer_copyright: '© 2025 Tous droits réservés',
    },
    de: {
      app_title: 'Aufgabenliste',
      input_placeholder: 'Aufgabe eingeben...',
      add_button: 'Hinzufügen',
      show_completed: 'Erledigte anzeigen',
      sort_due_asc: 'Fällig (nah → fern)',
      sort_due_desc: 'Fällig (fern → nah)',
      no_due: 'Kein Fälligkeitsdatum',
      overdue_days: '{n} Tage überfällig',
      due_today: 'Heute fällig',
      days_left: 'Noch {n} Tage',
      weeks_left: 'Noch {n} Wochen',
      due_date_label: 'Fällig am: {date}',
      mark_complete: 'Als erledigt markieren',
      mark_incomplete: 'Als unerledigt markieren',
      edit_due: 'Fälligkeitsdatum ändern',
      prompt_edit_due: 'Neues Datum eingeben (YYYY-MM-DD, Jahr 4-stellig). Leer zum Löschen:',
      alert_date_format: 'Bitte korrektes Format eingeben: YYYY-MM-DD (Jahr 4-stellig)',
      no_due_option: 'Kein Fälligkeitsdatum',
      delete: 'Löschen',
      footer_copyright: '© 2025 Alle Rechte vorbehalten',
    },
    ru: {
      app_title: 'Список дел',
      input_placeholder: 'Введите задачу...',
      add_button: 'Добавить',
      show_completed: 'Показывать выполненные',
      sort_due_asc: 'Срок (близкий → дальний)',
      sort_due_desc: 'Срок (дальний → близкий)',
      no_due: 'Срок не задан',
      overdue_days: 'Просрочено на {n} дн.',
      due_today: 'Срок сегодня',
      days_left: 'Осталось {n} дн.',
      weeks_left: 'Осталось {n} нед.',
      due_date_label: 'Срок: {date}',
      mark_complete: 'Отметить выполнено',
      mark_incomplete: 'Отметить невыполнено',
      edit_due: 'Изменить срок',
      prompt_edit_due: 'Введите новую дату (YYYY-MM-DD, год из 4 цифр). Пусто — очистить:',
      alert_date_format: 'Введите верный формат: YYYY-MM-DD (год из 4 цифр)',
      no_due_option: 'Без срока',
      delete: 'Удалить',
      footer_copyright: '© 2025 Все права защищены',
    },
  };

  function pickDefaultLang() {
    const saved = localStorage.getItem('lang');
    if (saved && translations[saved]) return saved;
    const nav = (navigator.language || 'zh-Hant').toLowerCase();
    if (nav.startsWith('zh')) return nav.includes('hans') ? 'zh-Hans' : 'zh-Hant';
    const code = nav.slice(0, 2);
    return translations[code] ? code : 'en';
  }

  function t(key, params = {}) {
    const dict = translations[currentLang] || translations['en'];
    let s = dict[key] || key;
    Object.keys(params).forEach((k) => {
      s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(params[k]));
    });
    return s;
  }

  const titleInput = document.getElementById('titleInput');
  const dateInput = document.getElementById('dateInput');
  const addBtn = document.getElementById('addBtn');
  const listEl = document.getElementById('list');
  const showCompleted = document.getElementById('showCompleted');
  const sortSelect = document.getElementById('sortSelect');
  const showCompletedLabel = document.getElementById('showCompletedLabel');
  const headerTitle = document.getElementById('headerTitle');
  const optDueAsc = document.getElementById('optDueAsc');
  const optDueDesc = document.getElementById('optDueDesc');
  const footerText = document.getElementById('footerText');
  const langSelect = document.getElementById('langSelect');
  const noDueInput = document.getElementById('noDueInput');
  const noDueLabel = document.getElementById('noDueLabel');
  // Modal elements for editing due date
  const dueModal = document.getElementById('dueModal');
  const dueModalTitle = document.getElementById('dueModalTitle');
  const dueModalLabel = document.getElementById('dueModalLabel');
  const dueModalInput = document.getElementById('dueModalInput');
  const dueModalCancel = document.getElementById('dueModalCancel');
  const dueModalConfirm = document.getElementById('dueModalConfirm');
  const dueModalNoDue = document.getElementById('dueModalNoDue');
  const dueModalNoDueLabel = document.getElementById('dueModalNoDueLabel');
  let editingTask = null;

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
  let currentLang = pickDefaultLang();

  function applyI18n() {
    document.documentElement.lang = currentLang;
    headerTitle.textContent = t('app_title');
    titleInput.placeholder = t('input_placeholder');
    addBtn.textContent = t('add_button');
    showCompletedLabel.textContent = t('show_completed');
    optDueAsc.textContent = t('sort_due_asc');
    optDueDesc.textContent = t('sort_due_desc');
    footerText.textContent = t('footer_copyright');
    if (langSelect) langSelect.value = currentLang;
    // Modal i18n (keep buttons static for now)
    if (dueModalTitle) dueModalTitle.textContent = t('edit_due');
    if (dueModalLabel) dueModalLabel.textContent = t('prompt_edit_due');
    if (noDueLabel) noDueLabel.textContent = t('no_due_option');
    if (dueModalNoDueLabel) dueModalNoDueLabel.textContent = t('no_due_option');
  }

  function uid() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function fmtDate(iso) {
    if (!iso) return t('no_due');
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

  function weeksLeft(days) {
    if (days == null) return null;
    if (days < 7) return null;
    return Math.ceil(days / 7);
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

  function purgeExpiredClient(arr) {
    const kept = arr.filter((t) => {
      if (!t || !t.dueDate) return true;
      const dl = daysLeft(t.dueDate);
      return !(dl < 0 && !t.completed);
    });
    return kept;
  }

  function render() {
    const showDone = showCompleted.checked;
    const sorted = sortTasks(tasks);
    listEl.innerHTML = '';

    sorted.forEach((task) => {
      if (!showDone && task.completed) return;

      const item = document.createElement('div');
      item.className = 'item';

      const left = document.createElement('div');
      const title = document.createElement('div');
      title.className = 'item-title' + (task.completed ? ' completed' : '');
      title.textContent = task.title;

      const meta = document.createElement('div');
      meta.className = 'item-meta';
      const dl = daysLeft(task.dueDate);
      let badgeCls = 'neutral';
      let badgeText = '';
      if (dl === null) {
        badgeCls = 'neutral';
        badgeText = t('no_due');
      } else if (dl < 0) {
        badgeCls = 'danger';
        badgeText = t('overdue_days', { n: Math.abs(dl) });
      } else if (dl === 0) {
        badgeCls = 'warning';
        badgeText = t('due_today');
      } else if (dl <= 3) {
        badgeCls = 'warning';
        badgeText = t('days_left', { n: dl });
      } else if (weeksLeft(dl)) {
        badgeCls = 'neutral';
        badgeText = t('weeks_left', { n: weeksLeft(dl) });
      } else {
        badgeCls = 'neutral';
        badgeText = t('days_left', { n: dl });
      }
      meta.innerHTML = `<span class="badge ${badgeCls}">${badgeText}</span> · ${t('due_date_label', { date: fmtDate(task.dueDate) })}`;

      left.appendChild(title);
      left.appendChild(meta);

      const actions = document.createElement('div');
      actions.className = 'item-actions';

      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'btn';
      toggleBtn.textContent = task.completed ? t('mark_incomplete') : t('mark_complete');
      toggleBtn.addEventListener('click', async () => {
        task.completed = !task.completed;
        await storage.save(tasks);
        render();
      });

      const editDate = document.createElement('button');
      editDate.className = 'btn';
      editDate.textContent = t('edit_due');
      editDate.addEventListener('click', () => {
        openDueModal(task);
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn';
      delBtn.textContent = t('delete');
      delBtn.addEventListener('click', async () => {
        tasks = tasks.filter((x) => x.id !== task.id);
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

  function openDueModal(task) {
    editingTask = task;
    const preset = task && task.dueDate ? fmtDate(task.dueDate) : '';
    if (dueModalInput) dueModalInput.value = preset;
    if (dueModalNoDue) {
      const isNoDue = !task || !task.dueDate;
      dueModalNoDue.checked = isNoDue;
      if (dueModalInput) dueModalInput.disabled = isNoDue;
    }
    if (dueModal) {
      dueModal.style.display = 'flex';
      dueModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeDueModal() {
    editingTask = null;
    if (dueModalInput) dueModalInput.value = '';
    if (dueModal) {
      dueModal.style.display = 'none';
      dueModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (dueModalCancel) {
    dueModalCancel.addEventListener('click', () => closeDueModal());
  }

  if (dueModalConfirm) {
    dueModalConfirm.addEventListener('click', async () => {
      if (!editingTask) { closeDueModal(); return; }
      const noDue = dueModalNoDue && dueModalNoDue.checked;
      const next = (dueModalInput && dueModalInput.value) ? dueModalInput.value.trim() : '';
      if (!next || noDue) {
        editingTask.dueDate = null;
      } else {
        const re = /^\d{4}-\d{2}-\d{2}$/;
        if (!re.test(next)) {
          alert(t('alert_date_format'));
          return;
        }
        const d = new Date(next + 'T00:00:00');
        if (!isNaN(d)) editingTask.dueDate = d.toISOString();
      }
      await storage.save(tasks);
      closeDueModal();
      render();
    });
  }

  if (dueModalNoDue) {
    dueModalNoDue.addEventListener('change', () => {
      const checked = dueModalNoDue.checked;
      if (dueModalInput) {
        dueModalInput.disabled = checked;
        if (checked) dueModalInput.value = '';
      }
    });
  }

  if (noDueInput) {
    noDueInput.addEventListener('change', () => {
      const checked = noDueInput.checked;
      dateInput.disabled = checked;
      if (checked) dateInput.value = '';
    });
  }

  addBtn.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const date = dateInput.value;
    if (!title) return;
    const dueISO = (!noDueInput || !noDueInput.checked) && date ? new Date(date).toISOString() : null;
    const task = { id: uid(), title, dueDate: dueISO, completed: false };
    tasks.unshift(task);
    titleInput.value = '';
    dateInput.value = '';
    if (noDueInput) noDueInput.checked = false;
    dateInput.disabled = false;
    await storage.save(tasks);
    render();
  });

  sortSelect.addEventListener('change', render);
  showCompleted.addEventListener('change', render);

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      currentLang = e.target.value;
      localStorage.setItem('lang', currentLang);
      applyI18n();
      render();
    });
  }

  (async function init() {
    tasks = await storage.load();
    // 若在瀏覽器預覽（localStorage）時，也執行客端逾期清理
    const cleaned = purgeExpiredClient(tasks);
    if (cleaned.length !== tasks.length) {
      tasks = cleaned;
      await storage.save(tasks);
    }
    applyI18n();
    render();
  })();
})();