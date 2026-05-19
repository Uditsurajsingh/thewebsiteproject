"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "dealgrid_interaction_consent";

type ConsentStatus = "accepted" | "declined";

type ConsentRecord = {
  status: ConsentStatus;
  storedAt: string;
  analyticsProcessing: boolean;
};

function storeConsent(status: ConsentStatus) {
  const record: ConsentRecord = {
    status,
    storedAt: new Date().toISOString(),
    analyticsProcessing: status === "accepted",
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

export function ConsentModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!window.localStorage.getItem(STORAGE_KEY));
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="consentOverlay" role="presentation">
      <section
        aria-labelledby="consent-title"
        aria-modal="true"
        className="consentModal"
        role="dialog"
      >
        <p className="eyebrow">Data notice</p>
        <h2 id="consent-title">Help us improve DealGrid</h2>
        <p>
          We may store interaction data to find issues and improve development.
          This data may be used for analytics. No personal data is stored.
        </p>
        <p>
          If you decline, we store your choice with the tag{" "}
          <strong>declined</strong> and do not process your interaction data
          further for analytics.
        </p>
        <div className="consentActions">
          <button
            type="button"
            onClick={() => {
              storeConsent("declined");
              setIsOpen(false);
            }}
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              storeConsent("accepted");
              setIsOpen(false);
            }}
          >
            Accept
          </button>
        </div>
      </section>
    </div>
  );
}
