'use strict';
const action = document.getElementById('open');
const help = document.getElementById('help');
const italian = navigator.language.toLowerCase().startsWith('it');
if (italian) {
  document.documentElement.lang = 'it';
  document.querySelector('h1').textContent = 'Link protetto';
  help.textContent = 'Apri il link in MayaVeil e inserisci lì la password. Puoi anche incollare il link completo nella barra degli indirizzi dell’app.';
  action.textContent = 'Apri in MayaVeil';
}
function updateLink() {
  const match = /^#maya1\.([A-Za-z0-9_-]{68,11608})$/.exec(location.hash);
  action.hidden = !match;
  if (!match) {
    action.removeAttribute('href');
    help.textContent = italian ? 'Il link è incompleto. Chiedi a chi lo ha inviato di condividerlo di nuovo.' : 'This link is incomplete. Ask the sender to share it again.';
    return;
  }
  help.textContent = italian ? 'Apri il link in MayaVeil e inserisci lì la password. Puoi anche incollare il link completo nella barra degli indirizzi dell’app.' : 'Open this link in MayaVeil and enter the password there. You can also paste the full link into the app’s address bar.';
  action.href = /Android/i.test(navigator.userAgent)
    ? 'intent://open/' + match[1] + '#Intent;scheme=mayaveil-link;package=app.ephemeral;end'
    : 'mayaveil-link://open/' + match[1];
}
updateLink();
addEventListener('hashchange', updateLink);
