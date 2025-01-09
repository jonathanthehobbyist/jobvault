// Create the sidebar container
const sidebar = document.createElement('div');
sidebar.id = 'my-sidebar';
document.body.appendChild(sidebar);

// Load the sidebar HTML content
fetch(chrome.runtime.getURL('sidebar.html'))
  .then(response => response.text())
  .then(html => {
    sidebar.innerHTML = html;

    // Add event listener for the close button
    document.getElementById('close-sidebar').addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  });

// Add a button to toggle the sidebar
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Sidebar';
toggleButton.style.position = 'fixed';
toggleButton.style.top = '10px';
toggleButton.style.right = '10px';
toggleButton.style.zIndex = '10001';
document.body.appendChild(toggleButton);

// Toggle sidebar visibility
toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
