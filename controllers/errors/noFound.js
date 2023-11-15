export const noFound = (req, res) => {
  res.status(404).json({ message: `Whooops - Not found ${req.path}` });
};
