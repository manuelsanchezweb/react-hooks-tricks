import { useState, useEffect } from 'react'

/**
 * A custom React hook that returns a debounced version of the passed value.
 *
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds.
 *
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  // Internal state to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set up a timer that updates the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function: this will cancel the previous timer whenever the value or delay changes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
