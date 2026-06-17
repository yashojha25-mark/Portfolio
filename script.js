/*
   DevPortfolio - script.js
   Features: Matrix, Typing, Counters, Reveal, Filters, Toast */

'use strict';


const SKILLS = [
  { name: 'JavaScript', emoji: '⚡' },
  { name: 'HTML', emoji: '🧱' },
  { name: 'CSS', emoji: '🎨' },
  { name: 'Python', emoji: '🐍' },
  { name: 'Node.js', emoji: '🟢' },
  { name: 'Express', emoji: '🚂' },
  { name: 'APIs', emoji: '🔌' },
  { name: 'Leadership', emoji: '🧭' },
  { name: 'Communication', emoji: '🗣️' },
  { name: 'Facilitation', emoji: '🤝' },
  { name: 'Confidence', emoji: '💪' },
  { name: 'Self-Motivated', emoji: '🔥' },
  { name: 'Problem Solving', emoji: '🧠' },
];

const SKILL_BARS = [
  { name: 'JavaScript', pct: 90 },
  { name: 'HTML', pct: 95 },
  { name: 'CSS', pct: 92 },
  { name: 'Node.js', pct: 80 },
  { name: 'APIs', pct: 78 },
  { name: 'Python', pct: 72 },
];

const PROJECTS = [
  {
    icon: '🎓',
    tag: 'hackathon',
    title: 'Student Portal',
    desc: 'Built a hackathon student portal with attendance view, subject updates, and a clean dashboard for daily academic use.',
    techs: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
  },
  {
    icon: '🧩',
    tag: 'personal',
    title: 'Quiz Game',
    desc: 'Built an interactive JavaScript quiz game with timer logic, scoring, and instant feedback for engaging learning.',
    techs: ['HTML', 'CSS', 'JavaScript'],
    category: 'app',
  },
  {
    icon: '🤖',
    tag: 'personal',
    title: 'AI Content Generator',
    desc: 'Created a JavaScript content generator using API integration to produce AI-powered text output in real time.',
    techs: ['JavaScript', 'APIs', 'HTML', 'CSS'],
    category: 'ai',
  },
  {
    icon: '✨',
    tag: 'previous',
    title: 'Dynamic UI',
    desc: 'Designed and developed dynamic user interfaces with responsive layouts, smooth transitions, and reusable components.',
    techs: ['HTML', 'CSS'],
    category: 'web',
  },
  {
    icon: '🍽️',
    tag: 'previous',
    title: 'Online Menu Card',
    desc: 'Built an online menu card to display categories, item details, and pricing in a mobile-friendly format.',
    techs: ['HTML', 'CSS'],
    category: 'web',
  },
  {
    icon: '🤖',
    tag: 'current',
    title: 'AI Bot (In Progress)',
    desc: 'Currently building an AI bot interface with chat-like interactions and a focused, simple user experience.',
    techs: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js'],
    category: 'ai',
  },
];

const TYPED_ROLES = [
  'Student Developer',
  'QA Learner',
  'JavaScript Developer',
  'Node.js Learner',
  'API Integrator',
  'Project Builder',
];

const CODE_SNIPPET = `const developer = {
  name: "Yash Ojha",
  role: "Student Developer",
  location: "Earth 🌍",
  status: "Learning backend APIs and building modern apps",
  experience: "1 year",
  projectsCompleted: 6,
  clients: 0,

  skills: {
    frontend: ["HTML", "CSS", "JavaScript"],
    backend: ["Node.js", "Express", "Python"],
    api: ["REST", "JavaScript APIs"],
  },

  currentlyBuilding: "AI Content Generator 🤖",

  contactMe: () => {
    console.log("Let's collaborate!");
    return "Send a message below ↓";
  },
};

// Fun fact 🎉
developer.contactMe();
`;





function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  let cols, drops;
  const FONT_SIZE = 14;
  const chars = '01アイウエオカキクケコ{}[]<>;:=+-*/\\|&^%$#@!?ABCDEFGHIJKLMNOPQabcdefghijklmnop';

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / FONT_SIZE);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(10, 14, 26, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff8c';
    ctx.font = `${FONT_SIZE}px 'Fira Code', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
      if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
}


function startTypingLoop(element, phrases, speed = 60, pause = 1800, deleteSpeed = 30) {
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      element.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
    } else {
      element.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? deleteSpeed : speed);
  }
  tick();
}


function animateCode() {
  const el = document.getElementById('animated-code');
  if (!el) return;

  const coloredCode = CODE_SNIPPET
    .replace(/(".*?")/g, '<span style="color:#00ff8c">$1</span>')
    .replace(/\b(const|let|var|return|new|function|class|async|await|import|export|from)\b/g, '<span style="color:#bd93f9">$1</span>')
    .replace(/\/\/.*/g, '<span style="color:#6b7280">$&</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#ff79c6">$1</span>');

  let i = 0;
  el.innerHTML = '';
  const chars = CODE_SNIPPET.split('');
  const htmlChars = coloredCode.split('');


  let htmlIdx = 0;
  function typeNext() {
    if (i >= chars.length) return;
    // We build progressively from the colored version
    // Reveal the next character worth of HTML
    i++;
    const rawSlice = CODE_SNIPPET.slice(0, i);
    el.innerHTML = applyCodeSyntax(rawSlice);
    setTimeout(typeNext, Math.random() * 20 + 10);
  }
  typeNext();
}

function applyCodeSyntax(code) {
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Re-apply after escaping
    .replace(/(".*?")/g, '<span style="color:#00ff8c">$1</span>')
    .replace(/\b(const|let|var|return|new|function|=>|class)\b/g, '<span style="color:#bd93f9">$1</span>')
    .replace(/(\/\/.*)/g, '<span style="color:#6b7280">$1</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#ff79c6">$1</span>')
    .replace(/\b(frontend|backend|database|tools|skills|name|role|location|currentlyBuilding)\b:/g, '<span style="color:#00d4ff">$&</span>');
}


function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 1500;
    const step = Math.ceil(target / (duration / 30));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      counter.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        setTimeout(() => {
          fill.style.width = fill.dataset.width + '%';
        }, 100);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });
  fills.forEach(f => observer.observe(f));
}


function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNavLink();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('.section');
  let current = 'home';
  sections.forEach(sec => {
    if (window.scrollY + 80 >= sec.offsetTop) {
      current = sec.id;
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.nav === current);
  });
}


function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden-card', !match);
      });
    });
  });
}

function showToast(message, type = 'default') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function renderSkills() {
  const grid = document.querySelector('.skills-grid');
  if (!grid) return;
  grid.innerHTML = SKILLS.map((s, i) => `
    <div class="skill-card reveal" style="transition-delay:${i * 50}ms">
      <span class="skill-emoji">${s.emoji}</span>
      <span class="skill-name">${s.name}</span>
    </div>
  `).join('');

  const barContainer = document.getElementById('skill-bars');
  if (!barContainer) return;
  barContainer.innerHTML = SKILL_BARS.map(sb => `
    <div class="skill-bar-item reveal">
      <div class="skill-bar-header">
        <span class="skill-bar-name">${sb.name}</span>
        <span class="skill-bar-pct">${sb.pct}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" data-width="${sb.pct}"></div>
      </div>
    </div>
  `).join('');

  initSkillBars();
}


function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((p, i) => `
    <div class="project-card reveal" data-category="${p.category}" style="transition-delay:${i * 80}ms">
      <div class="project-header">
        <span class="project-icon">${p.icon}</span>
        <div class="project-links">
          <a href="#" class="project-link" title="GitHub" aria-label="GitHub repo">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <a href="#" class="project-link" title="Live Demo" aria-label="Live demo">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="project-body">
        <p class="project-tag">${p.tag}</p>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
      </div>
      <div class="project-footer">
        ${p.techs.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('msg-subject').value.trim();
    const body = document.getElementById('msg-body').value.trim();
    if (!subject || !body) {
      showToast('⚠ Please fill in all fields.', 'error');
      return;
    }
    // Simulate send
    const btn = form.querySelector('.btn-primary');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.textContent = 'send_message()';
      btn.disabled = false;
      document.getElementById('form-success').classList.remove('hidden');
      setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 5000);
    }, 1500);
  });
}

function initHeroBgCode() {
  const el = document.getElementById('hero-bg-code');
  if (!el) return;
  const snippets = [
    'const', 'let', 'var', 'function', '=>', 'async', 'await', '{', '}', '[', ']',
    'return', 'import', 'export', 'class', 'extends', 'new', 'if', 'else', 'for',
    '0x1A2B', '0xFF', '===', '!==', '&&', '||', '/**', '*/', '//',
    'HTML', 'CSS', 'JavaScript', 'DOM', 'Git', 'API', 'fetch', 'async',
  ];
  let text = '';
  for (let i = 0; i < 800; i++) {
    text += snippets[Math.floor(Math.random() * snippets.length)] + ' ';
  }
  el.textContent = text;
}

document.addEventListener('DOMContentLoaded', () => {
  initMatrix();
  initHeroBgCode();

  // Initialize portfolio directly (no login)
  animateCode();
  animateCounters();
  initReveal();
  initNavbar();
  initProjectFilter();
  renderSkills();
  renderProjects();
  initReveal();
  startTypingLoop(document.getElementById('typed-role'), TYPED_ROLES, 70, 2000, 40);
  initContactForm();
});
