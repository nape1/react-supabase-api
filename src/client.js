import { createClient } from '@supabase/supabase-js'


export const supabase = createClient(
    process.env.REACT_APP_supabseUrl,
    process.env.REACT_APP_supabaseAPIKey
)