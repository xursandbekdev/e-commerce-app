import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';
import type { CartItem } from '../../interface';

// Helper: hook ni provider bilan o‘rash
const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('dastlab bo‘sh bo‘lishi kerak', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getCartTotal()).toBe(0);
    expect(result.current.getCartItemsCount()).toBe(0);
  });

  it('addToCart yangi mahsulot qo‘shadi', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const newItem: Omit<CartItem, 'quantity'> = {
      id: 1,
      name: 'Product 1',
      price: 100,
      image: 'img.jpg',
    };

    act(() => {
      result.current.addToCart(newItem, 2);
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
    expect(result.current.getCartTotal()).toBe(200);
    expect(result.current.getCartItemsCount()).toBe(2);
    expect(result.current.isItemInCart(1)).toBe(true);
  });

  it('updateQuantity ishlaydi', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = { id: 2, name: 'Product 2', price: 50, image: '' };
    act(() => result.current.addToCart(item, 1));

    act(() => result.current.updateQuantity(2, 3));
    expect(result.current.cartItems[0].quantity).toBe(3);

    // quantity 0 bo‘lsa, remove bo‘lishi kerak
    act(() => result.current.updateQuantity(2, 0));
    expect(result.current.cartItems.length).toBe(0);
  });

  it('removeFromCart ishlaydi', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = { id: 3, name: 'Product 3', price: 20, image: '' };
    act(() => result.current.addToCart(item, 1));

    act(() => result.current.removeFromCart(3));
    expect(result.current.cartItems.length).toBe(0);
  });

  it('clearCart bo‘shatadi', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = { id: 4, name: 'Product 4', price: 10, image: '' };
    act(() => result.current.addToCart(item, 1));

    act(() => result.current.clearCart());
    expect(result.current.cartItems.length).toBe(0);
    expect(localStorage.getItem('shopping-cart')).toBeNull();
  });

  it('localStorage bilan integratsiya qiladi', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = { id: 5, name: 'Product 5', price: 30, image: '' };
    act(() => result.current.addToCart(item, 2));

    const saved = JSON.parse(localStorage.getItem('shopping-cart')!);
    expect(saved[0].id).toBe(5);
    expect(saved[0].quantity).toBe(2);
  });
});
