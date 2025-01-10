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

document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    // Show a prompt or button to save
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Highlight';
    saveButton.style.position = 'absolute';
    saveButton.style.top = `${event.clientY + window.scrollY}px`;
    saveButton.style.left = `${event.clientX}px`;
    saveButton.style.zIndex = 10000;
    saveButton.style.background = '#4CAF50';
    saveButton.style.color = '#fff';
    saveButton.style.border = 'none';
    saveButton.style.padding = '5px 10px';
    saveButton.style.cursor = 'pointer';
    document.body.appendChild(saveButton);

    // Save text on button click
    saveButton.addEventListener('click', () => {
      chrome.storage.local.get({ highlights: [] }, (result) => {
        const highlights = result.highlights;
        highlights.push({ text: selectedText, page: window.location.href });
        chrome.storage.local.set({ highlights }, () => {
          alert('Highlight saved!');
          saveButton.remove(); // Remove button after saving
        });
      });
    });

    // Remove button after a delay if not clicked
    setTimeout(() => saveButton.remove(), 5000);
  }
});
