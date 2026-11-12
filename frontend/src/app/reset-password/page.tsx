import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center text-gray-500">
            Cargando…
          </div>
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}