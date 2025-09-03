import { Toast } from 'primereact/toast';
import { createContext, useContext, useRef } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser usado dentro de ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const toast = useRef(null);

  const showSuccess = (message) => {
    toast.current.show({
      severity: 'success',
      summary: 'Éxito',
      detail: message,
      life: 3000
    });
  };

  const showError = (message) => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 5000
    });
  };

  const showInfo = (message) => {
    toast.current.show({
      severity: 'info',
      summary: 'Información',
      detail: message,
      life: 3000
    });
  };

  const showWarning = (message) => {
    toast.current.show({
      severity: 'warn',
      summary: 'Advertencia',
      detail: message,
      life: 4000
    });
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarning }}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};

