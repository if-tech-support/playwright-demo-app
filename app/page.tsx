'use client'

import { useAuth } from '@/components/AuthProvider'
import LoginForm from '@/components/LoginForm'
import Dashboard from '@/components/Dashboard'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function HomePage() {
  const { user, isLoading } = useAuth()

  // ローディング中の表示
  if (isLoading) {
    return <LoadingSpinner />
  }

  // 認証状態に応じて表示を切り替え
  return (
    <main className="min-h-screen bg-gray-50">
      {user ? <Dashboard /> : <LoginForm />}
    </main>
  )
} 