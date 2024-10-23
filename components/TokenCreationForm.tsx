"use client"

import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, Info } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  symbol: z.string().min(1, "Symbol is required"),
  description: z.string().optional(),
  imageType: z.enum(["url", "upload"]),
  imageUrl: z.string().url().optional(),
  decimals: z.number().min(0).max(18),
  initialSupply: z.string().min(1, "Initial supply is required"),
  maxSupply: z.string().optional(),
  burnable: z.boolean(),
  customDecimals: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const TokenCreationForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      description: "",
      imageType: "upload",
      imageUrl: "",
      decimals: 8,
      initialSupply: "",
      maxSupply: "",
      burnable: false,
      customDecimals: false,
    },
  });

  const imageType = watch("imageType");
  const customDecimals = watch("customDecimals");

  const onSubmit = useCallback(async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data, logoFile);
      setIsDialogOpen(true);
    } catch (err) {
      console.error('Error creating token:', err);
      setError("Failed to create token. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [logoFile]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setLogoFile(file);
    }
  }, []);

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle>Token Information</CardTitle>
        <CardDescription>Enter the details for token creation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4" />
          <AlertTitle>Creation Cost</AlertTitle>
          <AlertDescription>
            <p>Original fee: <span className="line-through">20 APT</span></p>
            <p className="font-semibold">Current fee: 10 APT (50% discount applied)</p>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name">Token Name</Label>
            <Input id="name" {...register('name')} className="mt-1" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="symbol">Token Symbol</Label>
            <Input id="symbol" {...register('symbol')} className="mt-1" />
            {errors.symbol && <p className="text-red-500 text-sm mt-1">{errors.symbol.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} className="mt-1" />
          </div>

          <div>
            <Label>Logo</Label>
            <div className="mt-1 flex items-center space-x-4">
              <Controller
                name="imageType"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.value === "url"}
                      onCheckedChange={(checked) => field.onChange(checked ? "url" : "upload")}
                    />
                    <Label htmlFor="use-logo-url">Use logo URL</Label>
                  </div>
                )}
              />
            </div>
            {imageType === "url" ? (
              <Input
                {...register('imageUrl')}
                placeholder="Enter logo URL"
                className="mt-2"
              />
            ) : (
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
                  <div className="flex text-sm text-slate-600 dark:text-slate-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white dark:bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            )}
            {imagePreview && (
              <Image src={imagePreview} alt="Logo preview" width={80} height={80} className="mt-2 object-cover rounded-full" />
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="decimals">Decimals</Label>
              <Controller
                name="customDecimals"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="custom-decimals"
                    />
                    <Label htmlFor="custom-decimals">Custom</Label>
                  </div>
                )}
              />
            </div>
            <Input
              id="decimals"
              type="number"
              {...register('decimals', { valueAsNumber: true })}
              disabled={!customDecimals}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="initialSupply">Initial Supply</Label>
            <Input id="initialSupply" {...register('initialSupply')} className="mt-1" />
            {errors.initialSupply && <p className="text-red-500 text-sm mt-1">{errors.initialSupply.message}</p>}
          </div>

          <div>
            <Label htmlFor="maxSupply">Max Supply</Label>
            <Input id="maxSupply" {...register('maxSupply')} className="mt-1" />
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="burnable"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="burnable"
                />
              )}
            />
            <Label htmlFor="burnable">Burnable</Label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button 
          type="submit" 
          className="w-full relative h-9 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Coin (10 APT)"}
        </Button>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Token Created Successfully</DialogTitle>
            <DialogDescription>
              Your token has been created and is now available on the Aptos network.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TokenCreationForm;