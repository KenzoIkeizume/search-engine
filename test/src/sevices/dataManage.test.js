import { bulkData, searchData } from '../../../src/services/dataManage.js'
import * as elasticsearch from '../../../src/infra/elasticsearch.js'
import * as files from '../../../src/helpers/files.js'

describe('data manage', () => {
  afterAll(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  describe('search data', () => {
    test('expect to return the list of searchs', async () => {
      elasticsearch.search = jest.fn().mockReturnValue({
        body: {
          hits: {
            hits: [
              {
                _index: 'user',
                _type: '_doc',
                _id: 'OYRiaHsBP73JBL0ONjtF',
                _score: 7.3979673,
                _source: {
                  id: 'cd46734a-c099-4a35-859e-9ef6ef9e3e7f',
                  name: 'Everson Eleuterio',
                  username: 'eversoneleuterio'
                }
              },
              {
                _index: 'user',
                _type: '_doc',
                _id: 'mIRiaHsBP73JBL0ONktl',
                _score: 7.3979673,
                _source: {
                  id: 'a6cb5807-d1ec-4f3d-9408-e17a36497a33',
                  name: 'Everson Fariaa',
                  username: 'everson.fariaa'
                }
              },
              {
                _index: 'user',
                _type: '_doc',
                _id: 'EYRiaHsBP73JBL0ONlBq',
                _score: 7.3979673,
                _source: {
                  id: 'cf75b3d5-c9c3-4e84-9a01-f529523133bf',
                  name: 'Everson Alves',
                  username: 'eversonalves'
                }
              },
              {
                _index: 'user',
                _type: '_doc',
                _id: 'ZYRiaHsBP73JBL0ONjtG',
                _score: 6.2375784,
                _source: {
                  id: 'ec2bdd96-8f03-48c1-b2fe-e41be06d56d8',
                  name: 'Everson Najal Grucci',
                  username: 'everson.najal.grucci'
                }
              },
              {
                _index: 'user',
                _type: '_doc',
                _id: '84RiaHsBP73JBL0ONkBU',
                _score: 6.2375784,
                _source: {
                  id: '46f14bcc-2a6b-4a60-93f8-53f7ff3bbf76',
                  name: 'Everson Barbiere Ceriaco',
                  username: 'everson.barbiere.ceriaco'
                }
              },
              {
                _index: 'user',
                _type: '_doc',
                _id: 'RYRiaHsBP73JBL0ONk1n',
                _score: 6.2375784,
                _source: {
                  id: 'e05a15fd-b0d1-40dd-9a30-318f64a904d5',
                  name: 'Everson Sily Cometti',
                  username: 'everson.sily.cometti'
                }
              },
              {
                _index: 'user',
                _type: '_doc',
                _id: 'MoRiaHsBP73JBL0ONlRv',
                _score: 6.2375784,
                _source: {
                  id: '39cd942d-c650-4eb0-a8bd-a1731e8f58c5',
                  name: 'Everson Freisleben Puziol',
                  username: 'everson.freisleben.puziol'
                }
              }
            ]
          }
        }
      })

      const query = { name: 'Everson' }
      const pagination = { from: 0, size: 15 }
      const data = await searchData(query, pagination)
      
      expect(data).toEqual([
        {
          id: 'cd46734a-c099-4a35-859e-9ef6ef9e3e7f',
          name: 'Everson Eleuterio',
          username: 'eversoneleuterio'
        },
        {
          id: 'a6cb5807-d1ec-4f3d-9408-e17a36497a33',
          name: 'Everson Fariaa',
          username: 'everson.fariaa'
        },
        {
          id: 'cf75b3d5-c9c3-4e84-9a01-f529523133bf',
          name: 'Everson Alves',
          username: 'eversonalves'
        },
        {
          id: 'ec2bdd96-8f03-48c1-b2fe-e41be06d56d8',
          name: 'Everson Najal Grucci',
          username: 'everson.najal.grucci'
        },
        {
          id: '46f14bcc-2a6b-4a60-93f8-53f7ff3bbf76',
          name: 'Everson Barbiere Ceriaco',
          username: 'everson.barbiere.ceriaco'
        },
        {
          id: 'e05a15fd-b0d1-40dd-9a30-318f64a904d5',
          name: 'Everson Sily Cometti',
          username: 'everson.sily.cometti'
        },
        {
          id: '39cd942d-c650-4eb0-a8bd-a1731e8f58c5',
          name: 'Everson Freisleben Puziol',
          username: 'everson.freisleben.puziol'
        }
      ])
    })

    test('expect to return empty list of searchs', async () => {
      elasticsearch.search = jest.fn().mockReturnValue({
        body: {
          hits: {
            hits: []
          }
        }
      })

      const query = { name: 'Everson Pereira' }
      const pagination = { from: 0, size: 15 }
      const data = await searchData(query, pagination)
      
      expect(data).toEqual([])
    })
  })

  describe('bulk data', () => {
    test('expect to bulk all data', async () => {
      const data = [
        {
          id: 'cd46734a-c099-4a35-859e-9ef6ef9e3e7f',
          name: 'Everson Eleuterio',
          username: 'eversoneleuterio'
        },
        {
          id: 'a6cb5807-d1ec-4f3d-9408-e17a36497a33',
          name: 'Everson Fariaa',
          username: 'everson.fariaa'
        },
        {
          id: 'cf75b3d5-c9c3-4e84-9a01-f529523133bf',
          name: 'Everson Alves',
          username: 'eversonalves'
        }
      ]

      elasticsearch.bulk = jest.fn()

      files.readCsv = jest.fn().mockReturnValue(data)
      files.readText = jest.fn().mockReturnValueOnce(['a6cb5807-d1ec-4f3d-9408-e17a36497a33'])
        .mockReturnValueOnce(['cf75b3d5-c9c3-4e84-9a01-f529523133bf'])

      await bulkData()

      expect(elasticsearch.bulk).toHaveBeenCalledTimes(3)
      expect(elasticsearch.bulk.mock.calls[0]).toEqual([{ data: [data[0]], index: 'user'}])
      expect(elasticsearch.bulk.mock.calls[1]).toEqual([{ data: [data[1]], index: 'user_priority'}])
      expect(elasticsearch.bulk.mock.calls[2]).toEqual([{ data: [data[2]], index: 'user_low_priority'}])
    })
  })
})
