"use client"

import React, { useState } from 'react';
import { Shield, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from 'framer-motion';

const RevokeOwnershipContent = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRevoke = () => {
    console.log(`Revoking ownership for token: ${tokenAddress}`);
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-blue-600 p-3 rounded-lg mb-4"
        >
          <Shield className="h-8 w-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Revoke Ownership</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Permanently revoke your admin rights for a token. This action cannot be undone.
        </p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Token Information</CardTitle>
          <CardDescription>Enter the address of the token you want to revoke ownership for.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="token-address" className="block text-sm font-medium mb-1">
                Token Address*
              </label>
              <Input
                id="token-address"
                placeholder="Enter token address"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full relative h-9 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
                <Shield className="mr-2 h-4 w-4" />
                Revoke Ownership
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Ownership Revocation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to revoke ownership for this token? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="font-semibold">Token Address:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tokenAddress}</p>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="relative h-9 rounded-md px-4 py-2 text-sm font-medium border border-slate-200 bg-white text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-800 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleRevoke}
                  className="relative h-9 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                >
                  Confirm Revocation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Alert className="mt-8 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4" />
        <AlertTitle>Service Fee</AlertTitle>
        <AlertDescription>
          <p>Original fee: <span className="line-through">10 APT</span></p>
          <p className="font-semibold">Current fee: 5 APT (50% discount applied)</p>
        </AlertDescription>
      </Alert>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; 2023 APTCoins. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RevokeOwnershipContent;