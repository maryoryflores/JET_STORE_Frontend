'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';

export default function SettingsForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotif, setEmailNotif] = useState(true);
  const [purchaseUpdates, setPurchaseUpdates] = useState(true);
  const [offers, setOffers] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const handleSavePassword = async () => {
    if (newPassword !== confirmPassword) {
      setToast({ visible: true, message: 'Las contraseñas no coinciden', type: 'error' });
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setToast({ visible: true, message: 'Contraseña actualizada correctamente', type: 'success' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSaving(false);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setToast({ visible: true, message: 'Configuración guardada correctamente', type: 'success' });
    setSaving(false);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cambiar Contraseña</h3>
          <div className="space-y-4 max-w-md">
            <Input
              label="Contraseña Actual"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="Nueva Contraseña"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirmar Nueva Contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handleSavePassword} loading={saving}>
              Actualizar Contraseña
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencias de Notificación</h3>
          <div className="space-y-4">
            {[
              { label: 'Notificaciones por Email', key: 'emailNotif', value: emailNotif, set: setEmailNotif },
              { label: 'Actualizaciones de Compras', key: 'purchaseUpdates', value: purchaseUpdates, set: setPurchaseUpdates },
              { label: 'Ofertas y Promociones', key: 'offers', value: offers, set: setOffers },
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700">{item.label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={item.value}
                  onClick={() => item.set(!item.value)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    item.value ? 'bg-[#DC2626]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      item.value ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
          <div className="mt-4">
            <Button onClick={handleSaveSettings} loading={saving}>
              Guardar Preferencias
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Zona de Peligro</h3>
          <p className="text-sm text-gray-500 mb-4">Una vez que elimines tu cuenta, no hay vuelta atrás.</p>
          <Button
            variant="outline"
            onClick={() => {
              if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
                setToast({ visible: true, message: 'Cuenta eliminada (simulación)', type: 'success' });
              }
            }}
          >
            Eliminar Cuenta
          </Button>
        </div>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </>
  );
}
