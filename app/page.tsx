"use client"

import TokenCreationForm from '@/components/TokenCreationForm';
import { Coins, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <Alert className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <AlertTitle className="text-xl font-heading tracking-tight mb-2.5">
                50% OFF Token Creation Today
              </AlertTitle>
              <AlertDescription className="text-slate-700 dark:text-slate-300 text-base">
                Launch your Aptos token in minutes for just 10 APT instead of <span className="line-through opacity-75">20 APT</span>. Limited time offer!
              </AlertDescription>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/50 dark:to-slate-950/50 opacity-50" />
      </Alert>

      <div className="text-center mb-8 mt-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-blue-600 p-3 rounded-lg mb-4"
        >
          <Coins className="h-8 w-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Create Aptos Tokens</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create and manage your Aptos tokens with ease.
        </p>
      </div>

      <div id="token-form">
        <TokenCreationForm />
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; 2023 APTCoins. All rights reserved.</p>
      </footer>
    </div>
  );
}