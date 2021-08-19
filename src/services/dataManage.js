import { readCsv, readText } from '../helpers/files'
import { bulk } from '../infra/elasticsearch'

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

  const indexUser = 'user'
  const indexPriorityUser = 'user_priority'
  const indexLowPriorityUser = 'user_low_priority'

  const bulkUsers = await bulk(indexUser, userList)
  const bulkPriorityUsers = await bulk(indexPriorityUser, userPriorityList)
  const bulkLowPriorityUsers = await bulk(indexLowPriorityUser, userLowPriorityList)

  return { bulkUsers, bulkPriorityUsers, bulkLowPriorityUsers }
}
