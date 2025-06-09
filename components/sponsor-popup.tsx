<<<<<<< HEAD
"use client";

import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SponsoredContent } from "@/types";
=======
'use client';

import Link from 'next/link';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SponsoredContent } from '@/types';
>>>>>>> main

interface SponsorPopupProps {
  sponsor: SponsoredContent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

<<<<<<< HEAD
export function SponsorPopup({
  sponsor,
  open,
  onOpenChange,
}: SponsorPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <div className="relative w-full h-72">
          <Image
            src={sponsor.imageUrl}
            alt={sponsor.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-white text-xl font-bold mb-2">
              {sponsor.title}
            </h2>
            {sponsor.subtitle && (
              <p className="text-white mb-4 text-sm">{sponsor.subtitle}</p>
            )}
            <Link href={sponsor.ctaUrl} className="mt-2">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                {sponsor.ctaText}
              </Button>
            </Link>
          </div>
=======
export function SponsorPopup({ sponsor, open, onOpenChange }: SponsorPopupProps) {
  if (!sponsor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-xl">
        <div className="w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sponsor.imageUrl} alt={sponsor.title} className="w-full h-auto" />
        </div>
        <div className="p-4 text-center space-y-3">
          <h3 className="text-lg font-semibold">{sponsor.title}</h3>
          {sponsor.subtitle && (
            <p className="text-sm text-gray-600">{sponsor.subtitle}</p>
          )}
          <Link href={sponsor.ctaUrl} className="block">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              {sponsor.ctaText}
            </Button>
          </Link>
>>>>>>> main
        </div>
      </DialogContent>
    </Dialog>
  );
}
