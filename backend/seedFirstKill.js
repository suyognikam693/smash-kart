const db = require('./config/db');

async function seedFirstKillEvent() {
  const newEvent = {
    title: 'First Kill',
    date: '2026-04-20',
    time: '12:30 pm',
    fee: 20.00,
    venue: 'SPIT Classroom',
    duration: '30 mins',
    rules: JSON.stringify({
      rules: [
        "First round would be between 2 teams red and blue",
        "Second round would be individual match between the members of the team winning first round"
      ]
    }),
    match_link: 'https://match.kartsmasher.com/first-kill',
    status: 'upcoming'
  };

  try {
    console.log('Inserting First Kill event...');
    await db.query(`
      INSERT INTO events (id, title, date, time, fee, venue, duration, rules, match_link, status) 
      VALUES ('evt-first-kill'::uuid, $1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT DO NOTHING
    `, [
      newEvent.title, newEvent.date, newEvent.time, newEvent.fee, newEvent.venue,
      newEvent.duration, newEvent.rules, newEvent.match_link, newEvent.status
    ]);
    console.log('Event successfully seeded!');
  } catch(err) {
    console.error('Error seeding event:', err);
  } finally {
    process.exit(0);
  }
}

seedFirstKillEvent();
