function generateSVG(data, options = {}) {
  const {
    current_streak = 0,
    longest_streak = 0,
    total_contributions = 0,
    today_contributions = 0,
    theme = {},
    hide_border = false,
    background = 'transparent',
    fire_color = 'orange'
  } = options;

  const borderStyle = hide_border ? '' : `stroke="${theme.border || '#e1e4e8'}" stroke-width="1"`;
  const bgStyle = background === 'transparent' ? 'transparent' : 
                 background.includes('linear-gradient') ? 'url(#background)' : background;
  
  return `
    <svg width="400" height="170" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="background" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#610000;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="400" height="170" fill="${bgStyle}" ${borderStyle} rx="4"/>
      
      <text x="20" y="30" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${theme.text || '#24292e'}">
        GitVerse Contribution Streak
      </text>
      
      <g transform="translate(20, 60)">
        <text font-family="Arial, sans-serif" font-size="14" fill="${theme.text || '#24292e'}">
          Current streak:
        </text>
        <text x="120" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="${theme.primary || '#0366d6'}">
          ${current_streak} days
        </text>
        ${current_streak > 0 ? `<circle cx="180" cy="-2" r="6" fill="${fire_color}">
          <animate attributeName="r" values="6;8;6" dur="1s" repeatCount="indefinite"/>
        </circle>` : ''}
      </g>
      
      <g transform="translate(20, 90)">
        <text font-family="Arial, sans-serif" font-size="14" fill="${theme.text || '#24292e'}">
          Longest streak:
        </text>
        <text x="120" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="${theme.secondary || '#6f42c1'}">
          ${longest_streak} days
        </text>
      </g>
      
      <g transform="translate(20, 120)">
        <text font-family="Arial, sans-serif" font-size="14" fill="${theme.text || '#24292e'}">
          Total contributions:
        </text>
        <text x="150" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="${theme.primary || '#0366d6'}">
          ${total_contributions}
        </text>
      </g>
      
      <g transform="translate(20, 150)">
        <text font-family="Arial, sans-serif" font-size="14" fill="${theme.text || '#24292e'}">
          Today:
        </text>
        <text x="50" font-family="Arial, sans-serif" font-size="14" font-weight="bold" 
              fill="${today_contributions > 0 ? '#00ff00' : '#ff4444'}">
          ${today_contributions > 0 ? '✓' : '✗'}
        </text>
      </g>
      
      <g transform="translate(250, 60)">
        ${Array.from({length: Math.min(current_streak, 30)}).map((_, i) => `
          <rect x="${(i % 10) * 12}" y="${Math.floor(i / 10) * 12}" width="10" height="10" 
                fill="${i < current_streak ? theme.primary || '#0366d6' : '#e1e4e8'}" 
                rx="2"/>
        `).join('')}
      </g>
    </svg>
  `;
}

module.exports = { generateSVG };
