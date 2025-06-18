'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './AuthProvider'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

// Todo項目の型定義
export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [todos, setTodos] = useState<Todo[]>([])

  // ローカルストレージからTodoを読み込み
  useEffect(() => {
    const savedTodos = localStorage.getItem(`todos-${user?.id}`)
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }))
        setTodos(parsedTodos)
      } catch (error) {
        console.error('Todoデータの読み込みに失敗しました:', error)
      }
    }
  }, [user?.id])

  // ローカルストレージにTodoを保存
  const saveTodos = (newTodos: Todo[]) => {
    if (user?.id) {
      localStorage.setItem(`todos-${user.id}`, JSON.stringify(newTodos))
      setTodos(newTodos)
    }
  }

  // 新しいTodoを追加
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    }
    const newTodos = [...todos, newTodo]
    saveTodos(newTodos)
  }

  // Todoの完了状態を切り替え
  const toggleTodo = (id: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    saveTodos(newTodos)
  }

  // Todoを削除
  const deleteTodo = (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    saveTodos(newTodos)
  }

  // Todoを編集
  const editTodo = (id: string, newText: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    )
    saveTodos(newTodos)
  }

  // 統計情報の計算
  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const pendingTodos = totalTodos - completedTodos

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                こんにちは、{user?.name}さん
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{totalTodos}</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総タスク数</p>
                <p className="text-2xl font-bold text-gray-900">{totalTodos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{completedTodos}</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">完了済み</p>
                <p className="text-2xl font-bold text-gray-900">{completedTodos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{pendingTodos}</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">未完了</p>
                <p className="text-2xl font-bold text-gray-900">{pendingTodos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Todo追加フォーム */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">新しいタスクを追加</h2>
          <AddTodoForm onAddTodo={addTodo} />
        </div>

        {/* Todoリスト */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">タスク一覧</h2>
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
        </div>
      </main>
    </div>
  )
} 