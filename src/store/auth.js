'use client';
import { atom } from 'recoil';

export const authState = atom({
  key: 'Token',
  default: '',
});
