const openGift = document.getElementById('openGift');
const surprise = document.getElementById('surprise');
openGift.addEventListener('click', () => {
  surprise.classList.remove('hidden');
  openGift.textContent = 'Hadiah terbuka 💗';
  openGift.disabled = true;
  surprise.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Musik melodi romantis sederhana dibuat langsung oleh browser (tanpa file lagu eksternal).
// Browser meminta interaksi pengguna sebelum audio dapat dimainkan.
let audioContext = null, playing = false, melodyTimer = null, noteIndex = 0;
const notes = [523.25,659.25,783.99,659.25,587.33,698.46,783.99,698.46,523.25,587.33,659.25,523.25];
const musicToggle = document.getElementById('musicToggle');

function playNote(freq, start) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.055, start + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.62);
  osc.connect(gain); gain.connect(audioContext.destination);
  osc.start(start); osc.stop(start + 0.65);
}
function scheduleMelody() {
  if (!playing) return;
  const now = audioContext.currentTime;
  playNote(notes[noteIndex % notes.length], now);
  if (noteIndex % 3 === 0) playNote(notes[(noteIndex + 2) % notes.length] / 2, now);
  noteIndex++;
}
musicToggle.addEventListener('click', async () => {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === 'suspended') await audioContext.resume();
  playing = !playing;
  if (playing) {
    scheduleMelody();
    melodyTimer = setInterval(scheduleMelody, 650);
    musicToggle.textContent = 'Ⅱ Hentikan musik';
    musicToggle.setAttribute('aria-pressed', 'true');
  } else {
    clearInterval(melodyTimer);
    musicToggle.textContent = '♫ Putar musik romantis';
    musicToggle.setAttribute('aria-pressed', 'false');
  }
});
