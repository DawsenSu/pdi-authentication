module.exports = function (role) {
  return (req, res, next) => {
    if(req.user.role !== role) {
      return res.status(401).send({
        error: `${req.user.email} is Not allowed`
      })
    }
    next()
  }
}