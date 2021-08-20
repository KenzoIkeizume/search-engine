import { response } from '../helpers/http'

import { searchData } from '../services/dataManage'

export const list = async (req, res) => {
  try {
    const query = req.query
    const data = await searchData(query)

    res.status(200).json(response(200, { data }))
  } catch (err) {
    console.error(err)
    res.status(500).json(response(500, [{ message: 'user error' }]))
  }
}
