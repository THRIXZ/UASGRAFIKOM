/* ============================================================
   PETUALANGAN PULANG — Narrative Navigation
============================================================ */

let currentChapter = 0;
const totalChapters = 6; // 0..5

function showChapter(n) {
  if (n < 0 || n >= totalChapters) return;
  document.querySelectorAll('.chapter').forEach(c => {
    c.classList.toggle('active', parseInt(c.dataset.chapter) === n);
  });
  currentChapter = n;
  // Scroll to top within active chapter
  const active = document.querySelector('.chapter.active');
  if (active) active.scrollTop = 0;
}

function nextChapter() {
  if (currentChapter < totalChapters - 1) {
    showChapter(currentChapter + 1);
  }
}

function prevChapter() {
  if (currentChapter > 0) {
    showChapter(currentChapter - 1);
  }
}

function goHome() {
  showChapter(0);
}

function goToSimulator() {
  // Pindah ke halaman simulator (file aslinya, tidak diubah)
  window.location.href = 'simulator.html';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextChapter();
  if (e.key === 'ArrowLeft') prevChapter();
});
