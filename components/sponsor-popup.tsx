"use client";

import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SponsoredContent } from "@/types";

interface SponsorPopupProps {
  sponsor: SponsoredContent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SponsorPopup({ sponsor, open, onOpenChange }: SponsorPopupProps) {
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
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">{sponsor.title}</h2>
          <p className="text-gray-600 mb-4">{sponsor.description}</p>
          <Link href={`/empresa/${sponsor.companyId}`}>
            <Button className="w-full">Ver Empresa</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
