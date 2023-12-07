"use client"

import { ReactNode, createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export type GlobalContextType = {
  user?: any
  darkMode?: boolean
  updateState: (newState: Partial<GlobalContextType>) => void
}

/**
 * These attributes are available to any component using
 * the React context API
 */
export const defaultGlobalContext: GlobalContextType = {
  user: null,
  darkMode: false,
  updateState: (newState: Partial<GlobalContextType>) => {},
}

/**
 * Use this context declaration in any component to use
 * the values in global context
 */
export const GlobalContext =
  createContext<GlobalContextType>(defaultGlobalContext)

export type GlobalState = {
  darkMode?: boolean
}
/**
 * This is a wrapper for the context provider to house
 * the state being used in the global context
 */
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GlobalState>({})
  const darkModeFromCookies = Cookies.get('darkMode')

  const updateState = (newState: Partial<GlobalContextType>) => {
    const updatedState = { ...state, ...newState }
    setState(updatedState)
    Cookies.set('darkMode', updatedState.darkMode + '')
  }

  useEffect(() => {
    setState({ ...state, darkMode: darkModeFromCookies === 'true' })
  }, [darkModeFromCookies])

  return (
    <GlobalContext.Provider value={{ ...state, updateState }}>
      <div 
        className={state.darkMode ? 'dark' : ''}
        style={{
          height: '100vh',
          width: '100vw',
          backgroundColor: 'hsl(var(--background))'
        }}
      >
        {children}
      </div>
    </GlobalContext.Provider>
  )
}
