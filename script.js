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

    // Show the hint once the skills section is ready
    if (filterHint) filterHint.style.display = '';

    function applyFilter(key, label) {
        activeFilter = key;

        // Update tag highlight states
        skillTags.forEach(tag => {
            const isActive = tag.dataset.filter === key;
            tag.classList.toggle('skill-tag--active', isActive);
            tag.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        // Show / hide cards
        let matchCount = 0;
        cards.forEach(card => {
            const skills = (card.dataset.skills || '').split(',').map(s => s.trim());
            const match  = skills.includes(key);
            card.classList.toggle('inactive', !match);
            if (match) matchCount++;
        });

        // Update filter bar
        filterBar.innerHTML =
            `<span class="filter-bar-label">Showing <strong>${matchCount}</strong> project${matchCount !== 1 ? 's' : ''} using <strong>${label}</strong></span>` +
            `<button class="filter-clear-btn" id="filterClearBtn" aria-label="Clear filter">Show all</button>`;
        filterBar.classList.add('active');
        document.getElementById('filterClearBtn').addEventListener('click', clearFilter);

        // Scroll to projects grid
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function clearFilter() {
        activeFilter = null;
        skillTags.forEach(tag => {
            tag.classList.remove('skill-tag--active');
            tag.removeAttribute('aria-pressed');
        });
        cards.forEach(card => card.classList.remove('inactive'));
        filterBar.classList.remove('active');
        filterBar.innerHTML = '';
    }

    skillTags.forEach(tag => {
        tag.setAttribute('aria-pressed', 'false');

        const activate = () => {
            const key = tag.dataset.filter;
            if (activeFilter === key) {
                clearFilter();   // toggle off same tag
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
