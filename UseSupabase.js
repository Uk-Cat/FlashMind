// Initialize Supabase
const SUPABASE_URL = 'https://newsivpyvfnkthnxiyxk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ld3NpdnB5dmZua3RobnhpeXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjY2MzEsImV4cCI6MjA4NjQwMjYzMX0.ytNvFv1AaT_9-K3l2_LdynlvYs9OieLdqpQyd3PMCEU';
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Save user to Supabase
async function saveUserToSupabase(userObject) {
    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabaseClient
        .from('VividMind')
        .select('*')
        .eq('Email', userObject.email)
        .single();

    let error = null;
    
    if (existingUser) {
        // User exists, do nothing or update if needed
        console.log('User already exists:', existingUser);
    } else {
        // User doesn't exist, insert new user
        const { data, error: insertError } = await supabaseClient
            .from('VividMind')
            .insert({
                Email: userObject.email,
                Name: userObject.name,
                Google_ID: userObject.sub
            });
        error = insertError;
    }

    if (error) {
        console.error('Error saving to Supabase:', error);
        return { success: false, error: error };
    } else {
        console.log('User processed successfully');
        return { success: true };
    }
}