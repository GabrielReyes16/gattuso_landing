import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
// Reemplaza estos valores con los de tu proyecto en Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// ============================================
// FUNCIONES PARA PRODUCTOS
// ============================================

export interface SupabaseProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: 'brasas' | 'combos' | 'bebidas';
    is_popular: boolean;
    created_at: string;
}

/**
 * Obtener todos los productos desde Supabase
 */
export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data as SupabaseProduct[];
}

/**
 * Obtener productos por categoría
 */
export async function getProductsByCategory(category: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }

    return data as SupabaseProduct[];
}

// ============================================
// FUNCIONES PARA IMÁGENES (Storage)
// ============================================

/**
 * Obtener la URL pública de una imagen en Storage
 * @param bucket - Nombre del bucket (ej: 'products')
 * @param path - Ruta del archivo dentro del bucket
 */
export function getImageUrl(bucket: string, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}

/**
 * Subir una imagen al Storage de Supabase
 * @param bucket - Nombre del bucket
 * @param file - Archivo a subir
 * @param path - Ruta donde guardar el archivo
 */
export async function uploadImage(bucket: string, file: File, path: string) {
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: true,
        });

    if (error) {
        console.error('Error uploading image:', error);
        return null;
    }

    return getImageUrl(bucket, data.path);
}
