-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    uid VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS events (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    fee NUMERIC(10,2) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    rules JSONB,
    match_link VARCHAR(1000),
    status VARCHAR(50) NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'ended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id VARCHAR(50) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    transaction_id VARCHAR(255) NOT NULL,
    screenshot_url VARCHAR(1000) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_event_registration UNIQUE (user_id, event_id)
);

-- Seed Initial Mock Events (Optional)
INSERT INTO events (id, title, date, time, fee, venue, duration, rules, match_link, status)
VALUES 
  ('evt-first-kill', 'First Kill', '2026-04-20', '12:30 pm', 20.00, 'SPIT Classroom', '30 mins', '{"rules":["First round would be between 2 teams red and blue","Second round would be individual match between the members of the team winning first round"]}', 'https://match.kartsmasher.com/first-kill', 'upcoming')
ON CONFLICT DO NOTHING;
