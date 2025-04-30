import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// after each test, the jsdom is reset using cleanup()
afterEach(() => {
  cleanup()
})
