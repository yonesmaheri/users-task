"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login_state");
    if (!isLoggedIn) {
      router.push("/");
    } else {
      setAuthorized(true);
    }
  }, []);

  if (authorized === null) return null;

  return <Provider store={store}>{children}</Provider>;
}
