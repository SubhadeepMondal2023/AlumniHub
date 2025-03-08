import { useState, useCallback } from 'react';

function useToastNotification(timeout = 3000) {
  const [toast, setToast] = useState({
    show: false,
    title: '',
    variant: '',
    message: '',
  });

  const showToast = useCallback((title, variant, message) => {
    setToast({ show: true, title, variant, message });

    setTimeout(() => {
      setToast({ show: false, title: '', variant: '', message: '' });
    }, timeout);
  }, [timeout]);

  return { toast, showToast };
}

export default useToastNotification;
