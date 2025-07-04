"use client"

// Mock Firebase implementation for v0 preview environment
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    callback(null)
    return () => {}
  },
}

const mockDb = {
  collection: () => ({
    doc: () => ({
      get: async () => ({
        exists: false,
        data: () => null,
      }),
    }),
  }),
}

// Simple function to check if we're in the browser
const isBrowser = typeof window !== "undefined"

// Export mock implementations that won't cause initialization errors
export const auth = mockAuth
export const db = mockDb

// Flag to indicate if we're using mock implementations
export const isMockFirebase = true

console.log("Using mock Firebase implementation for v0 preview")
