"use client"

import React, { useState } from 'react';
import { Flame, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from 'framer-motion';

const IncineratorContent = () => {
  const [selectedToken, setSelectedToken] = useState('');
  const [burnAmount, setBurnAmount] = useState('');

  const handleBurn = () => {
    console.log(`Burning ${burnAmount} of token ${selectedToken}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-blue-600 p-3 rounded-lg mb-4"
        >
          <Flame className="h-8 w-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Incinerator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Burn tokens to reduce supply and potentially increase value.
        </p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Burn Tokens</CardTitle>
          <CardDescription>
            Token burning permanently removes tokens from circulation, potentially increasing the value of remaining tokens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="token-select" className="block text-sm font-medium mb-1">
                Select Token
              </label>
              <Select onValueChange={setSelectedToken} value={selectedToken}>
                <SelectTrigger id="token-select">
                  <SelectValue placeholder="Select a token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apt">APT</SelectItem>
                  <SelectItem value="btc">BTC</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="burn-amount" className="block text-sm font-medium mb-1">
                Amount to Burn
              </label>
              <Input
                id="burn-amount"
                type="number"
                placeholder="Enter amount"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleBurn}
            className="w-full relative h-9 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
          >
            <Flame className="mr-2 h-4 w-4" />
            Burn Tokens
          </Button>
        </CardFooter>
      </Card>

      <Alert className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4" />
        <AlertTitle>Service Fee</AlertTitle>
        <AlertDescription>
          <p className="font-semibold">Current fee: 1 APT</p>
        </AlertDescription>
      </Alert>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; 2023 APTCoins. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IncineratorContent;