import { response } from '../../../src/helpers/http.js'

describe('helpers', () => {
  afterAll(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  describe('http', () => {
    test('expect to return error when response is 400', async () => {
      const status = 400
      const params = ['test']

      const res = response(status, params)

      expect(res).toEqual({errors: params, statusCode: status})
    })

    test('expect to return success when response is 200', async () => {
      const status = 200
      const params = ['test']

      const res = response(status, params)

      expect(res).toEqual({errors: [], data: params, statusCode: status})
    })

    test('expect to return success with pagination when response is 200', async () => {
      const status = 200
      const params = ['test']
      const pagination = { from: 0, size: 15 }

      const res = response(status, params, pagination)

      expect(res).toEqual({errors: [], data: params, statusCode: status, ...pagination })
    })
  })
})
