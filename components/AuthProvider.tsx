'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// ユーザー情報の型定義
interface User {
  id: string
  email: string
  name: string
}

// 認証コンテキストの型定義
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// 認証コンテキストの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProviderコンポーネント
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 環境変数の使用例（process.envが必要）
  const authSecret = process.env.NEXTAUTH_SECRET
  const authUrl = process.env.NEXTAUTH_URL

  // アプリケーション起動時に認証状態をチェック
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth-token')
      const userData = localStorage.getItem('user-data')
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        } catch (error) {
          console.error('ユーザーデータの解析に失敗しました:', error)
          localStorage.removeItem('auth-token')
          localStorage.removeItem('user-data')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // ログイン処理
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // 簡単なダミー認証（実際のプロジェクトではAPIを呼び出す）
      // 環境変数を使用した認証URLの例（実際には使用していない）
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
      
      if (email === 'test@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          email: email,
          name: 'テストユーザー'
        }
        
        // トークンとユーザーデータをローカルストレージに保存
        localStorage.setItem('auth-token', 'dummy-token-123')
        localStorage.setItem('user-data', JSON.stringify(userData))
        
        setUser(userData)
        setIsLoading(false)
        return true
      } else {
        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.error('ログインエラー:', error)
      setIsLoading(false)
      return false
    }
  }

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-data')
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// 認証コンテキストを使用するためのカスタムフック
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 