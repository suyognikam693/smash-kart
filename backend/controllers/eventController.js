const db = require('../config/db');

exports.getAllEvents = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM events ORDER BY date ASC');
    res.json({ success: true, events: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error fetching events' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, event: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getEventPlayers = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT u.name, u.uid as smash_kart_id, r.status
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      WHERE r.event_id = $1
    `;
    const result = await db.query(query, [id]);
    res.json({ success: true, players: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error getting players' });
  }
};

exports.joinEventRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query; // Because we don't have auth, expecting email via query string

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email required for authorization' });
    }

    // 1. Check Event
    const eventParams = await db.query('SELECT status, match_link FROM events WHERE id = $1', [id]);
    if (eventParams.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    const event = eventParams.rows[0];

    // 2. Check User's registration
    const userReg = await db.query(`
      SELECT r.id FROM registrations r
      JOIN users u ON r.user_id = u.id
      WHERE r.event_id = $1 AND u.email = $2
    `, [id, email]);

    if (userReg.rows.length === 0) {
      return res.status(403).json({ success: false, message: 'Access denied: Not registered for this event' });
    }

    if (event.status !== 'live') {
      return res.status(403).json({ success: false, message: 'Access denied: Event is not live yet' });
    }

    // Pass
    res.json({ success: true, match_link: event.match_link });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error attempting to join room' });
  }
};
