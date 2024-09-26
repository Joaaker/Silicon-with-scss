// JavaScript skriven av Joakim Lindh och ChatGPT
const darkmodeSwitch = document.getElementById('dark-mode');
const hasDarkmode = localStorage.getItem('darkmode');
const faqButtons = document.querySelectorAll('.dropdown-btn');

if (darkmodeSwitch) {
  if (hasDarkmode == null) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  } else if (hasDarkmode === 'on') {
    enableDarkMode();
  } else if (hasDarkmode === 'off') {
    disableDarkMode();
  }

  darkmodeSwitch.addEventListener('change', () => {
    if (darkmodeSwitch.checked) {
      enableDarkMode();
      localStorage.setItem('darkmode', 'on');
    } else {
      disableDarkMode();
      localStorage.setItem('darkmode', 'off');
    }
  });
}

function enableDarkMode() {
  if (darkmodeSwitch) darkmodeSwitch.checked = true;
  document.documentElement.classList.remove('light-mode');
  document.documentElement.classList.add('dark-mode');
}

function disableDarkMode() {
  if (darkmodeSwitch) darkmodeSwitch.checked = false;
  document.documentElement.classList.remove('dark-mode');
  document.documentElement.classList.add('light-mode');
}

if (faqButtons.length > 0) {
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const answerId = button.getAttribute('aria-controls');
      const expanded = button.getAttribute('aria-expanded') === 'true';

      // Växla 'aria-expanded'-attributet
      button.setAttribute('aria-expanded', !expanded);

      // Växla 'expanded'-klassen på det överordnade '.FAQ-item'-elementet
      const faqItem = button.closest('.FAQ-item');
      faqItem.classList.toggle('expanded', !expanded);
    });
  });
}

// Funktion för att uppdatera FAQ baserat på skärmstorlek
function updateFAQ() {
  // Hämta alla FAQ-poster
  const faqItems = document.querySelectorAll('.FAQ-item');

  // Stäng alla FAQ-poster
  faqItems.forEach(item => {
    const button = item.querySelector('.dropdown-btn');
    button.setAttribute('aria-expanded', 'false');
    item.classList.remove('expanded');
  });

  // Bestäm vilken FAQ-post som ska öppnas
  if (window.innerWidth < 768) {
    // Mobil vy: Öppna FAQ-svar 1
    const answer1Button = document.querySelector('.dropdown-btn[aria-controls="answer1"]');
    if (answer1Button) {
      const answer1Item = answer1Button.closest('.FAQ-item');
      answer1Button.setAttribute('aria-expanded', 'true');
      answer1Item.classList.add('expanded');
    }
  } else {
    // Tablet och desktop vy: Öppna FAQ-svar 3
    const answer3Button = document.querySelector('.dropdown-btn[aria-controls="answer3"]');
    if (answer3Button) {
      const answer3Item = answer3Button.closest('.FAQ-item');
      answer3Button.setAttribute('aria-expanded', 'true');
      answer3Item.classList.add('expanded');
    }
  }
}

// Anropa funktionen vid sidladdning
updateFAQ();

// Lyssna på fönsterstorleksändringar för att uppdatera FAQ-poster dynamiskt
window.addEventListener('resize', updateFAQ);

