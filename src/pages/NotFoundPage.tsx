import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <p className="text-4xl font-semibold text-slate-300 dark:text-slate-700">404</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">This page does not exist.</p>
      <Link to="/" className="text-sm font-medium text-indigo-600 hover:underline">
        Back to dashboard
      </Link>
    </div>
  )
}
