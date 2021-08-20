import { response } from '../helpers/http'
import { bulkData } from '../services/dataManage'

export const uploudDatabase = async (req, res) => {
  try {
    const data = await bulkData()

    res.status(200).json(response(200, { data }))
  } catch (err) {
    console.error(err)
    res.status(500).json(response(500, [{ message: 'config error' }]))
  }
}
