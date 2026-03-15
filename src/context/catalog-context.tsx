/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { createCatalogRepository } from "@/services/create-catalog-repository";
import type { CatalogSnapshot, ProductMutationInput } from "@/types/catalog";

type CatalogContextValue = {
  catalog: CatalogSnapshot | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  createProduct: (input: ProductMutationInput) => Promise<void>;
  updateProduct: (id: string, input: ProductMutationInput) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
};

const repository = createCatalogRepository();
const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: PropsWithChildren) {
  const [catalog, setCatalog] = useState<CatalogSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadCatalog() {
      try {
        const snapshot = await repository.getCatalog();

        if (isCancelled) {
          return;
        }

        startTransition(() => {
          setCatalog(snapshot);
          setError(null);
          setIsLoading(false);
        });
      } catch (loadError) {
        if (isCancelled) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "โหลดข้อมูลสินค้าไม่สำเร็จ");
        setIsLoading(false);
      }
    }

    void loadCatalog();

    return () => {
      isCancelled = true;
    };
  }, []);

  async function syncCatalog(operation: Promise<CatalogSnapshot>) {
    setIsSaving(true);

    try {
      const snapshot = await operation;
      startTransition(() => {
        setCatalog(snapshot);
        setError(null);
      });
    } catch (mutationError) {
      const message =
        mutationError instanceof Error ? mutationError.message : "อัปเดตข้อมูลสินค้าไม่สำเร็จ";
      setError(message);
      throw mutationError;
    } finally {
      setIsSaving(false);
    }
  }

  async function createProduct(input: ProductMutationInput) {
    await syncCatalog(repository.createProduct(input));
  }

  async function updateProduct(id: string, input: ProductMutationInput) {
    await syncCatalog(repository.updateProduct(id, input));
  }

  async function deleteProduct(id: string) {
    await syncCatalog(repository.deleteProduct(id));
  }

  return (
    <CatalogContext.Provider
      value={{
        catalog,
        isLoading,
        isSaving,
        error,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }

  return context;
}
