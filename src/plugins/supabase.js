// src/plugins/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Pega a URL e a chave Anon do nosso arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cria e exporta o cliente Supabase
// Agora podemos importar 'supabase' em qualquer parte do nosso app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)