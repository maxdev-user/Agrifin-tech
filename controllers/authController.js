export const isAuth = (req, res) => {
  // @TODO
  res.status(200).json({message:'Authenticated'});
};

export const setAuth = (req, res) => {
  res.status(200).json({message: 'to be authenticated'});
};

export const delAuth = (req, res) => {
  res.status(200).json({message: 'delete authentication'});
};
