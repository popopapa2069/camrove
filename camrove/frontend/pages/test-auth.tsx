import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function TestAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123'
    })
    console.log('Sign up:', data, error)
  }

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password123'
    })
    console.log('Sign in:', data, error)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-8">
      <h1>Auth Test</h1>
      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignUp}>Sign Up Test</button>
          <button onClick={handleSignIn}>Sign In Test</button>
        </div>
      )}
    </div>
  )
}