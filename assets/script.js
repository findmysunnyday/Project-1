function lightRandomRed() {
  // Remove 'highlight' from any currently highlighted item
  document.querySelectorAll('.highlight').forEach(item => item.classList.remove('highlight'));

  // Select all grid items
  const gridItems = document.querySelectorAll('.grid-item');

  // Generate a random index for the grid items
  const randomIndex = Math.floor(Math.random() * gridItems.length);

  // Apply the 'highlight' class to the randomly selected grid item
  gridItems[randomIndex].classList.add('highlight');
}

// Light up a random grid item when the page loads
lightRandomRed();

// Optional: Change the red light every 1 second
setInterval(lightRandomRed, 750);