export const paginationInterceptor = (req, res, next) => {
  const { from = 0, size = 15 } = req.query

  let fromNumber = parseInt(from)
  let sizeNumber = parseInt(size)

  fromNumber = (!isNaN(fromNumber) && fromNumber > 0) ? fromNumber : 0
  sizeNumber = (!isNaN(sizeNumber) && sizeNumber > 0) ? sizeNumber : 15

  req.query.pagination = {
    from: fromNumber,
    size: sizeNumber
  }

  delete req.query.from
  delete req.query.size

  res.from = fromNumber
  res.size = sizeNumber

  next()
}
