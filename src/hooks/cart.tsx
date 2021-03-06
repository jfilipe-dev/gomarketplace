import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await AsyncStorage.getItem('@GoMarketplace:products');

      if (response) setProducts(JSON.parse(response));
    }

    loadProducts();
  }, []);

  useEffect(() => {
    async function upateProducts(): Promise<void> {
      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(products),
      );
    }

    upateProducts();
  }, [products]);

  const addToCart = useCallback(
    async product => {
      const hasProduct = products.find(p => p.id === product.id);
      const newProducts = products.filter(p => p.id !== product.id);
      if (hasProduct) {
        hasProduct.quantity += 1;
        setProducts([...newProducts, hasProduct]);
      } else {
        product.quantity = 1;
        setProducts([...products, product]);
      }
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const product = products.find(p => p.id === id);
      const newProducts = products.filter(p => p.id !== id);
      product.quantity = Number(product.quantity) + 1;
      setProducts([...newProducts, Object(product)]);
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const productIndex = products.findIndex(item => item.id === id);

      const newProducts: Product[] = products;

      newProducts[productIndex].quantity -= 1;

      if (newProducts[productIndex].quantity < 1) {
        newProducts.splice(productIndex, 1);
      }

      setProducts([...newProducts]);
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
