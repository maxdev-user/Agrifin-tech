DROP TABLE IF EXISTS users;

-- Users (Agents, Admins, Investors)
CREATE TABLE users (
  id SERIAL PRIMARY KEY, -- Automatically generated unique ID
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- SHA256 hashes are 64 characters long
  role VARCHAR(20) CHECK (role IN ('admin', 'agent', 'investor')) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
