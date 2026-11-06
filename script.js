
const openGift = document.getElementById('openGift');
const surprise = document.getElementById('surprise');

openGift.addEventListener('click', () => {
  surprise.classList.remove('hidden');
  openGift.textContent = 'Hadiah terbuka 💗';
  openGift.disabled = true;
  surprise.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Musik ulang tahun untuk Novianti 🎂
const musicToggle = document.getElementById('musicToggle');

const birthdayMusic = new Audio(
  'carvit56-happiest-birthday-to-you-252388.mp3'
);

birthdayMusic.loop = true;
birthdayMusic.volume = 0.8;

musicToggle.addEventListener('click', async () => {
  if (birthdayMusic.paused) {
    try {
      await birthdayMusic.play();
      musicToggle.textContent = 'Ⅱ Hentikan musik';
      musicToggle.setAttribute('aria-pressed', 'true');
    } catch (error) {
      musicToggle.textContent = 'Musik gagal diputar';
      console.error('Gagal memutar musik:', error);
    }
  } else {
    birthdayMusic.pause();
    musicToggle.textContent = '♫ Putar lagu nya sayangku hehehe';
    musicToggle.setAttribute('aria-pressed', 'false');
  }
});

birthdayMusic.addEventListener('ended', () => {
  musicToggle.textContent = '♫ Putar lagu nya sayangku hehehe';
  musicToggle.setAttribute('aria-pressed', 'false');
});
