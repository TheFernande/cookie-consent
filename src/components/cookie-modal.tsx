"use client";

import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useRef } from "react";
import { Button } from "./ui/button";
import { ToggleSwitch } from "./ui/toggle-button";

export interface ICookieModalProps {
  essentialsConsent: boolean;
  analyticsConsent: boolean;
  marketingConsent: boolean;
  updateCookieConsent: (updates: Partial<{ essentials: boolean; analytics: boolean; marketing: boolean }>) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export default function CookieModal(props: ICookieModalProps) {
  const {
    essentialsConsent,
    analyticsConsent,
    marketingConsent,
    updateCookieConsent,
    isModalOpen,
    setIsModalOpen
  } = props;

  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef, isModalOpen);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="w-full max-w-md bg-white p-6 shadow-xl mx-4 flex flex-col gap-6"
      >
        <div className="flex">
          <div className="flex w-full flex-col">
            <div className="flex justify-between w-full items-start gap-1">
              <span className="font-semibold text-neutral-900 text-base">Essentials</span>
              <ToggleSwitch
                size="sm"
                disabled
                checked={essentialsConsent}
              />
            </div>
            <p className="text-sm text-neutral-600">
              These cookies are essential for the proper functioning of our services and cannot be disabled.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex w-full flex-col">
            <div className="flex justify-between w-full items-start gap-1">
              <span className="font-semibold text-neutral-900 text-base">Analytics</span>
              <ToggleSwitch
                size="sm"
                checked={analyticsConsent}
                onCheckedChange={
                  (value) => {
                    updateCookieConsent({ analytics: value });
                  }
                }
              />
            </div>
            <p className="text-sm text-neutral-600">
              These cookies collect information about how you use our services or potential errors you encounter. Based on this information we are able to improve your experience and react to any issues.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex w-full flex-col">
            <div className="flex justify-between w-full items-start gap-1">
              <span className="font-semibold text-neutral-900 text-base">Marketing</span>
              <ToggleSwitch
                size="sm"
                checked={marketingConsent}
                onCheckedChange={
                  (value) => {
                    updateCookieConsent({ marketing: value });
                  }
                }
              />
            </div>
            <p className="text-sm text-neutral-600">
              These cookies collect information about how you use our services or potential errors you encounter. Based on this information we are able to improve your experience and react to any issues.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            <Button
              size='lg'
              variant='primary'
              textContent="Accept All"
              className="flex-1"
              onClick={() => {
                updateCookieConsent({ essentials: true, analytics: true, marketing: true });
                setIsModalOpen(false);
              }}
            />
            <Button
              size='lg'
              variant='secondary'
              textContent="Save"
              className="flex-1"
              onClick={() => {
                updateCookieConsent({ essentials: true, analytics: analyticsConsent, marketing: marketingConsent });
                setIsModalOpen(false);
              }}
            />
          </div>
          <Button
            size='lg'
            variant='destructive'
            textContent="Decline All"
            onClick={() => {
              updateCookieConsent({ essentials: true, analytics: false, marketing: false });
              setIsModalOpen(false);
            }}
          />
        </div>
      </div>
    </div >
  );
}
