export class ErrorHandler {

  static getMiddleware () {
    return (err, req, res, next) => {
      if (!err) return next()
      res.status(err.status || 500)
      if (err.message) return res.json({ message: err.message })

      const errorMsg = process.env.NODE_ENV === 'production' ? { message: 'Something broke!' } : err
      return res.json(errorMsg)
    }
  }
}
