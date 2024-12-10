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
import { checkUserSusbcription } from "@/actions/stripe";
import { CREDITS } from "@/constants";

interface UsageContextType {
  subscribed: boolean;
  count: number;
  fetchUsage: () => () => Promise<void>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const fetchUsage = useCallback(
    () => async () => {
      const res = await usageCount(email!);
      setCount(res);
    },
    [email],
  );

  const fetchSubscription = useCallback(
    () => async () => {
      const res = await checkUserSusbcription();
      setSubscribed(!!res?.ok);
    },
    [],
  );

  useEffect(() => {
    if (!email) return;
    fetchUsage();
    fetchSubscription();
  }, [email, fetchSubscription, fetchUsage]);

  useEffect(() => {
    setOpenModal(!subscribed && count > CREDITS);
  }, [count, subscribed]);

  return (
    <UsageContext.Provider
      value={{ subscribed, count, fetchUsage, openModal, setOpenModal }}
    >
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
