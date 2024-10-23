"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Wallet } from 'lucide-react';

export const CustomWalletSelector = () => {
  return (
    <Button 
      variant="outline"
      className="relative h-9 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:ring-slate-800"
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
};

export default CustomWalletSelector;