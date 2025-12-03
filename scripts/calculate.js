const axios = require('axios');

async function getGitHubData(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/events/public`,
      {
        headers: {
          'User-Agent': 'GitHub-Streak-Stats'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data for ${username}`);
  }
}

function calculateStreakFromEvents(events) {
  const today = new Date();
  const dates = new Set();
  
  events.forEach(event => {
    if (event.type === 'PushEvent') {
      const date = new Date(event.created_at).toISOString().split('T')[0];
      dates.add(date);
    }
  });

  const sortedDates = Array.from(dates).sort();
  let currentStreak = 0;
  let checkingDate = new Date(today);
  
  while (true) {
    const dateStr = checkingDate.toISOString().split('T')[0];
    if (dates.has(dateStr)) {
      currentStreak++;
      checkingDate.setDate(checkingDate.getDate() - 1);
    } else {
      break;
    }
  }

  let maxStreak = 0;
  let currentMax = 0;
  let lastDate = null;
  
  sortedDates.forEach(date => {
    if (!lastDate || isConsecutive(lastDate, date)) {
      currentMax++;
    } else {
      currentMax = 1;
    }
    maxStreak = Math.max(maxStreak, currentMax);
    lastDate = date;
  });

  return {
    current_streak: currentStreak,
    longest_streak: maxStreak,
    total_contributions: dates.size,
    today_contributions: dates.has(today.toISOString().split('T')[0]) ? 1 : 0
  };
}

function isConsecutive(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setDate(d1.getDate() + 1);
  return d1.toISOString().split('T')[0] === d2.toISOString().split('T')[0];
}

async function calculateStreak(username) {
  const events = await getGitHubData(username);
  return calculateStreakFromEvents(events);
}

module.exports = { calculateStreak };