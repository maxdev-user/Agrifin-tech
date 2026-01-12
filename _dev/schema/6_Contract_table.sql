DROP TABLE IF EXISTS Contract;

-- Contract table
CREATE TABLE Contract (
	contract_id VARCHAR(20) NOT NULL, -- Unique contract ID
	farmer_id VARCHAR(100) NOT NULL, -- Linked farmer
	type contract_type NOT NULL, -- Feed Farming / Animal Husbandry
	start_date DATE NOT NULL, -- Start of contract
	end_date DATE NOT NULL, -- End of contract
	financing_value DECIMAL, -- ETB (Ethiopian Birr) amount
	repayment_method payment_method NOT NULL, -- Produce / Cash
	signed_contract BYTEA -- PDF
);