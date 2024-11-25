"use client";

import {
  useState,
  useContext,
  useEffect,
  createContext,
  useCallback,
} from "react";
import { useUser } from "@clerk/nextjs";

import { usageCount } from "@/actions/ai";

interface UsageContextType {
  count: number;
  fetchUsage: () => () => Promise<void>;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [count, setCount] = useState(0);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const fetchUsage = useCallback(
    () => async () => {
      const res = await usageCount(email!);
      setCount(res);
    },
    [email],
  );

  useEffect(() => {
    if (email) fetchUsage();
  }, [email, fetchUsage]);

  return (
    <UsageContext.Provider value={{ count, fetchUsage }}>
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context === null)
    throw new Error("useUsage must be used inside UsageProvider");

  return context;
};
