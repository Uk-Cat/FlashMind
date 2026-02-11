// Initialize Supabase
const SUPABASE_URL = 'https://newsivpyvfnkthnxiyxk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ld3NpdnB5dmZua3RobnhpeXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjY2MzEsImV4cCI6MjA4NjQwMjYzMX0.ytNvFv1AaT_9-K3l2_LdynlvYs9OieLdqpQyd3PMCEU';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Flexible function to save user data to Supabase
async function saveUserToSupabase(userData) {
    const { data, error } = await supabase
        .from('users')
        .upsert(userData, {
            onConflict: 'email'
        });

    if (error) {
        console.error('Error saving to Supabase:', error);
        return { success: false, error: error };
    } else {
        console.log('User saved to Supabase:', data);
        return { success: true, data: data };
    }
}