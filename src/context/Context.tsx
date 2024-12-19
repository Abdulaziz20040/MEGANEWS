import React, { createContext, useContext, useState, ReactNode } from "react";

// Type definitions
interface Product {
  id: string;
  name: string;
  [key: string]: any; // For additional product properties
}

interface ProductContextType {
  favorite: Product[];
  addToFavorite: (product: Product) => void;
  deleteFromFavorite: (productId: string) => void;
  loadFavorites: any;
  setFavorite: any;
}

// Default value for context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Props for the provider
interface ProductContextProviderProps {
  children: ReactNode;
}

// Context Provider
const ProductContextProvider: React.FC<ProductContextProviderProps> = ({
  children,
}) => {
  const [favorite, setFavorite] = useState<Product[]>(() => {
    // Load initial favorites from localStorage
    try {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error);
      return [];
    }
  });

  const addToFavorite = (product: Product) => {
    const isProductInFavorites = favorite.some(
      (item) => item.id === product.id
    );
    if (!isProductInFavorites) {
      const updatedFavorites = [...favorite, product];
      setFavorite(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const deleteFromFavorite = (productId: string) => {
    const updatedFavorites = favorite.filter((item) => item.id !== productId);
    setFavorite(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorite(JSON.parse(savedFavorites));
    }
  };

  return (
    <ProductContext.Provider
      value={{
        favorite,
        addToFavorite,
        deleteFromFavorite,
        loadFavorites,
        setFavorite,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for accessing the context
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductContextProvider");
  }
  return context;
};

// Exporting the provider
export default ProductContextProvider;
