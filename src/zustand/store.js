"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // Name of the storage
      getStorage: () => (typeof window !== "undefined" ? localStorage : null), // Ensure it's only used in the client
    }
  )
);

export default useUserStore;
