'use client'

import React from 'react'

export default function error({
    error,
    reset
}: {
    error: Error,
    reset: () => void
}) {
  return (
    <div>{error.message}</div>
  )
}
