const db = require('../config/db');

exports.registerEvent = async (req, res) => {
  try {
    const { name, email, uid, event_id, transaction_id } = req.body;

    const screenshot_url = req.file ? `/uploads/${req.file.filename}` : null;

    // 1. Find or create user
    let userResult = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    let userId;

    if (userResult.rows.length === 0) {
      const crypto = require('crypto');
      const generatedId = crypto.randomUUID();
      const newUser = await db.query(
        'INSERT INTO users (id, name, email, uid) VALUES ($1, $2, $3, $4) RETURNING id',
        [generatedId, name, email, uid]
      );
      userId = newUser.rows[0].id;
    } else {
      userId = userResult.rows[0].id;
    }

    // 2. Register User to Event
    const insertReg = await db.query(
      `INSERT INTO registrations (user_id, event_id, transaction_id, screenshot_url) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [userId, event_id, transaction_id, screenshot_url]
    );

    res.status(201).json({ success: true, message: 'Registration submitted successfully', registration_id: insertReg.rows[0].id });

  } catch (err) {
    if (err && err.constraint === 'unique_user_event_registration') {
      return res.status(400).json({ success: false, message: 'User is already registered for this event!' });
    }
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error processing registration' });
  }
};

exports.getUserRegistrations = async (req, res) => {
  try {
    const { email } = req.params;
    
    const query = `
      SELECT e.*, r.status as reg_status, r.transaction_id
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      JOIN events e ON r.event_id = e.id
      WHERE u.email = $1
    `;
    const result = await db.query(query, [email]);
    res.json({ success: true, registrations: result.rows });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error fetching user registrations' });
  }
};
