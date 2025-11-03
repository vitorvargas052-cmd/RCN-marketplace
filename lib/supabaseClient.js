import { createClient } from '@supabase/supabase-js'

// Conexão com o Supabase
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Função auxiliar: upload de imagem
export async function uploadImage(file) {
  const fileName = `${Date.now()}_${file.name}`
  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file)

  if (error) throw error
  return `${supabaseUrl}/storage/v1/object/public/images/${fileName}`
}

// Função auxiliar: buscar produtos
export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*')
  if (error) throw error
  return data
    }
