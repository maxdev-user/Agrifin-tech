-- Create the enumerations for each business logic driven type
DO $$
BEGIN
	-- User type
	IF NOT EXISTS (
		SELECT 1 FROM pg_type t
		JOIN pg_namespace n ON n.oid = t.typnamespace
		WHERE t.typname = 'user_type' AND n.nspname = 'public'
	) THEN
		CREATE TYPE user_type AS ENUM ('Admin', 'Agent', 'Partner', 'Investor', 'Farmer');
	END IF;
	-- User role type
	IF NOT EXISTS (
		SELECT 1 FROM pg_type t
		JOIN pg_namespace n ON n.oid = t.typnamespace
		WHERE t.typname = 'user_role' AND n.nspname = 'public'
	) THEN
		CREATE TYPE user_role AS ENUM ('Approver', 'User Manager', 'Reporting', 'Contract Manager', 'Activity Update', 'Payment Document', 'Metric Tracking', 'Repayment');
	END IF;
	-- Contract type
	IF NOT EXISTS (
		SELECT 1 FROM pg_type t 
		JOIN pg_namespace n ON n.oid = t.typnamespace
		WHERE t.typname = 'contract_type' AND n.nspname = 'public'
	) THEN
		CREATE TYPE contract_type AS ENUM ('Animal Feed Farming', 'Animal Husbandry');
	END IF;
	-- Payment method type
	IF NOT EXISTS (
		SELECT 1 FROM pg_type t 
		JOIN pg_namespace n ON n.oid = t.typnamespace
		WHERE t.typname = 'payment_method' AND n.nspname = 'public'
	) THEN
		CREATE TYPE payment_method AS ENUM ('Produce', 'Cash');
	END IF;
END
$$;