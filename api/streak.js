const { generateSVG } = require('../scripts/generate');
const { calculateStreak } = require('../scripts/calculate');
const themes = require('./themes');

module.exports = async (req, res) => {
  try {
    const { 
      user, 
      theme = 'default',
      hide_border = false,
      background = 'transparent',
      fire = 'orange'
    } = req.query;

    if (!user) {
      return res.status(400).json({ error: 'Missing "user" parameter' });
    }

    const streakData = await calculateStreak(user);
    const themeConfig = themes[theme] || themes.default;
    
    const svg = await generateSVG(streakData, {
      theme: themeConfig,
      hide_border: hide_border === 'true',
      background,
      fire_color: fire
    });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(svg);
    
  } catch (error) {
    console.error('Error:', error);
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(`
      <svg width="400" height="100">
        <rect width="400" height="100" fill="#f0f0f0"/>
        <text x="50%" y="50%" font-family="Arial" text-anchor="middle" fill="#666">
          Error: ${error.message}
        </text>
      </svg>
    `);
  }
};