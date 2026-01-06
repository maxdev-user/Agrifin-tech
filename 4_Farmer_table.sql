CREATE EXTENSION IF NOT EXISTS postgis;

DROP TABLE IF EXISTS Farmer;

-- The Farmer table has a geometry column (Point in WGS84)
CREATE TABLE Farmer (
	id SERIAL PRIMARY KEY,
	farmer_id VARCHAR(100) NOT NULL, -- Unique
	name VARCHAR(100) NOT NULL, -- Full name
	address JSONB NOT NULL, -- Region, Zone, Woreda, Kebele
	gps_boundary GEOMETRY(Point, 4326), -- Geometry type and SRID for Farm polygon
	id_number VARCHAR(100), -- Optional National ID
	contact VARCHAR(20), -- Phone number
	agent_id VARCHAR(20), -- Linked agent
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Registration date
);