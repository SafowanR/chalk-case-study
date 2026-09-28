// Small markdown helper for club posts.
// Supports the handful of bits people actually type on a wall.

// PATCH: escape HTML before applying markdown so user-typed tags
// (<script>, <img onerror=...>, etc.) render as text instead of running.
function escapeHtml(src) {
  return src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// PATCH: only allow http(s), mailto, and site-relative links.
// Blocks javascript:, data:, vbscript:, etc.
function safeHref(url) {
  const trimmed = url.trim();
  if (/^(https?:\/\/|mailto:|\/)/i.test(trimmed)) return trimmed;
  return "#";
}

function renderMarkdown(src) {
  const text = String(src ?? "");

  return escapeHtml(text)
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, url) =>
      `<a href="${safeHref(url)}" rel="noopener noreferrer">${label}</a>`
    )
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/\n/g, "<br>");
}

module.exports = { renderMarkdown };
