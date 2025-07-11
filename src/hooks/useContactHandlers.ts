interface ButtonsData {
  phone: {
    text: string;
    number: string;
    enabled: boolean;
    color: string;
  };
  whatsapp: {
    text: string;
    number: string;
    message: string;
    enabled: boolean;
    color: string;
  };
}

export const useContactHandlers = (buttonsData: ButtonsData) => {
  const handlePhoneCall = () => {
    try {
      if (buttonsData.phone?.enabled && buttonsData.phone?.number) {
        window.location.href = `tel:${buttonsData.phone.number}`;
      }
    } catch (error) {
      // Error opening phone app
    }
  };

  const handleWhatsApp = () => {
    try {
      if (buttonsData.whatsapp?.enabled && buttonsData.whatsapp?.number) {
        const message = encodeURIComponent(buttonsData.whatsapp.message || 'مرحبا');
        const cleanNumber = buttonsData.whatsapp.number.replace(/\+/g, '');
        window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      // Error opening WhatsApp
    }
  };

  return { handlePhoneCall, handleWhatsApp };
};