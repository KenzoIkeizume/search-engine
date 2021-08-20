import { response } from '../helpers/http'

import { searchData } from '../services/dataManage'

export const list = async (req, res) => {
  try {
    const { pagination, ...rest } = req.query

    const data = await searchData(rest, pagination)

    res.status(200).json(response(200, [...data], pagination))
  } catch (err) {
    console.error(err)
    res.status(500).json(response(500, [{ message: 'user error' }]))
  }
}
