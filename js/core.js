/* ===========================================
   Core Site Interactions
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Dynamic year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav scroll effect ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  /* ---------- Active nav highlight ---------- */
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ---------- Fade-in on scroll ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ---------- Hero Code Typing Animation ---------- */
  const heroCodeEl = document.getElementById('heroCode');
  if (heroCodeEl) {
    const codeLines = [
      '<span class="keyword">const</span> <span class="variable">developer</span> <span class="punctuation">=</span> <span class="bracket">{</span>',
      '  <span class="property">name</span><span class="punctuation">:</span> <span class="string">"Shai Eliav"</span><span class="punctuation">,</span>',
      '  <span class="property">stack</span><span class="punctuation">:</span> <span class="bracket">[</span><span class="string">"React Native"</span><span class="punctuation">,</span> <span class="string">"TypeScript"</span><span class="punctuation">,</span> <span class="string">"Node.js"</span><span class="bracket">]</span><span class="punctuation">,</span>',
      '  <span class="property">passion</span><span class="punctuation">:</span> <span class="string">"Building scalable mobile apps"</span>',
      '<span class="bracket">}</span><span class="punctuation">;</span>',
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentHtml = '';

    function typeCode() {
      if (lineIndex >= codeLines.length) return;

      const fullLine = codeLines[lineIndex];
      const plainLine = fullLine.replace(/<[^>]*>/g, '');

      if (charIndex <= plainLine.length) {
        let plainCount = 0;
        let htmlIndex = 0;
        let partial = '';
        const target = charIndex;

        while (plainCount < target && htmlIndex < fullLine.length) {
          if (fullLine[htmlIndex] === '<') {
            const endTag = fullLine.indexOf('>', htmlIndex);
            partial += fullLine.substring(htmlIndex, endTag + 1);
            htmlIndex = endTag + 1;
          } else {
            partial += fullLine[htmlIndex];
            htmlIndex++;
            plainCount++;
          }
        }

        // Close any open span tags
        const openTags = (partial.match(/<span[^>]*>/g) || []).length;
        const closeTags = (partial.match(/<\/span>/g) || []).length;
        for (let i = 0; i < openTags - closeTags; i++) {
          partial += '</span>';
        }

        heroCodeEl.innerHTML = currentHtml + partial + '<span class="cursor">▌</span>';
        charIndex++;
        setTimeout(typeCode, 30 + Math.random() * 40);
      } else {
        currentHtml += fullLine + '\n';
        lineIndex++;
        charIndex = 0;
        setTimeout(typeCode, 200);
      }
    }

    setTimeout(typeCode, 1200);
  }

  /* ---------- Scroll Completion ---------- */
  const scrollComplete = document.getElementById('scrollComplete');
  if (scrollComplete) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollComplete.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });
    scrollObserver.observe(scrollComplete);
  }

});
