const openGift = document.getElementById('openGift');
const surprise = document.getElementById('surprise');
openGift.addEventListener('click', () => {
  surprise.classList.remove('hidden');
  openGift.textContent = 'Hadiah terbuka 💗';
  openGift.disabled = true;
  surprise.scrollIntoView({ behavior: 'smooth', block: 'start' });
});


// Lagu ulang tahun Korea - 생일 축하합니다
// Melodi instrumental menggunakan Web Audio API

let audioContext = null;
let playing = false;
let melodyTimer = null;
let noteIndex = 0;

const melody = [
  392, 392, 440, 392, 523, 494,
  392, 392, 440, 392, 587, 523,
  392, 392, 784, 659, 523, 494, 440,
  698, 698, 659, 523, 587, 523
];

const musicToggle = document.getElementById('musicToggle');

function playNote(freq) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = 'sine';
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.12, audioContext.currentTime + 0.05
  );
  gain.gain.exponentialRampToValueAtTime(
    0.0001, audioContext.currentTime + 0.42
  );

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start();
  osc.stop(audioContext.currentTime + 0.45);
}

musicToggle.addEventListener('click', async () => {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();
  }

  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  playing = !playing;

  if (playing) {
    melodyTimer = setInterval(() => {
      if (!playing) return;

      playNote(melody[noteIndex]);
      noteIndex = (noteIndex + 1) % melody.length;
    }, 450);

    musicToggle.textContent = 'Ⅱ Hentikan musik';
    musicToggle.setAttribute('aria-pressed', 'true');
  } else {
    clearInterval(melodyTimer);
    musicToggle.textContent = '♫ Putar musik ulang tahun Korea';
    musicToggle.setAttribute('aria-pressed', 'false');
  }
});
