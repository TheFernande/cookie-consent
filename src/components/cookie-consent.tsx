"use client";

import { useCookieStorage } from "@/hooks/use-cookie-storage";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CookieModal from "./cookie-modal";
import { Button } from "./ui/button";


export default function CookieConsent() {
  const [cookieConsent, setCookieConsent] = useCookieStorage('cookieConsent', {
    essentials: true,
    analytics: true,
    marketing: true
  }, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60, // 1 year
    sameSite: 'Strict'
  });
  const essentialsConsent = cookieConsent.essentials;
  const analyticsConsent = cookieConsent.analytics;
  const marketingConsent = cookieConsent.marketing;

  const updateCookieConsent = (updates: Partial<typeof cookieConsent>) => {
    setCookieConsent({ ...cookieConsent, ...updates });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef, isModalOpen);

  useEffect(() => {
    console.log({
      essentialsConsent,
      analyticsConsent,
      marketingConsent,
    })
  }, [essentialsConsent, analyticsConsent, marketingConsent])

  return (
    <div className="w-full h-fit bg-white p-4 flex flex-col justify-start items-center gap-6 fixed bottom-0 left-0 right-0 z-50">
      <div className="flex flex-col gap-1">
        <span className="text-base text-neutral-900 font-semibold">We use cookies</span>
        <p className="text-sm text-neutral-600">
          We use cookies to enhance your browsing experience and improve our website&apos;s performance. By continuing to use this site, you consent to the use of cookies. To learn more about how we use cookies and your options, please read our{" "}
          <Link href="/privacy" className="text-indigo-700">
            cookie policy.
          </Link>
        </p>
      </div>
      <div className="flex gap-2 flex-col w-full">
        <div className="flex gap-2  flex-col">
          <Button
            size='lg'
            variant='primary'
            textContent="Allows Cookies"
            onClick={() => {
              updateCookieConsent({ essentials: true, analytics: true, marketing: true });
            }}
          />
          <Button
            size='lg'
            variant='secondary'
            textContent="Manage Cookies"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <Button
          size='lg'
          variant='destructive'
          textContent="Decline All"
          onClick={() => {
            updateCookieConsent({ essentials: true, analytics: false, marketing: false });
          }}
        />
      </div>


      {/* Modal */}
      {isModalOpen && (
        <CookieModal
          essentialsConsent={essentialsConsent}
          analyticsConsent={analyticsConsent}
          marketingConsent={marketingConsent}
          updateCookieConsent={updateCookieConsent}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div >
  );
}
