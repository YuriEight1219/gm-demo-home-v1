'use client';

import { useRef } from 'react';
import { addTodo } from '@/app/actions';

export default function AddTodoForm() {
    const formRef = useRef<HTMLFormElement>(null);

    async function action(formData: FormData) {
        const result = await addTodo(formData);
        if (result.success) {
            formRef.current?.reset();
        } else {
            alert(result.error);
        }
    }

    return (
        <form ref={formRef} action={action} className="w-full max-w-md mb-8 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative flex items-center">
                <input
                    type="text"
                    name="title"
                    placeholder="What needs to be done?"
                    className="w-full p-4 pr-16 text-gray-900 bg-white border-none rounded-lg shadow-xl focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-800 dark:text-white placeholder-gray-400 transition-all"
                    required
                />
                <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-105 active:scale-95 font-medium text-sm"
                >
                    Add
                </button>
            </div>
        </form>
    );
}
