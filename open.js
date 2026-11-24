'use strict';
const action = document.getElementById('open');
const help = document.getElementById('help');
const italian = navigator.language.toLowerCase().startsWith('it');
if (italian) {
  document.documentElement.lang = 'it';
  document.querySelector('h1').textContent = 'Link protetto';
  action.textContent = 'Apri in MayaVeil';
  document.getElementById('install-title').textContent = 'Ti serve MayaVeil?';
  document.getElementById('about').textContent = 'MayaVeil è il browser privato in RAM e lettore di file di Schopenhauer’s Lab. Puoi navigare sul web, leggere file nella memoria temporanea e sbloccare link come questo.';
  document.getElementById('availability').textContent = 'I link pubblici per il download non sono ancora disponibili. Se partecipi al test, chiedi un invito a chi ti ha inviato il link. Dopo l’installazione, riapri il link originale.';
  document.getElementById('play').textContent = 'Cerca su Google Play';
  document.getElementById('apple').textContent = 'Cerca sull’App Store';
}
function updateLink() {
  const match = /^#maya1\.([A-Za-z0-9_-]{68,11608})$/.exec(location.hash);
  action.hidden = !match;
  if (!match) {
    action.removeAttribute('href');
    help.textContent = italian ? 'Il link è incompleto. Chiedi a chi lo ha inviato di condividerlo di nuovo.' : 'This link is incomplete. Ask the sender to share it again.';
    return;
  }
  if (new URLSearchParams(location.search).has('install')) {
    help.textContent = italian ? 'Se MayaVeil non si è aperta, consulta le informazioni qui sotto. Se l’app è già installata, prova a incollare il link originale nella barra degli indirizzi di MayaVeil su Android.' : 'If MayaVeil didn’t open, see the installation information below. If you already have the Android app, you can paste the original link into its address bar.';
  } else {
    help.textContent = italian ? 'Apri il link in MayaVeil e inserisci la password che ti ha dato il mittente.' : 'Open the link in MayaVeil and enter the password from the sender.';
  }
  const fallback = location.origin + location.pathname + '?install' + match[0];
  action.href = /Android/i.test(navigator.userAgent)
    ? 'intent://open/' + match[1] + '#Intent;scheme=mayaveil-link;package=app.ephemeral;S.browser_fallback_url=' + encodeURIComponent(fallback) + ';end'
    : 'mayaveil-link://open/' + match[1];
}
updateLink();
addEventListener('hashchange', updateLink);
