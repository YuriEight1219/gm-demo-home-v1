'use client';

import { toggleTodo, deleteTodo } from '@/app/actions';
import { useTransition, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition();
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    startTransition(async () => {
      await deleteTodo(id);
      // Note: deletingIds state update is optimistic, actual removal happens via props update
    });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, id: string) => {
    if (info.offset.x < -100) {
      handleDelete(id);
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10 animate-pulse">
        <p className="text-xl font-light">No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <ul className="w-full max-w-md space-y-3 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <motion.li
            key={todo.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, info) => handleDragEnd(e, info, todo.id)}
            whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
            className={`group relative flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-shadow hover:shadow-md ${
              todo.completed ? 'opacity-60' : 'opacity-100'
            }`}
            style={{ touchAction: 'pan-y' }} // Prevent vertical scroll interference
          >
            {/* Background for swipe action */}
            <div className="absolute inset-0 bg-red-500 rounded-xl -z-10 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ opacity: 0 }}>
                {/* This background is tricky with framer motion drag, often better to have a separate layer or just rely on the drag movement revealing what's behind if structured differently. 
                    For this simple implementation, we'll just let the item slide off. */}
            </div>

            <div className="flex items-center gap-3 flex-1 overflow-hidden pointer-events-none">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => startTransition(async () => { await toggleTodo(todo.id, e.target.checked); })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300 cursor-pointer transition-colors pointer-events-auto"
              />
              <span
                className={`text-lg truncate transition-all duration-300 ${
                  todo.completed
                    ? 'line-through text-gray-400 dark:text-gray-500'
                    : 'text-gray-800 dark:text-gray-100 font-medium'
                }`}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="ml-2 p-2 text-gray-400 hover:text-red-500 focus:outline-none transition-colors z-10"
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
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
