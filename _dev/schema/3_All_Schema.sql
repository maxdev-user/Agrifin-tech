
-- Users (Agents, Admins, Investors)
CREATE TABLE users (
  id SERIAL PRIMARY KEY, -- Automatically generated unique ID
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- SHA256 hashes are 64 characters long
  role VARCHAR(20) CHECK (role IN ('admin', 'agent', 'investor')) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- The Farmer table has a geometry column (Point in WGS84)
CREATE TABLE farmer (
	id SERIAL PRIMARY KEY,
	farmer_id VARCHAR(100) UNIQUE NOT NULL, -- Unique
	name VARCHAR(100) NOT NULL, -- Full name
	address JSONB NOT NULL, -- Region, Zone, Woreda, Kebele
	gps_boundary GEOMETRY(Point, 4326), -- Geometry type and SRID for Farm polygon
	id_number VARCHAR(100), -- Optional National ID
	contact VARCHAR(20), -- Phone number
	agent_id VARCHAR(20), -- Linked agent
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Registration date
);

-- Contract table
CREATE TABLE contract (
	contract_id VARCHAR(20) NOT NULL, -- Unique contract ID
	farmer_id VARCHAR(100) REFERENCES farmer(farmer_id) NOT NULL, -- Linked farmer
	type VARCHAR(30) CHECK (type IN ('feed_farming', 'animal_husbandry')) NOT NULL, -- Feed Farming / Animal Husbandry
	start_date DATE NOT NULL, -- Start of contract
	end_date DATE NOT NULL, -- End of contract
	financing_value DECIMAL(12,2), -- ETB (Ethiopian Birr) amount
	repayment_method VARCHAR(20) CHECK (repayment_method IN ('produce', 'cash')) NOT NULL, -- Produce / Cash
	signed_contract BYTEA -- PDF
);

-- Farmers / SMEs
CREATE TABLE entities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(20) CHECK (type IN ('farmer', 'cooperative', 'sme')),
  phone VARCHAR(20),
  gps_lat DECIMAL(9,6),
  gps_lng DECIMAL(9,6),
  kyc_verified BOOLEAN DEFAULT false,
  created_by_agent_id INTEGER REFERENCES users(id)
);

-- Financing Requests
CREATE TABLE financing_requests (
  id SERIAL PRIMARY KEY,
  entity_id INTEGER REFERENCES entities(id),
  amount DECIMAL(12,2),
  purpose TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  approved_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products (Forage/Silage)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(50), -- e.g., "alfalfa silage"
  quantity_kg DECIMAL(12,2),
  price_per_kg DECIMAL(10,2),
  seller_id INTEGER REFERENCES entities(id),
  available BOOLEAN DEFAULT true
);

-- Partners
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(30) CHECK (type IN ('bank', 'impact_investor', 'buyer', 'private_equity')), -- 'bank', 'impact_investor', 'buyer', 'private_equity'
  contact_email VARCHAR(100)
);
