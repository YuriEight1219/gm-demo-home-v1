'use client';

import { toggleTodo, deleteTodo } from '@/app/actions';
import { useTransition } from 'react';

type Todo = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};

export default function TodoList({ todos }: { todos: Todo[] }) {
    const [isPending, startTransition] = useTransition();

    if (todos.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-10 animate-pulse">
                <p className="text-xl font-light">No tasks yet. Add one above!</p>
            </div>
        );
    }

    return (
        <ul className="w-full max-w-md space-y-3">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className={`group flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md hover:scale-[1.01] ${todo.completed ? 'opacity-60' : 'opacity-100'
                        }`}
                >
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={(e) => startTransition(async () => { await toggleTodo(todo.id, e.target.checked); })}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300 cursor-pointer transition-colors"
                        />
                        <span
                            className={`text-lg truncate transition-all duration-300 ${todo.completed
                                ? 'line-through text-gray-400 dark:text-gray-500'
                                : 'text-gray-800 dark:text-gray-100 font-medium'
                                }`}
                        >
                            {todo.title}
                        </span>
                    </div>
                    <button
                        onClick={() => startTransition(async () => { await deleteTodo(todo.id); })}
                        className="ml-2 p-2 text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
                        aria-label="Delete todo"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </li>
            ))}
        </ul>
    );
}
