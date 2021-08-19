import { response } from '../helpers/http'
import { readCsv, readText } from '../services/config'

export const uploudDatabase = async (req, res) => {
  try {
    const csvSource = './data/database.csv'
    const relevantlist1Source = './data/lista_relevancia_1.txt'
    const relevantlist2Source = './data/lista_relevancia_2.txt'

    const csv = await readCsv(csvSource)
    const index1 = await readText(relevantlist1Source)
    const index2 = await readText(relevantlist2Source)

    res.status(200).json(response(200, {
      csv,
      index1,
      index2
    }))
  } catch (err) {
    console.error(err)
    res.status(400).json(response(400, [{ message: 'config error' }]))
  }
}
