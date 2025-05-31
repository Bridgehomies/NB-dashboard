"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/"); // redirect to home page
      }
    }, [router]);

    const token = typeof window !== "undefined" && localStorage.getItem("token");

    // Prevent flicker by rendering nothing until token is checked
    if (!token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
