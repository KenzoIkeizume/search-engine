import { response } from '../helpers/http'

export const ok = async (req, res) => {
  try {
    res.status(200).json(response(200, 'ok'))
  } catch (err) {
    res.status(400).json(response(400, [{ message: 'config error' }]))
  }
}
