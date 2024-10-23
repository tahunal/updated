"use client"

import { ModeToggle } from '@/components/mode-toggle';
import { CustomWalletSelector } from "@/components/CustomWalletSelector";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import APTCoinsLogo from '@/components/APTCoinsLogo';
import { Circle, Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from './Sidebar';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar maxWidth="full" className="border-b border-border">
      <NavbarBrand>
        <Link href="/" className="flex items-center space-x-2">
          <APTCoinsLogo />
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end" className="hidden md:flex">
        <NavbarItem>
          <Button 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Circle className="h-2 w-2 fill-green-500 text-green-500" />
            Aptos Mainnet
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ModeToggle />
        </NavbarItem>
        <NavbarItem>
          <CustomWalletSelector />
        </NavbarItem>
      </NavbarContent>

      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="py-4">
              <Sidebar />
            </div>
            <div className="mt-4 space-y-4">
              <Button 
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                Aptos Mainnet
              </Button>
              <div className="flex justify-between items-center">
                <ModeToggle />
                <CustomWalletSelector />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Navbar>
  );
};

export default Header;