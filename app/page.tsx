import { getTodos, logout } from './actions';
import AddTodoForm from './components/add-todo-form';
import TodoList from './components/todo-list';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: todos } = await getTodos();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-20 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Logout Button */}
      <form action={logout} className="absolute top-4 right-4 z-20">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
        >
          <span>Sign Out</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>
      </form>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-400/20 blur-[100px]"></div>
      </div>

      <div className="z-10 w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2 tracking-tight">
          Todo App
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg font-light">
          Simple, Fast, and Beautiful.
        </p>

        <AddTodoForm />

        <div className="w-full flex justify-center">
          <TodoList todos={todos || []} />
        </div>
      </div>

      <footer className="absolute bottom-4 text-center text-gray-400 text-sm z-10">
        <p>Powered by Next.js, Prisma & Supabase</p>
      </footer>
    </main>
  );
}
