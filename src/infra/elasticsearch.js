import client from '../../database'

export const bulk = async ({ index, data }) => {
  return client.helpers.bulk({
    datasource: data,
    onDocument () {
      return {
        index: { _index: index }
      }
    }
  })
}

export const search = async ({ indexes, query }) => {
  const queryString = Object.entries(query).map((value) => value[0] + ':' + value[1])

  return client.search({
    index: indexes,
    body: {
      query: {
        query_string: {
          query: queryString.length ? queryString.join(' AND ') : '*'
        }
      },
      indices_boost: [
        { user_priority: 3.0 },
        { user_low_priority: 2.0 },
        { user: 1.0 }
      ]
    }
  })
}
