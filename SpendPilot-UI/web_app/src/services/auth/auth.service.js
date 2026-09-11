import { create } from 'zustand'
import api from '../../config/httprequest.js'

export const useAuthStore = create((set, get) => ({


  user: JSON.parse(localStorage.getItem('user') || 'null'),
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      const { data: connData } = await api.get('/auth/check-connection')
      const user = connData.user
      localStorage.setItem('user', JSON.stringify(user))

      set({
        user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      return user
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur de connexion'
      set({ isLoading: false, error: message })
      throw new Error(message)
    }
  },


  register: async (firstName, lastName, email, password) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.post('/auth/register', { firstName, lastName, email, password })
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      const { data: connData } = await api.get('/auth/check-connection')
      const user = connData.user
      localStorage.setItem('user', JSON.stringify(user))

      set({
        user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      return user
    } catch (err) {
      const message = err.response?.data?.message || "Erreur d'inscription"
      set({ isLoading: false, error: message })
      throw new Error(message)
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    })
  },

  checkConnection: async () => {
    try {
      const { data } = await api.get('/auth/check-connection')
      const user = data.user
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, isAuthenticated: true })
      return user
    } catch {
      get().logout()
      return null
    }
  },



}));

