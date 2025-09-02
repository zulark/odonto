// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/plugins/supabase'

export const useAuthStore = defineStore('auth', () => {
  // state: Onde guardamos os dados. Em JS, iniciamos com null.
  const user = ref(null)

  // getter: A lógica do computed continua a mesma.
  const isLoggedIn = computed(() => user.value !== null)

  // actions: Funções que alteram o state. Apenas removemos os tipos dos parâmetros.

  /**
   * Realiza o login do usuário com email e senha.
   * @param {string} email O email do usuário.
   * @param {string} password A senha do usuário.
   */
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    user.value = data.user
  }

  /**
   * Realiza o logout do usuário.
   */
  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  }

  /**
   * Verifica se existe uma sessão ativa no Supabase.
   */
  async function checkSession() {
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      user.value = data.session.user
    }
  }

  return { user, isLoggedIn, login, logout, checkSession }
})