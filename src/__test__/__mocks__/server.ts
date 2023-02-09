import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const GET_TRANSACTION_API = process.env.REACT_APP_GET_TRANSACTION_API || ''

const server = setupServer(
  rest.get(GET_TRANSACTION_API, (req, res, ctx) => {
    return res(ctx.json([{
      id: 0,
      amount: -2008.75,
      beneficiary: "Callie Nieves",
      account: "PL10104092290785174000000000",
      address: "185 Berkeley Place, Brady, West Virginia, 7409",
      date: "2021-12-15T01:05:42",
      description: "Amet amet qui proident sint esse adipisicing amet."
    }]))
  }),
)

export { server, GET_TRANSACTION_API }