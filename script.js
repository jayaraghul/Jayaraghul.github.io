// ── Navbar: solid background on scroll ──────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// ── Mobile nav toggle ────────────────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// ── Stagger animation for grid sections ──────────────────────────────────────
const STAGGER_MS = 60;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const staggerGrids = document.querySelectorAll('.projects-grid, .hobbies-grid');

// Mark grid children synchronously so the individual observer skips them
staggerGrids.forEach(grid => {
    grid.querySelectorAll('.fade-in').forEach(el => el.dataset.stagger = '1');
});

if (staggerGrids.length) {
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const cards = Array.from(entry.target.querySelectorAll('.fade-in'));
            cards.forEach((card, i) => {
                setTimeout(() => card.classList.add('visible'), prefersReduced ? 0 : i * STAGGER_MS);
            });
            gridObserver.unobserve(entry.target);
        });
    }, { threshold: 0.08 });
    staggerGrids.forEach(grid => gridObserver.observe(grid));
}

// ── Fade-in on scroll for all other .fade-in elements ────────────────────────
const fadeEls = Array.from(document.querySelectorAll('.fade-in')).filter(el => !el.dataset.stagger);
if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
}

// ── Skill-tag project filter ─────────────────────────────────────────────────
(function () {
    const skillTags  = document.querySelectorAll('.skill-tags span[data-filter]');
    const cards      = document.querySelectorAll('.project-card[data-skills]');
    const filterBar  = document.getElementById('filterBar');
    const filterHint = document.getElementById('filterHint');
    if (!skillTags.length || !cards.length || !filterBar) return;

    let activeFilter = null;

    // Show the "filter by skill" hint in the projects section header
    if (filterHint) filterHint.style.display = '';

    // Dim a card: inline styles always win over any class (no !important battles)
    function dimCard(card) {
        card.style.opacity       = '0.15';
        card.style.transform     = 'scale(0.96)';
        card.style.pointerEvents = 'none';
        card.setAttribute('aria-hidden', 'true');
    }

    // Restore a card to full visibility
    function restoreCard(card) {
        card.style.opacity       = '';
        card.style.transform     = '';
        card.style.pointerEvents = '';
        card.removeAttribute('aria-hidden');
    }

    function applyFilter(key, label) {
        activeFilter = key;

        // Highlight the active skill tag, clear the rest
        skillTags.forEach(tag => {
            const isActive = tag.dataset.filter === key;
            tag.classList.toggle('skill-tag--active', isActive);
            tag.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        // Show matching cards, dim the rest.
        // Partial match: a card remains visible if ANY one of its skills equals
        // the selected filter key (comma-separated list, case-insensitive).
        let matchCount = 0;
        cards.forEach(card => {
            const cardSkills = (card.dataset.skills || '')
                .toLowerCase()
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);

            const matches = cardSkills.some(s => s === key.toLowerCase());

            if (matches) {
                restoreCard(card);
                matchCount++;
            } else {
                dimCard(card);
            }
        });

        // Render the filter status bar
        filterBar.innerHTML =
            `<span class="filter-bar-label">` +
              `Showing <strong>${matchCount}</strong> ` +
              `project${matchCount !== 1 ? 's' : ''} · ` +
              `<strong>${label}</strong>` +
            `</span>` +
            `<button class="filter-clear-btn" id="filterClearBtn" aria-label="Clear skill filter">` +
              `All Projects` +
            `</button>`;
        filterBar.classList.add('active');
        document.getElementById('filterClearBtn').addEventListener('click', clearFilter);

        // Scroll the projects section into view
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function clearFilter() {
        activeFilter = null;

        skillTags.forEach(tag => {
            tag.classList.remove('skill-tag--active');
            tag.setAttribute('aria-pressed', 'false');
        });

        cards.forEach(restoreCard);

        filterBar.classList.remove('active');
        filterBar.innerHTML = '';
    }

    // Wire up each skill tag
    skillTags.forEach(tag => {
        tag.setAttribute('aria-pressed', 'false');

        const activate = () => {
            const key = tag.dataset.filter;
            // Click the active filter again → reset (toggle behaviour)
            if (activeFilter === key) {
                clearFilter();
            } else {
                applyFilter(key, tag.textContent.trim());
            }
        };

        tag.addEventListener('click', activate);
        tag.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
        });
    });
})();

// ── Project page: sticky TOC ─────────────────────────────────────────────────
(function () {
    const container = document.querySelector('.project-body-container');
    if (!container) return;

    const headings = Array.from(container.querySelectorAll('h3.project-section-title'));
    if (headings.length < 3) return;

    const usedIds = new Set();
    const slugify = text => text
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .slice(0, 48);

    const items = headings.map((h, i) => {
        let id = slugify(h.textContent) || `section-${i}`;
        if (usedIds.has(id)) id = `${id}-${i}`;
        usedIds.add(id);
        h.id = id;
        return { id, label: h.textContent.replace(/\s+/g, ' ').trim() };
    });

    const toc = document.createElement('nav');
    toc.className = 'project-toc';
    toc.id = 'projectToc';
    toc.setAttribute('aria-label', 'Page sections');
    toc.innerHTML =
        '<p class="toc-heading">On this page</p>' +
        '<ol class="toc-list">' +
        items.map(({ id, label }) =>
            `<li><a class="toc-link" href="#${id}">${label}</a></li>`
        ).join('') +
        '</ol>';

    const layout = document.createElement('div');
    layout.className = 'project-toc-layout';
    container.parentNode.replaceChild(layout, container);
    layout.appendChild(toc);       // TOC first → mobile: top strip; desktop: right column via grid-area
    layout.appendChild(container);

    const links = toc.querySelectorAll('.toc-link');
    const navbar = document.getElementById('navbar');
    let ticking = false;

    function getNavH() { return (navbar ? navbar.offsetHeight : 72) + 24; }

    function updateActive() {
        const navH = getNavH();
        let activeId = items[0].id;
        headings.forEach(h => {
            if (h.getBoundingClientRect().top <= navH) activeId = h.id;
        });
        links.forEach(a => {
            a.classList.toggle('toc-link--active', a.getAttribute('href') === '#' + activeId);
        });
    }

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { updateActive(); ticking = false; });
    }, { passive: true });
    updateActive();

    links.forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById(a.getAttribute('href').slice(1));
            if (!target) return;
            const y = target.getBoundingClientRect().top + window.scrollY - getNavH() + 8;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });
})();

// ── Active nav link highlight on scroll ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
if (sections.length && navAnchors.length) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
        });
        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    });
}
