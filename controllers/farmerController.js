// @desc Get all farmers
// @route GET /api/farmers
// @access public
export const getFarmers = (req, res) => {
  // @TODO
  res.status(200).json({message:'Get all farmers.'});
};

// @desc Create all farmers
// @route POST /api/farmers
// @access public
export const createFarmer = (req, res) => {
  const {name, address, gps_boundary, id_number, contact, agent_id} = req.body;
  if (!name || !address || !address.Region || !address.Zone ||
      !address.Woreda || !address.Kebele || 
      !gps_boundary || !id_number || !contact || !agent_id) {
    res.status(400);
    throw new Error('One or more required fields are missing!');
  }
  // TEMP: return the same data for now to confirm that data was accepted
  // TODO: add more conditions to make local tests
  res.status(201).json(req.body);
};

// @desc Get farmer
// @route GET /api/farmers
// @access public
export const getFarmer = (req, res) => {
  // @TODO
  res.status(200).json({message:`Get farmer for ${req.params.id}`});
};

// @desc Update farmer
// @route PUT /api/farmers
// @access public
export const updateFarmer = (req, res) => {
  // @TODO
  res.status(202).json({message:`Update farmer for ${req.params.id}`});
};

// @desc Dete farmer
// @route DELETE /api/farmers
// @access public
export const deleteFarmer = (req, res) => {
  // @TODO
  res.status(203).json({message:`Farmer deleted for ${req.params.id}`});
};
