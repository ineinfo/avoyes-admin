'use client';

import { useContext, createContext } from 'react';

// ----------------------------------------------------------------------

export const CheckoutContext = createContext({
  activeStep: 0,
  items: [],
  subTotal: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: null,
  totalItems: 0,
  onAddToCart: () => { },
  onDeleteCart: () => { },
  onIncreaseQuantity: () => { },
  onDecreaseQuantity: () => { },
  onCreateBilling: () => { },
  onApplyDiscount: () => { },
  onApplyShipping: () => { },
  onBackStep: () => { },
  onNextStep: () => { },
  onGotoStep: () => { },
  onReset: () => { },
  completed: false,
});

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);

  if (!context) throw new Error('useCheckoutContext must be use inside CheckoutProvider');

  return context;
};
