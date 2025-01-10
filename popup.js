document.addEventListener('DOMContentLoaded', () => {
  const highlightsDiv = document.getElementById('highlights');

  chrome.storage.local.get({ highlights: [] }, (result) => {
    const highlights = result.highlights;

    if (highlights.length === 0) {
      highlightsDiv.textContent = 'No highlights saved.';
      return;
    }

    highlights.forEach((highlight) => {
      const div = document.createElement('div');
      div.className = 'highlight';
      div.innerHTML = `
        <p><strong>Text:</strong> ${highlight.text}</p>
        <p><strong>Page:</strong> <a href="${highlight.page}" target="_blank">${highlight.page}</a></p>
      `;
      highlightsDiv.appendChild(div);
    });
  });
});
