'use client';

import { useEffect } from 'react';

export function TimezoneSync() {
  useEffect(() => {
    // Get timezone (e.g., "America/Chicago")
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Save it in a cookie that lasts for a year
    document.cookie = `user-tz=${tz}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  return null;
}