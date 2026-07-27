"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchBootstrapStatic } from "../lib/fpl";
import type { FplBootstrapContextValue, FplBootstrapData } from "../types";

const FplBootstrapContext = createContext<FplBootstrapContextValue | null>(
  null,
);

export const FplProvider = ({ children }: { children: React.ReactNode }) => {
  const [bootstrap, setBootstrap] = useState<FplBootstrapData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadBootstrap = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchBootstrapStatic(controller.signal);
        setBootstrap(data);
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Failed to fetch bootstrap data:", fetchError);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadBootstrap();

    return () => controller.abort();
  }, []);

  return (
    <FplBootstrapContext.Provider value={{ bootstrap, isLoading, error }}>
      {children}
    </FplBootstrapContext.Provider>
  );
};

export const useFplBootstrap = () => {
  const context = useContext(FplBootstrapContext);

  if (!context) {
    throw new Error("useFplBootstrap must be used within an FplProvider");
  }

  return context;
};
