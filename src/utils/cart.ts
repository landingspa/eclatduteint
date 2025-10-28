import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = "eclat_cart";

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

// Save cart to localStorage
const saveCart = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event for cart updates
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Add item to cart
export const addToCart = (product: Product, quantity: number = 1): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.product.id === product.id
  );

  if (existingItemIndex > -1) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({ product, quantity });
  }

  saveCart(cart);
};

// Remove item from cart
export const removeFromCart = (productId: number): void => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.product.id !== productId);
  saveCart(updatedCart);
};

// Update item quantity
export const updateQuantity = (productId: number, quantity: number): void => {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item.product.id === productId);

  if (itemIndex > -1) {
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
  }
};

// Clear entire cart
export const clearCart = (): void => {
  saveCart([]);
};

// Get cart total
export const getCartTotal = (cart: CartItem[]): number => {
  return cart.reduce(
    (total, item) => total + item.product.salePrice * item.quantity,
    0
  );
};

// Get total items count
export const getCartItemsCount = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};
