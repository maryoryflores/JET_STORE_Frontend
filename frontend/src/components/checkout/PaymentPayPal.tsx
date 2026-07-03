'use client';

export default function PaymentPayPal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">PayPal</p>
          <p className="text-xs text-gray-500">Paga con tu cuenta de PayPal</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-8 bg-blue-50 rounded-xl border-2 border-blue-100">
        <svg className="w-16 h-16 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
        </svg>
        <p className="text-lg font-semibold text-gray-900">Serás redirigido a PayPal</p>
        <p className="text-sm text-gray-500 text-center max-w-sm">
          Al continuar, serás redirigido a PayPal para completar tu pago de forma segura.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-yellow-800 text-center">
          No conectado todavía - Próximamente disponible
        </p>
      </div>

      <button
        type="button"
        disabled
        aria-disabled="true"
        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-blue-600 text-white rounded-xl font-semibold text-sm cursor-not-allowed opacity-50"
      >
        Continuar con PayPal
      </button>
    </div>
  );
}
