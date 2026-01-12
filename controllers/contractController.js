// @desc Get all contracts
// @route GET /api/contracts
// @access public
export const getContracts = (req, res) => {
  // @TODO
  res.status(200).json({message:'Get all contracts.'});
};

// @desc Create all contracts
// @route POST /api/contracts
// @access public
export const createContract = (req, res) => {
  // @NOTE1: type and repayment_method are user defined enumerations
  // @TODO: evaluate enum entries
  // @NOTE2: the signed_contract is a pdf binary content
  // @TODO: review the uploading mechanism and validation
  const {contract_id, farmer_id, type, start_date, end_date, financing_value, repayment_method, signed_contract} = req.body;
  if (!contract_id || !farmer_id || !type || !start_date || !end_date ||
      !financing_value || !repayment_method || !signed_contract) {
    res.status(400);
    throw new Error('One or more required fields are missing!');
  }
  // TEMP: return the same data for now to confirm that data was accepted
  // TODO: add more conditions to make local tests
  res.status(201).json(req.body);
};

// @desc Get contract
// @route GET /api/contracts
// @access public
export const getContract = (req, res) => {
  // @TODO
  res.status(200).json({message:`Get contract for ${req.params.id}`});
};

// @desc Update contract
// @route PUT /api/contracts
// @access public
export const updateContract = (req, res) => {
  // @TODO
  res.status(202).json({message:`Update contract for ${req.params.id}`});
};

// @desc Dete contract
// @route DELETE /api/contracts
// @access public
export const deleteContract = (req, res) => {
  // @TODO
  res.status(203).json({message:`Contract deleted for ${req.params.id}`});
};
