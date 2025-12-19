const state = {
  content: null,
  filters: {
    tag: 'all',
    search: ''
  }
};

const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

async function loadContent() {
  try {
    const res = await fetch('content.json');
    if (!res.ok) throw new Error('Unable to load content.json');
    state.content = await res.json();
    renderPage();
  } catch (err) {
    console.error(err);
    showToast('Could not load content.json. Please ensure it exists.', 'error');
  }
}

function renderPage() {
  const { profile, about, skills, works, timeline, sections } = state.content;
  renderProfile(profile);
  renderAbout(about, skills, sections?.about !== false);
  renderWorks(works, sections?.works !== false);
  renderTimeline(timeline, sections?.timeline !== false);
  renderContact(profile, sections?.contact !== false);
  bindControls();
}

function renderProfile(profile) {
  qs('#hero-name').textContent = profile.name || 'Your Name';
  qs('#hero-tagline').textContent = profile.tagline || '';
  qs('#hero-location').textContent = profile.location || '';
  qs('#status-pill').textContent = profile.status || '';
  qs('#btn-email').href = profile.email ? `mailto:${profile.email}` : '#';
  qs('#btn-cv').href = profile.cv || '#';

  const socialsWrap = qs('#hero-socials');
  socialsWrap.innerHTML = '';
  (profile.socials || []).forEach((s) => {
    const link = document.createElement('a');
    link.className = 'btn secondary';
    link.href = s.url || '#';
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    link.textContent = s.label || 'Link';
    socialsWrap.appendChild(link);
  });
}

function renderAbout(about, show) {
  const section = qs('#about');
  if (!show) return section.remove();
  qs('#about-bio').textContent = about?.bio || '';

  const highlightList = qs('#about-highlights');
  highlightList.innerHTML = '';
  (about?.highlights || []).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    highlightList.appendChild(li);
  });

  const factsGrid = qs('#quick-facts');
  factsGrid.innerHTML = '';
  (about?.quickFacts || []).forEach((fact) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div class="fact-title">${fact.title || ''}</div><div class="muted">${fact.detail || ''}</div>`;
    factsGrid.appendChild(card);
  });

  const skillWrap = qs('#skill-pills');
  skillWrap.innerHTML = '';
  (about?.skills || state.content.skills || []).forEach((sk) => {
    const span = document.createElement('span');
    span.className = 'pill';
    span.textContent = sk;
    skillWrap.appendChild(span);
  });
}

function renderWorks(works = [], show) {
  const section = qs('#works');
  if (!show) return section.remove();
  state.works = works;
  buildTagFilters(works);
  filterAndRenderCards();
}

function buildTagFilters(works) {
  const wrap = qs('#tag-filters');
  wrap.innerHTML = '';
  const allTags = new Set();
  works.forEach((w) => (w.tags || []).forEach((t) => allTags.add(t)));
  const tags = ['all', ...Array.from(allTags).sort()];
  tags.forEach((tag) => {
    const btn = document.createElement('button');
    btn.className = 'tag-btn' + (tag === state.filters.tag ? ' active' : '');
    btn.dataset.tag = tag;
    btn.textContent = tag === 'all' ? 'All' : tag;
    wrap.appendChild(btn);
  });
}

function filterAndRenderCards() {
  const featuredRow = qs('#featured-row');
  const grid = qs('#work-grid');
  featuredRow.innerHTML = '';
  grid.innerHTML = '';
  const search = state.filters.search.toLowerCase();
  const tag = state.filters.tag;

  const filtered = state.works.filter((w) => {
    const matchesTag = tag === 'all' || (w.tags || []).includes(tag);
    const matchesSearch = [w.title, w.shortDesc, w.longDesc, (w.tags || []).join(' ')].some((field) =>
      (field || '').toLowerCase().includes(search)
    );
    return matchesTag && matchesSearch;
  });

  const featured = filtered.filter((w) => w.highlight);
  const regular = filtered.filter((w) => !w.highlight);

  if (featured.length) {
    qs('#featured-block').style.display = 'block';
    featured.forEach((item) => featuredRow.appendChild(buildWorkCard(item, true)));
  } else {
    qs('#featured-block').style.display = 'none';
  }

  if (!regular.length && !featured.length) {
    grid.innerHTML = '<p class="muted">No projects match the current filters.</p>';
    return;
  }

  regular.forEach((item) => grid.appendChild(buildWorkCard(item)));
}

function buildWorkCard(item, isFeatured = false) {
  const card = document.createElement('div');
  card.className = 'card work-card';
  card.innerHTML = `
    <div class="work-meta">${item.year ? `<span>${item.year}</span>` : ''}${isFeatured ? '<span class="badge">Featured</span>' : ''}</div>
    <h3>${item.title || ''}</h3>
    <p class="muted">${item.shortDesc || ''}</p>
    <div class="tag-list">${(item.tags || []).map((t) => `<span class="tag">${t}</span>`).join('')}</div>
    <div class="actions" style="margin-top:0.8rem;">
      <button class="btn secondary" data-view>View details</button>
      ${(item.links && item.links[0]) ? `<a class="btn ghost" href="${item.links[0].url}" target="_blank" rel="noreferrer noopener">${item.links[0].label || 'Open link'}</a>` : '<span class="muted">No link provided</span>'}
    </div>
  `;
  card.querySelector('[data-view]').addEventListener('click', () => openModal(item));
  return card;
}

function renderTimeline(timeline = [], show) {
  const section = qs('#timeline');
  if (!show) return section.remove();
  const wrap = qs('#timeline-items');
  wrap.innerHTML = '';
  timeline.forEach((item) => {
    const block = document.createElement('div');
    block.className = 'milestone';
    block.innerHTML = `<div class="fact-title">${item.year || ''} · ${item.title || ''}</div><div class="muted">${item.detail || ''}</div>`;
    wrap.appendChild(block);
  });
}

function renderContact(profile, show) {
  const section = qs('#contact');
  if (!show) return section.remove();
  qs('#contact-email').textContent = profile.email || 'you@example.com';
  qs('#contact-email').dataset.email = profile.email || 'you@example.com';
}

function bindControls() {
  // Tag filters
  qs('#tag-filters').addEventListener('click', (e) => {
    if (e.target.matches('.tag-btn')) {
      state.filters.tag = e.target.dataset.tag;
      qsa('.tag-btn').forEach((btn) => btn.classList.toggle('active', btn === e.target));
      filterAndRenderCards();
    }
  });

  // Search
  qs('#search').addEventListener('input', (e) => {
    state.filters.search = e.target.value;
    filterAndRenderCards();
  });

  // Copy email
  qs('#copy-email').addEventListener('click', () => {
    const email = qs('#contact-email').dataset.email;
    navigator.clipboard?.writeText(email).then(() => showToast('Email copied'), () => showToast('Copy not available'));
  });

  // Contact form demo
  qs('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    showToast('Sent (demo)');
  });

  // Modal close
  qs('#modal-close').addEventListener('click', closeModal);
  qs('#modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });

  // Theme toggle
  qs('#theme-toggle').addEventListener('click', toggleTheme);
}

function openModal(item) {
  qs('#modal-title').textContent = item.title || '';
  qs('#modal-body').innerHTML = `
    <p class="muted">${item.year || ''}</p>
    <p>${item.longDesc || item.shortDesc || ''}</p>
    ${(item.links || []).map((l) => `<a class="btn ghost" style="margin-right:0.5rem;" target="_blank" rel="noreferrer noopener" href="${l.url}">${l.label || 'Open link'}</a>`).join('')}
  `;
  document.body.style.overflow = 'hidden';
  qs('#modal').classList.add('open');
}

function closeModal() {
  document.body.style.overflow = '';
  qs('#modal').classList.remove('open');
}

function showToast(message) {
  const wrap = qs('#toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  wrap.appendChild(toast);
  setTimeout(() => toast.remove(), 2400);
}

function toggleTheme() {
  const root = document.documentElement;
  const isLight = root.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  qs('#theme-toggle').textContent = isLight ? 'Dark mode' : 'Light mode';
}

function restoreTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.classList.add('light');
  }
  qs('#theme-toggle').textContent = document.documentElement.classList.contains('light') ? 'Dark mode' : 'Light mode';
}

restoreTheme();
loadContent();
