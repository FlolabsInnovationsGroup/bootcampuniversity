"use client";

import { useEffect, useRef, useState } from "react";

const FORM_ID = "e253f271-892a-4e5c-90d5-77b9c74e7a11";
const FORM_ORIGIN = "https://crm.flolabsinnovations.com";
const APPLICATION_FORM_URL = `${FORM_ORIGIN}/forms/72138f98-ad15-4929-af96-be3868b77adb/${FORM_ID}?embed=1`;

type FormMessage = {
  type?: string;
  formId?: string;
  height?: number;
};

export function ApplicationForm() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(720);
  const [src, setSrc] = useState<string | undefined>();

  useEffect(() => {
    function onMessage(event: MessageEvent<FormMessage>) {
      const frameWindow = iframeRef.current?.contentWindow;
      if (!frameWindow || event.source !== frameWindow) return;
      if (event.origin !== FORM_ORIGIN && event.origin !== "null") return;

      const data = event.data;
      if (!data || data.formId !== FORM_ID || data.type !== "flolabs-form:resize") return;
      if (typeof data.height !== "number" || data.height <= 0) return;

      setHeight(Math.ceil(data.height));
    }

    window.addEventListener("message", onMessage);
    setSrc(APPLICATION_FORM_URL);

    return () => {
      window.removeEventListener("message", onMessage);
      setSrc(undefined);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title="BootcampUniversity Application form"
      className="block w-full border-0"
      style={{ height }}
    />
  );
}
