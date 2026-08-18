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

// ---------- Demos carousel (infinite loop via arrows) ----------
const demosTrack = document.getElementById('demosTrack');
const demosPrev = document.getElementById('demosPrev');
const demosNext = document.getElementById('demosNext');

if (demosTrack && demosPrev && demosNext) {
  let isAnimating = false;

  function stepSize() {
    const card = demosTrack.querySelector('.demo-card');
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(demosTrack).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function goNext() {
    if (isAnimating) return;
    isAnimating = true;
    const step = stepSize();
    demosTrack.style.transition = 'transform .4s ease';
    demosTrack.style.transform = `translateX(-${step}px)`;

    demosTrack.addEventListener('transitionend', function handler() {
      demosTrack.removeEventListener('transitionend', handler);
      // Move the first card to the end, then snap back to 0 instantly
      demosTrack.appendChild(demosTrack.firstElementChild);
      demosTrack.style.transition = 'none';
      demosTrack.style.transform = 'translateX(0)';
      // Force reflow so the next transition applies cleanly
      void demosTrack.offsetHeight;
      isAnimating = false;
    }, { once: true });
  }

  function goPrev() {
    if (isAnimating) return;
    isAnimating = true;
    const step = stepSize();
    // Move the last card to the front first, pre-positioned off-screen left
    demosTrack.style.transition = 'none';
    demosTrack.insertBefore(demosTrack.lastElementChild, demosTrack.firstElementChild);
    demosTrack.style.transform = `translateX(-${step}px)`;
    void demosTrack.offsetHeight;

    requestAnimationFrame(() => {
      demosTrack.style.transition = 'transform .4s ease';
      demosTrack.style.transform = 'translateX(0)';
    });

    demosTrack.addEventListener('transitionend', function handler() {
      demosTrack.removeEventListener('transitionend', handler);
      isAnimating = false;
    }, { once: true });
  }

  demosNext.addEventListener('click', goNext);
  demosPrev.addEventListener('click', goPrev);

  // Recalculate cleanly on resize so step size stays accurate
  window.addEventListener('resize', () => {
    demosTrack.style.transition = 'none';
    demosTrack.style.transform = 'translateX(0)';
  });
}

const demoVideos = {
  cafe: '',
  dance: 'assets/Dance.mp4',
  gift: 'assets/Gift.mp4',
  'handmade-bags': 'assets/HandmadeBags.mp4',
  jewellery: '',
  nails: 'assets/Nails.mp4',
  photography: '',
  tattoo: '',
  wedding: 'assets/Wedding.mp4',
  wellness: 'assets/Wellness.mp4',
  yoga: 'assets/Yoga.mp4',
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
    modalSlot.innerHTML = `<p>🎥 Video coming soon</p>`;
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