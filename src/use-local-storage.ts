import { useSyncExternalStore, useCallback, useMemo } from 'react'
import superjson from 'superjson'

export type StorageWrapper<T> =
  | {
      type: 'value'
      value: T
    }
  | {
      type: 'cleared'
    }

/**
 * A custom React hook that provides synchronized access to localStorage with automatic serialization.
 *
 * This hook handles saving and retrieving data from the browser's localStorage,
 * including serialization with superjson to handle complex data types. It also
 * maintains synchronization across components and browser tabs via event listeners.
 *
 * @template T The type of data being stored
 * @param {string} key The key to use for storing in localStorage
 * @param {T} [initialValue] Optional default value to use when no value is stored
 * @returns {readonly [T | undefined, (value: T) => void, () => void]} A tuple containing:
 *   - The current stored value (or initialValue if nothing is stored)
 *   - A function to update the stored value
 *   - A function to clear the stored value
 *
 * @example
 * // Store and manage a user's preferences
 * const [preferences, setPreferences, clearPreferences] = useLocalStorage('user-prefs', { theme: 'dark' });
 *
 * // Later, update preferences
 * setPreferences({ ...preferences, theme: 'light' });
 */
export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const getSnapshot = useCallback(() => {
    return localStorage.getItem(key)
  }, [key])

  const getServerSnapshot = useCallback(() => null, [])

  const subscribe = useCallback(
    (onChange: () => void) => {
      const onStorageEvent = (e: Event) => {
        const customEvent = e as CustomEvent
        if (customEvent.detail.key === key) {
          onChange()
        }
      }
      window.addEventListener('storage', onChange)
      window.addEventListener(
        'local-storage-change',
        onStorageEvent as EventListener,
      )
      return () => {
        window.removeEventListener('storage', onChange)
        window.removeEventListener(
          'local-storage-change',
          onStorageEvent as EventListener,
        )
      }
    },
    [key],
  )

  const rawData = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const data = useMemo(() => {
    if (!rawData) {
      return initialValue
    }
    try {
      const parsed = superjson.parse(rawData) as StorageWrapper<T>
      if (parsed.type === 'cleared') {
        return undefined
      }
      return parsed.value
    } catch {
      return initialValue
    }
  }, [rawData, initialValue])

  const setData = useCallback(
    (value: T) => {
      const wrapper: StorageWrapper<T> = {
        type: 'value',
        value,
      }
      localStorage.setItem(key, superjson.stringify(wrapper))
      window.dispatchEvent(
        new CustomEvent('local-storage-change', { detail: { key } }),
      )
    },
    [key],
  )

  const clearData = useCallback(() => {
    const wrapper: StorageWrapper<T> = {
      type: 'cleared',
    }
    localStorage.setItem(key, superjson.stringify(wrapper))
    window.dispatchEvent(
      new CustomEvent('local-storage-change', { detail: { key } }),
    )
  }, [key])

  return useMemo(
    () => [data, setData, clearData] as const,
    [data, setData, clearData],
  )
}
