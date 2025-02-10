// cookie-consent/src/hooks/use-cookie-storage.ts
import { useCallback, useEffect, useState } from 'react';

interface CookieOptions {
  path?: string;
  expires?: Date | number;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export function useCookieStorage<T>(
  key: string,
  initialValue: T,
  options: CookieOptions = {}
): [T, (value: T) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from cookie by key
      const item = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${key}=`));

      if (item) {
        const value = item.split('=')[1];
        return JSON.parse(decodeURIComponent(value));
      }

      return initialValue;
    } catch (error) {
      console.error('Error reading cookie:', error);
      return initialValue;
    }
  });

  // Function to serialize cookie options
  const serializeCookieOptions = useCallback((options: CookieOptions): string => {
    const parts: string[] = [];

    if (options.path) parts.push(`path=${options.path}`);
    if (options.domain) parts.push(`domain=${options.domain}`);
    if (options.maxAge) parts.push(`max-age=${options.maxAge}`);
    if (options.expires) {
      const expiresValue = typeof options.expires === 'number'
        ? new Date(options.expires).toUTCString()
        : options.expires.toUTCString();
      parts.push(`expires=${expiresValue}`);
    }
    if (options.secure) parts.push('secure');
    if (options.sameSite) parts.push(`samesite=${options.sameSite}`);

    return parts.length > 0 ? `; ${parts.join('; ')}` : '';
  }, []);

  // Return a wrapped version of useState's setter function that persists the new value to cookies
  const setValue = useCallback((value: T) => {
    try {
      // Save state
      setStoredValue(value);

      // Save to cookie
      const serializedValue = encodeURIComponent(JSON.stringify(value));
      const cookieOptions = serializeCookieOptions(options);
      document.cookie = `${key}=${serializedValue}${cookieOptions}`;
    } catch (error) {
      console.error('Error saving cookie:', error);
    }
  }, [key, options, serializeCookieOptions]);

  // Subscribe to changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: Event) => {
      if (e instanceof StorageEvent && e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error('Error parsing cookie value:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
