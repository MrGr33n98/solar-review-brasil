"use client";

import Image from "next/image";
import Link from 'next/link';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SponsoredContent } from "@/types";

interface SponsorPopupProps {
  sponsor: SponsoredContent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SponsorPopup({
  sponsor,
  open,
  onOpenChange,
}: SponsorPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <div className="relative w-full h-72">
          {sponsor && sponsor.imageUrl ? (
            <Image
              src={sponsor.imageUrl}
              alt={sponsor.title}
              fill
              className="object-cover"
            />
          ) : (
            <div>No sponsor image available</div> // Or some other fallback
          )}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
