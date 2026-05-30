import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;

  category: {
    id: number;
    name: string;
    image: string;
  };
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  hasFetched: boolean;
  error: string | null;
  cartItems: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;

  loadMoreProducts: (params?: {
    title?: string;
    categoryId?: string;
    price_min?: string;
    price_max?: string;
  }) => void;

  fetchProducts: (params?: {
    offset?: number;
    limit?: number;
    title?: string;
    categoryId?: string;
    price_min?: string;
    price_max?: string;
    append?: boolean;
  }) => Promise<void>;

  fetchCategories: () => Promise<void>;

  openOrderPage: boolean;
  setOpenOrderPage: React.Dispatch<React.SetStateAction<boolean>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  const [openOrderPage, setOpenOrderPage] = useState<boolean>(false);
  const LIMIT = 10;

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cartItems");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchProducts = async ({
    offset = 0,
    limit = LIMIT,
    title = "",
    categoryId = "",
    price_min = "",
    price_max = "",
    append = false,
  }: {
    offset?: number;
    limit?: number;
    title?: string;
    categoryId?: string;
    price_min?: string;
    price_max?: string;
    append?: boolean;
  } = {}) => {
    try {
      setLoading(true);

      let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

      if (title) url += `&title=${title}`;
      if (categoryId) url += `&categoryId=${categoryId}`;
      if (price_min) url += `&price_min=${price_min}`;
      if (price_max) url += `&price_max=${price_max}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      if (append) {
        setProducts((prev) => [...prev, ...data]);
      } else {
        setProducts(data);
      }
    } catch (err) {
      setError("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories",
      );

      const data = await response.json();

      setCategories(data);
    } catch (err) {
      setError("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = ({
    title = "",
    categoryId = "",
    price_min = "",
    price_max = "",
  } = {}) => {
    const newOffset = offset + LIMIT;

    setOffset(newOffset);

    fetchProducts({
      offset: newOffset,
      limit: LIMIT,
      title,
      categoryId,
      price_min,
      price_max,
      append: true,
    });
  };

  // CART
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        cartItems,
        loading,
        hasFetched,
        error,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        loadMoreProducts,
        fetchProducts,
        fetchCategories,
        openOrderPage,
        setOpenOrderPage,
        setCartItems,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
};
