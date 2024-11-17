//Hamburger menu function
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
}

function toggleDropdown(event) {
  event.preventDefault();
  const dropdown = event.target.closest('.dropdown');

  if (dropdown.classList.contains('active')) {
      dropdown.classList.remove('active');
  } else {
      dropdown.classList.add('active');
  }
}