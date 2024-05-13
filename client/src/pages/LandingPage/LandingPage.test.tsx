// TODO
import { screen } from '@testing-library/react'
import LandingPage from './LandingPage'
import { useNavigate } from 'react-router-dom'
// import { http, HttpResponse, delay } from 'msw'
// import { setupServer } from 'msw/node'
import { renderWithProviders } from '../../test/test-utils'

const pfpUrl =
  'https://library.yale.edu/sites/default/files/styles/large/public/event-images/biglebowski.jpg?itok=a9SQRMFH'

// export const handlers = [
//   http.get('/api/v1/user/', async () => {
//     await delay(150)
//     return HttpResponse.json({
//       email: 'thedude@duderino.com',
//       firstName: 'El',
//       lastName: 'Duderino',
//       pfp: pfpUrl,
//     })
//   }),
// ]

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('LandingPage Test', () => {
  // console.log('💥 Store', store)
  // const mockNavigate = jest.fn()
  // const mockAuthFetch = jest.fn()
  // const server = setupServer(...handlers)
  const mockNavigate = jest.fn()

  // Enable API mocking before tests.
  // beforeAll(() => server.listen())

  beforeEach(() => {
    const mockUseNavigate = useNavigate as jest.Mock
    mockUseNavigate.mockReturnValue(mockNavigate)
  })

  // Reset any runtime request handlers we may add during the tests.
  // afterEach(() => server.resetHandlers())

  // Disable API mocking after the tests are done.
  // afterAll(() => server.close())

  // TODO Rewrite tests after component build
  it('Renders landing page correctly', async () => {
    renderWithProviders(<LandingPage />)
    expect(screen.getAllByText('Landing Page').length).toEqual(4)
  })

  it('Navigate to Home page if user exists', async () => {
    renderWithProviders(<LandingPage />, {
      preloadedState: {
        user: {
          email: 'thedude@duderino.com',
          firstName: 'El',
          lastName: 'Duderino',
          pfp: pfpUrl,
          userType: 'gogo',
          loading: 'succeeded',
        },
      },
    })

    expect(mockNavigate).toHaveBeenCalledWith('/')
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })
})
