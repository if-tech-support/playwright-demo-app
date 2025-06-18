'use client'

import { useState } from 'react'
import { Todo } from './Dashboard'

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
  onEditTodo: (id: string, newText: string) => void
}

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  onEdit: (newText: string) => void
}

// 個別のTodo項目コンポーネント
function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="flex items-center p-4 border border-gray-200 rounded-lg mb-2 bg-white hover:shadow-sm transition-shadow">
      {/* 完了チェックボックス */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-3"
      />

      {/* Todo内容 */}
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
        ) : (
          <span
            className={`${
              todo.completed
                ? 'line-through text-gray-500'
                : 'text-gray-900'
            } cursor-pointer`}
            onClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
        <div className="text-xs text-gray-400 mt-1">
          作成日: {todo.createdAt.toLocaleDateString('ja-JP')}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex space-x-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              保存
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              キャンセル
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              編集
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              削除
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// メインのTodoListコンポーネント
export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }: TodoListProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date')

  // フィルタリングされたTodoを取得
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'pending':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  // ソートされたTodoを取得
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'name') {
      return a.text.localeCompare(b.text)
    } else {
      return b.createdAt.getTime() - a.createdAt.getTime()
    }
  })

  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">まだタスクがありません。新しいタスクを追加してみましょう！</p>
      </div>
    )
  }

  return (
    <div>
      {/* フィルターとソートのコントロール */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">フィルター:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'completed')}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">すべて</option>
              <option value="pending">未完了</option>
              <option value="completed">完了済み</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">ソート:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="date">作成日順</option>
              <option value="name">アルファベット順</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {filteredTodos.length} / {todos.length} 件のタスク
        </div>
      </div>

      {/* Todoアイテムのリスト */}
      <div className="space-y-2">
        {sortedTodos.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">該当するタスクがありません。</p>
          </div>
        ) : (
          sortedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => onToggleTodo(todo.id)}
              onDelete={() => onDeleteTodo(todo.id)}
              onEdit={(newText) => onEditTodo(todo.id, newText)}
            />
          ))
        )}
      </div>
    </div>
  )
} 