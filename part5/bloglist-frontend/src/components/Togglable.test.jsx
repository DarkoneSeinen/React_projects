import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('renders its children but they are hidden by default', () => {
    render(
      <Togglable buttonLabel="show">
        <div>togglable content</div>
      </Togglable>
    )

    // El contenido debe existir pero no ser visible
    const content = screen.getByText('togglable content')
    expect(content).not.toBeVisible()
  })

  it('shows the content when the button is clicked', async () => {
    render(
      <Togglable buttonLabel="show">
        <div>togglable content</div>
      </Togglable>
    )

    const button = screen.getByText('show')
    await user.click(button)

    const content = screen.getByText('togglable content')
    expect(content).toBeVisible()
  })

  it('hides the content when cancel button is clicked', async () => {
    render(
      <Togglable buttonLabel="show">
        <div>togglable content</div>
      </Togglable>
    )

    await user.click(screen.getByText('show'))
    await user.click(screen.getByText('cancel'))

    const content = screen.getByText('togglable content')
    expect(content).not.toBeVisible()
  })
})
