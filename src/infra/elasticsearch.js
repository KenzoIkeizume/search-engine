import client from '../../database'

export const bulk = async (index, data) => {
  return client.helpers.bulk({
    datasource: data,
    onDocument () {
      return {
        index: { _index: index }
      }
    }
  })
}
