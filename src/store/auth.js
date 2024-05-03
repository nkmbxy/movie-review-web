"use client";
import { atom } from "recoil";

export const authState = atom({
  key: "AUTH",
  default: {
    email: "",
    token: "",
  },
});
