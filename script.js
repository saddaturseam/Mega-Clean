// Mobile navigation: expandable main menu and tap-to-open service/location groups.
const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('#main-navigation');
if (menuButton && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navigation.querySelectorAll('.nav-item.open').forEach(item => item.classList.remove('open'));
    navigation.querySelectorAll('.nav-trigger').forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  };
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  navigation.querySelectorAll('.nav-trigger').forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (window.matchMedia('(max-width: 700px)').matches) {
        const item = trigger.closest('.nav-item');
        if (!item.classList.contains('open')) {
          event.preventDefault();
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a') && !event.target.closest('.nav-trigger')) closeMenu();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (window.matchMedia('(max-width: 700px)').matches && !event.target.closest('.top')) closeMenu();
  });
}

document.querySelectorAll('[data-quote-form]').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Cleaning quote request , ${data.get('city')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nLocation: ${data.get('city')}\nService: ${data.get('service')}\nDetails: ${data.get('details') || ','}`);
  window.location.href = `mailto:info@megaclean.com?subject=${subject}&body=${body}`;
}));

