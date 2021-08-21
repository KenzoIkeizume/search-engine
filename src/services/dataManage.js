import { readCsv, readText } from '../helpers/files.js'
import { bulk, search } from '../infra/elasticsearch.js'

const indexUser = 'user'
const indexPriorityUser = 'user_priority'
const indexLowPriorityUser = 'user_low_priority'

export const bulkData = async () => {
  const csvSource = './data/database.csv'
  const relevantlist1Source = './data/lista_relevancia_1.txt'
  const relevantlist2Source = './data/lista_relevancia_2.txt'

  const csv = await readCsv(csvSource)
  const index1 = await readText(relevantlist1Source)
  const index2 = await readText(relevantlist2Source)

  const userList = []
  const userPriorityList = []
  const userLowPriorityList = []

  csv.forEach(element => {
    if (index1.includes(element.id)) {
      userPriorityList.push(element)
    } else if (index2.includes(element.id)) {
      userLowPriorityList.push(element)
    } else {
      userList.push(element)
    }
  })

  const bulkUsers = await bulk({ index: indexUser, data: userList })
  const bulkPriorityUsers = await bulk({ index: indexPriorityUser, data: userPriorityList })
  const bulkLowPriorityUsers = await bulk({ index: indexLowPriorityUser, data: userLowPriorityList })

  return { bulkUsers, bulkPriorityUsers, bulkLowPriorityUsers }
}

export const searchData = async (query, pagination) => {
  const response = await search({ indexes: [indexUser, indexPriorityUser, indexLowPriorityUser], query, pagination })

  const { hits } = response.body.hits
  const hitsSource = hits.map((value) => value._source)

  return hitsSource
}
