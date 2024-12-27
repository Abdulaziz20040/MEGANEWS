import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  [key: string]: any;
}

interface ProductContextType {
  favorite: Product[];
  addToFavorite: (product: Product) => void;
  deleteFromFavorite: (productId: string) => void;
  loadFavorites: () => void;
  setFavorite: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductContextProviderProps {
  children: ReactNode;
}

const ProductContextProvider: React.FC<ProductContextProviderProps> = ({
  children,
}) => {
  const [favorite, setFavorite] = useState<Product[]>(() => {
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
      <div>
        {/* Ichki buttonlarni to'g'ri nesting qilishni e'tiborga oling */}
        {children}
      </div>
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductContextProvider");
  }
  return context;
};

export default ProductContextProvider;
