import { useEffect } from 'react';
import { useCart } from '../contexts/cart/CartContext';
import { useClienteAuth } from '../contexts/auth/ClienteAuthContext';

// Hook para sincronizar usuario y carrito
export const useCartSync = () => {
  const { user } = useClienteAuth();
  const { setUser } = useCart();

  useEffect(() => {
    setUser(user?.id || null);
  }, [user, setUser]);
};