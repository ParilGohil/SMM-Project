/* ============================================
   DIGITAL MARKETING HUB - MAIN JAVASCRIPT
   Interactions & UI Logic
   ============================================ */



// ---- Navigation ----
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (nav) nav.style.background = window.scrollY > 50
    ? 'rgba(255, 255, 255, 0.95)'
    : 'rgba(255, 255, 255, 0.85)';;
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// ---- Scroll Animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-in').forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});

// ---- 3D Card Tilt Effect ----
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

// ---- Counter Animation ----
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);

  function update() {
    start += step;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      return;
    }
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    requestAnimationFrame(update);
  }
  update();
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const target = parseInt(entry.target.dataset.target || entry.target.textContent);
      animateCounter(entry.target, target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ---- Accordion ----
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const body = item.querySelector('.accordion-body');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.accordion-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.accordion-body').style.maxHeight = '0';
    });

    // Open clicked if was closed
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});



// ---- Typing Effect ----
function typeWriter(element, text, speed = 60) {
  if (!element) return;
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

const typeEl = document.querySelector('.type-effect');
if (typeEl) typeWriter(typeEl, typeEl.dataset.text || typeEl.textContent);

// ---- Smooth page nav highlight ----
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a[href*="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) link.classList.add('active');
  });
});

// ---- Neon Color Cycle on decorative elements ----
const colorCycleEls = document.querySelectorAll('.color-cycle');
const colors = ['#111', '#333', '#555', '#444', '#666'];
let colorIndex = 0;

setInterval(() => {
  colorCycleEls.forEach(el => {
    el.style.color = colors[colorIndex];
    el.style.textShadow = 'none';
  });
  colorIndex = (colorIndex + 1) % colors.length;
}, 2000);

// ---- 3D Rotating Cube for Visual Elements ----
function initCube(container) {
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  canvas.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let angle = 0;

  const vertices3D = [
    [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
    [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]
  ];

  const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ];

  function project(x, y, z) {
    const fov = 5;
    const scale = fov / (fov + z);
    return {
      x: x * scale * 50 + 100,
      y: y * scale * 50 + 100
    };
  }

  function rotatePoint(x, y, z, ax, ay) {
    let tx = x * Math.cos(ay) + z * Math.sin(ay);
    let tz = -x * Math.sin(ay) + z * Math.cos(ay);
    let ty = y * Math.cos(ax) - tz * Math.sin(ax);
    tz = y * Math.sin(ax) + tz * Math.cos(ax);
    return { x: tx, y: ty, z: tz };
  }

  function drawCube() {
    ctx.clearRect(0, 0, 200, 200);
    angle += 0.01;

    const projected = vertices3D.map(([x, y, z]) => {
      const r = rotatePoint(x, y, z, angle * 0.7, angle);
      return project(r.x, r.y, r.z);
    });

    edges.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(projected[a].x, projected[a].y);
      ctx.lineTo(projected[b].x, projected[b].y);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    projected.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();
    });

    requestAnimationFrame(drawCube);
  }

  drawCube();
}

document.querySelectorAll('.cube-container').forEach(initCube);

// ---- Tooltip ----
document.querySelectorAll('[data-tooltip]').forEach(el => {
  el.style.position = 'relative';

  el.addEventListener('mouseenter', (e) => {
    const tip = document.createElement('div');
    tip.className = 'tooltip-bubble';
    tip.textContent = el.dataset.tooltip;
    tip.style.cssText = `
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255,255,255,0.95);
      border: 1px solid rgba(0,0,0,0.15);
      color: #333;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.75rem;
      padding: 0.4rem 0.8rem;
      border-radius: 2px;
      white-space: nowrap;
      z-index: 1000;
      pointer-events: none;
      animation: fadeIn 0.2s ease;
    `;
    el.appendChild(tip);
  });

  el.addEventListener('mouseleave', () => {
    el.querySelector('.tooltip-bubble')?.remove();
  });
});

console.log(`
  ██████╗ ███╗   ███╗██╗  ██╗
  ██╔══██╗████╗ ████║██║  ██║
  ██║  ██║██╔████╔██║███████║
  ██║  ██║██║╚██╔╝██║██╔══██║
  ██████╔╝██║ ╚═╝ ██║██║  ██║
  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝
  Digital Marketing Hub v1.0
`);

/* =========================================
   AI CHATBOT (GEMINI INTEGRATION)
   ========================================= */

// 1. Inject Chat UI into the page
const chatHTML = `
  <div id="ai-chat-btn">
    <i class="fa-solid fa-robot"></i>
    <i class="fa-solid fa-xmark"></i>
  </div>
  <div id="ai-chat-widget">
    <div class="chat-header">
      <i class="fa-solid fa-robot" style="font-size:1.5rem;color:#000;"></i>
      <div>
        <h3>DM Expert AI</h3>
        <p>Ask anything about digital marketing</p>
      </div>
    </div>
    <div class="chat-messages" id="chat-messages">
      <div class="chat-msg bot">Hi! I'm your Digital Marketing assistant. How can I help you master SEO, SMM, or anything else today?</div>
    </div>
    <div class="chat-input-area">
      <input type="text" id="chat-input" placeholder="Ask a question..." autocomplete="off">
      <button id="chat-send"><i class="fa-solid fa-paper-plane"></i></button>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', chatHTML);

// 2. Chat Logic & API
const chatBtn = document.getElementById('ai-chat-btn');
const chatWidget = document.getElementById('ai-chat-widget');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// IMPORTANT: No API key needed for this free, open API endpoint.
const OPENROUTER_URL = "https://text.pollinations.ai/openai";
// Toggle window
chatBtn.addEventListener('click', () => {
  chatBtn.classList.toggle('open');
  chatWidget.classList.toggle('open');
  if (chatWidget.classList.contains('open')) {
    chatInput.focus();
  }
});

// Append message helper
function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;
  
  // Basic markdown parsing for bold text and code blocks
  let parsedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  parsedText = parsedText.replace(/\`(.*?)\`/g, '<code>$1</code>');
  msgDiv.innerHTML = parsedText;
  
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show/Hide typing dots
function toggleTyping(show) {
  if (show) {
    const typing = document.createElement('div');
    typing.id = 'typing-indicator';
    typing.className = 'chat-msg bot typing-dots';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } else {
    document.getElementById('typing-indicator')?.remove();
  }
}

// Handle sending message
async function handleSend() {
  const userText = chatInput.value.trim();
  if (!userText) return;

  appendMessage('user', userText);
  chatInput.value = '';
  toggleTyping(true);

  // Pure System Persona
  const systemContext = "You are an elite, highly professional Digital Marketing expert. Answer questions strictly regarding SEO, SEM, SMM, Content Marketing, Affiliate Marketing, Email Marketing, Web Analytics, algorithms, and digital business strategy. Be concise, actionable, and do not use generic fluff. If a user asks something unrelated to marketing, politely decline.";

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        model: "openai", // Will default to a free high quality model on Pollinations
        messages: [
          { role: "system", content: systemContext },
          { role: "user", content: userText }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    toggleTyping(false);

    if (data.choices && data.choices[0].message) {
      appendMessage('bot', data.choices[0].message.content);
    } else if (data.error) {
      console.error("API Error:", data.error);
      appendMessage('bot', "API Error: " + (data.error.message || JSON.stringify(data.error)));
    } else {
      console.error(data);
      appendMessage('bot', "Sorry, I had trouble processing that request. Please try again.");
    }
  } catch (err) {
    console.error(err);
    toggleTyping(false);
    appendMessage('bot', "Connection error: " + err.message);
  }
}

// Event Listeners for input
chatSend.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSend();
});
