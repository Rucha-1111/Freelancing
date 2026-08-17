// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Accordions (Terms & Conditions + FAQ) ----------
document.querySelectorAll('.accordion').forEach(group => {
  const buttons = group.querySelectorAll('.accordion__q');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      // Close other open items within the same accordion group only
      buttons.forEach(other => {
        if (other !== button) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      button.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });
});

// ---------- Demo walkthrough modal ----------
// To wire up real videos: add a src for each demo id below, e.g.
//   cafe:  'assets/cafe-walkthrough.mp4',
//   salon: 'assets/salon-walkthrough.mp4',
//   tutor: 'assets/tutor-walkthrough.mp4',
// then this script will swap the placeholder text for a <video> player automatically.
const demoVideos = {
  cafe: '',
  salon: '',
  tutor: '',
};

const modal = document.getElementById('demoModal');
const modalTitle = document.getElementById('modalTitle');
const modalSlot = modal ? modal.querySelector('.modal__video-slot') : null;

function openDemoModal(demoId, label) {
  if (!modal) return;
  modalTitle.textContent = label ? `Walkthrough — ${label}` : 'Walkthrough video';

  const src = demoVideos[demoId];
  if (src) {
    modalSlot.innerHTML = `<video controls style="width:100%;border-radius:8px;" src="${src}"></video>`;
  } else {
    modalSlot.innerHTML = `<p>🎥 Video coming soon — drop an <code>.mp4</code> in <code>/assets/</code> and add its path to <code>demoVideos</code> in <code>script.js</code>.</p>`;
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeDemoModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modalSlot.innerHTML = '';
}

document.querySelectorAll('.demo-card__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const demoId = btn.dataset.demo;
    const title = btn.closest('.demo-card').querySelector('h3').textContent;
    openDemoModal(demoId, title);
  });
});

if (modal) {
  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeDemoModal);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDemoModal();
  });
}

// ---------- Sticky nav shadow on scroll ----------
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10 ? '0 4px 0 rgba(0,0,0,0.06)' : 'none';
  });
}
