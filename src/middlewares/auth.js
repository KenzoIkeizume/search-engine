import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { response } from '../helpers/http.js'

dotenv.config()

const { API_AUTH_SECRET, API_AUTH_EXPIRE_IN } = process.env

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json(response(401, ['unauthorized']))
  }

  jwt.verify(token, API_AUTH_SECRET, { ignoreExpiration: false }, (err, user) => {
    if (err) {
      console.log('Error in generate Token: ', err.name)
      return res.status(403).json(response(403, ['invalid token']))
    }

    next()
  })
}

export const generateToken = (req, res) => {
  const token = jwt.sign({ ...req.body }, API_AUTH_SECRET, { expiresIn: API_AUTH_EXPIRE_IN })

  res.status(200).json(response(200, { token }))
}
