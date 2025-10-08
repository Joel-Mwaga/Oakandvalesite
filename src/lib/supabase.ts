import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

// Create Supabase client with better error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export const signUp = async (email: string, password: string, fullName: string, phone: string) => {
  try {
    // Check for admin credentials
    if (email === 'admin@oakandvale.com' && password === '12345678') {
      // Simulate admin login for demo
      const adminUser = {
        id: 'admin-123',
        email: 'admin@oakandvale.com',
        user_metadata: {
          full_name: 'Admin User',
          phone: '+254700000000',
          role: 'admin'
        }
      };
      
      // Store admin session in localStorage for demo
      localStorage.setItem('admin_session', JSON.stringify(adminUser));
      
      return { 
        data: { user: adminUser, session: { user: adminUser } }, 
        error: null 
      };
    }

    // For demo purposes, simulate successful signup
    const mockUser = {
      id: `user-${Date.now()}`,
      email,
      user_metadata: {
        full_name: fullName,
        phone,
        role: 'client'
      }
    };

    // Store user session in localStorage for demo
    localStorage.setItem('user_session', JSON.stringify(mockUser));
    
    return { 
      data: { user: mockUser, session: { user: mockUser } }, 
      error: null 
    };
  } catch (error) {
    console.error('Signup error:', error);
    return { 
      data: null, 
      error: { message: 'Failed to create account. Please try again.' } 
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    // Check for admin credentials
    if (email === 'admin@oakandvale.com' && password === '12345678') {
      const adminUser = {
        id: 'admin-123',
        email: 'admin@oakandvale.com',
        user_metadata: {
          full_name: 'Admin User',
          phone: '+254700000000',
          role: 'admin'
        }
      };
      
      localStorage.setItem('admin_session', JSON.stringify(adminUser));
      
      return { 
        data: { user: adminUser, session: { user: adminUser } }, 
        error: null 
      };
    }

    // Check for existing user session
    const existingUser = localStorage.getItem('user_session');
    if (existingUser) {
      const user = JSON.parse(existingUser);
      if (user.email === email) {
        return { 
          data: { user, session: { user } }, 
          error: null 
        };
      }
    }

    // For demo purposes, create a new user if credentials don't match existing
    const mockUser = {
      id: `user-${Date.now()}`,
      email,
      user_metadata: {
        full_name: email.split('@')[0],
        phone: '+254700000000',
        role: 'client'
      }
    };

    localStorage.setItem('user_session', JSON.stringify(mockUser));
    
    return { 
      data: { user: mockUser, session: { user: mockUser } }, 
      error: null 
    };
  } catch (error) {
    console.error('Signin error:', error);
    return { 
      data: null, 
      error: { message: 'Invalid credentials. Please try again.' } 
    };
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem('user_session');
    localStorage.removeItem('admin_session');
    return { error: null };
  } catch (error) {
    console.error('Signout error:', error);
    return { error: { message: 'Failed to sign out' } };
  }
};

export const getCurrentUser = async () => {
  try {
    // Check for admin session first
    const adminSession = localStorage.getItem('admin_session');
    if (adminSession) {
      return JSON.parse(adminSession);
    }

    // Check for user session
    const userSession = localStorage.getItem('user_session');
    if (userSession) {
      return JSON.parse(userSession);
    }

    return null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};