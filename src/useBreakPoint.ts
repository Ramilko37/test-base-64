'use client'

import { useBreakpointValue } from '@chakra-ui/react'

export function useBreakPoint<T = any>(values: Partial<Record<string, T>> | T[]): T | undefined {
  if (typeof window === 'undefined') {
    return useBreakpointValue(values)
  }
  return useBreakpointValue(values, { ssr: false })
}
