DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Automatically generated unique ID
    name VARCHAR(48) NOT NULL,
    password_hash CHAR(64) NOT NULL, -- SHA256 hashes are 64 characters long
    roles user_role[] DEFAULT '{}', -- Array field to store multiple roles
    user_type user_type NOT NULL -- Single field for user type
);