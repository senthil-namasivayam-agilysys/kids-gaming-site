// FunZone: Kids Gaming Site - Dynamic Branding, Theme, and Games

async function loadJSON(path) {
  const response = await fetch(path);
  return await response.json();
}

async function applyBranding() {
  const branding = await loadJSON('data/branding.json');
  const theme = await loadJSON('data/theme.json');
  const gamesData = await loadJSON('data/games.json');

  // Set favicon
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon && branding.brand.logo.favicon) {
    favicon.href = branding.brand.logo.favicon;
  }

  // Header: Logo and nav
  const header = document.getElementById('site-header');
  header.innerHTML = `
    <img src="${branding.brand.logo.title}" alt="${branding.brand.organizationName} Logo" />
    <nav>
      <a href="#games-list">Games</a>
      <a href="#site-footer">Contact</a>
    </nav>
  `;

  // Hero: Title and slogan
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <h1>${gamesData.siteTitle}</h1>
    <div class="slogan">${branding.brand.slogan}</div>
    <div class="tagline">${gamesData.tagline}</div>
  `;

  // Countdown
  const countdown = document.getElementById('countdown');
  function updateCountdown() {
    const target = new Date(gamesData.countdownTarget);
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      countdown.textContent = 'The event has started!';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdown.textContent = `Next event in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Games List
  const gamesList = document.getElementById('games-list');
  gamesList.innerHTML = gamesData.games.map(game => `
    <div class="game-card">
      <img src="${game.thumb}" alt="${game.name} thumbnail" />
      <h2>${game.name}</h2>
      <div class="difficulty">Difficulty: ${game.difficulty}</div>
      <div class="description">${game.description}</div>
      <a href="${game.url}" target="_blank">Play Now</a>
    </div>
  `).join('');

  // Footer: Contact and social
  const footer = document.getElementById('site-footer');
  footer.innerHTML = `
    <div>Contact: <a href="mailto:${branding.brand.email}">${branding.brand.email}</a> | <a href="tel:${branding.brand.mobile}">${branding.brand.mobile}</a></div>
    <div style="margin-top:8px;">
      <a href="${branding.brand.socialMedia.linkedin}" target="_blank">LinkedIn</a>
      <a href="${branding.brand.socialMedia.instagram}" target="_blank">Instagram</a>
      <a href="${branding.brand.socialMedia.github}" target="_blank">GitHub</a>
      <a href="${branding.brand.socialMedia.x}" target="_blank">X</a>
      <a href="${branding.brand.socialMedia.youtube}" target="_blank">YouTube</a>
    </div>
  `;

  // Apply theme colors and font
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  root.style.setProperty('--font', theme.font);

  // TODO: student exercise: Add search/filter for games, animations, or accessibility features
}

document.addEventListener('DOMContentLoaded', applyBranding);
