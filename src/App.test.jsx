import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('birthday scrapbook app', () => {
  it('opens the experience and completes the hidden-heart game', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /Open it/i })[0])

    const hearts = screen.getAllByRole('button', { name: /Hidden heart/i })
    expect(hearts).toHaveLength(5)

    hearts.forEach((heart) => fireEvent.click(heart))

    expect(screen.getByText(/Found: 5 \/ 5/i)).toBeInTheDocument()
    expect(screen.getByText(/I think I found the best one already/i)).toBeInTheDocument()
  })

  it('reveals the letter and will trigger a wish note', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: /Open it/i })[0])

    expect(screen.getAllByText(/Happy Birthday,/i)[0]).toBeInTheDocument()
    const wishButtons = screen.getAllByRole('button', { name: /I made my wish/i })
    fireEvent.click(wishButtons[0])
    expect(screen.getByText(/I hope it comes true/i)).toBeInTheDocument()
  })

  it('opens a text message with the checked future memories', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: /Open it/i })[0])
    fireEvent.click(screen.getByRole('button', { name: 'Mark take a random trip' }))

    const sendPicksLink = screen.getByRole('link', { name: /Send me your picks/i })
    expect(sendPicksLink).toHaveAttribute(
      'href',
      `sms:+919106129458?body=${encodeURIComponent("Nandu's picks for us:\n- take a random trip")}`,
    )
  })
})
