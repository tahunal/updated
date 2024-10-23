"use client"

import React, { useState, useRef } from 'react';
import { Plane, Upload, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import Image from 'next/image';

const AirdropContent = () => {
  const [selectedToken, setSelectedToken] = useState('');
  const [recipients, setRecipients] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Airdrop:', {
      selectedToken,
      recipients,
      file
    });
  };

  const recipientCount = recipients.split('\n').filter(line => line.trim()).length;
  const totalAmount = recipients.split('\n').reduce((sum, line) => {
    const amount = parseFloat(line.split(',')[1]);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-blue-600 p-3 rounded-lg mb-4"
        >
          <Plane className="h-8 w-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Aptos Airdrop</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Send tokens to multiple addresses simultaneously.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Airdrop Details</CardTitle>
            <CardDescription>Select the token and enter recipient details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="token-select">Select Token</Label>
              <Select onValueChange={setSelectedToken} value={selectedToken}>
                <SelectTrigger id="token-select" className="w-full">
                  <SelectValue placeholder="Select a token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apt">
                    <div className="flex items-center">
                      <Image src="/aptos-logo.png" alt="APT" width={24} height={24} className="mr-2" />
                      <span>APT</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="recipients">Recipient Addresses and Amounts</Label>
              <Textarea
                id="recipients"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                className="font-mono bg-gray-50 dark:bg-gray-800 h-64"
                placeholder="Enter one address and amount per line, separated by a comma:&#10;0x1234...5678,100&#10;0x8765...4321,50"
              />
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <a href="#" className="text-blue-600 hover:underline">Show example</a>
              </div>
            </div>

            <div>
              <Label htmlFor="file-upload">Or Upload CSV/TXT File</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={fileInputRef} onChange={handleFileUpload} accept=".csv,.txt" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV or TXT up to 10MB</p>
                </div>
              </div>
              {file && <p className="mt-2 text-sm text-gray-600">Selected file: {file.name}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4">
              <h3 className="font-semibold mb-2">Summary</h3>
              <p>Total Recipients: {recipientCount}</p>
              <p>Total Amount: {totalAmount.toFixed(2)} {selectedToken}</p>
            </div>
            <Button 
              type="submit" 
              className="w-full relative h-9 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
            >
              <Plane className="mr-2 h-4 w-4" />
              Airdrop Tokens
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Alert className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4" />
        <AlertTitle>Service Fee</AlertTitle>
        <AlertDescription>
          <p className="font-semibold">0.01 APT per recipient address</p>
        </AlertDescription>
      </Alert>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; 2023 APTCoins. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AirdropContent;