//Hamburger menu function
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
  console.log('Menu toggled:', menu.classList.contains('active') ? 'Opened' : 'Closed');
}