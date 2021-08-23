import client from '../../../database/index.js'

import { bulk, search } from '../../../src/infra/elasticsearch.js'

describe('elasticsearch', () => {
  afterAll(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  describe('bulk', () => {
    test('expect to bulk all data', async () => {
      const index = 'test-index'
      const data = [{ test: 'test' }]

      client.helpers.bulk = jest.fn()

      await bulk({ index, data })

      expect(client.helpers.bulk).toHaveBeenCalledWith({
        datasource: data,
        onDocument: expect.any(Function)
      })
    })
  })

  describe('search', () => {
    test('expect to search all data', async () => {
      const indexes = ['test-index-1', 'test-index-2']
      const query = { }
      const pagination = { from: 0, size: 15 }

      client.search = jest.fn()

      await search({ indexes, query, pagination })

      expect(client.search).toHaveBeenCalledWith({
        body: {
          indices_boost: [
            {
              user_priority: 3,
            },
            {
              user_low_priority: 2,
            },
            {
              user: 1,
            },
          ],
          query: {
            query_string: {
              query: '*',
            },
          },
        },
        from: 0,
        index: [
          'test-index-1',
          'test-index-2',
        ],
        size: 15,
      })
    })

    test('expect to search all data with query', async () => {
      const indexes = ['test-index-1', 'test-index-2']
      const query = { username: 'test', name: 't' }
      const pagination = { from: 0, size: 15 }

      client.search = jest.fn()

      await search({ indexes, query, pagination })

      expect(client.search).toHaveBeenCalledWith({
        body: {
          indices_boost: [
            {
              user_priority: 3,
            },
            {
              user_low_priority: 2,
            },
            {
              user: 1,
            },
          ],
          query: {
            query_string: {
              query: 'username:test AND name:t',
            },
          },
        },
        from: 0,
        index: [
          'test-index-1',
          'test-index-2',
        ],
        size: 15,
      })
    })
  })
})
