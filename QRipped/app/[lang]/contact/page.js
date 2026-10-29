import React from "react";
import { getDictionary } from "../../lib/dictionaries";
import ContactClient from "./ContactClient";

export default async function ContactPage({ params }) {
  // Në Next.js 15+/16 params është Promise, prandaj përdoret await në server
  const { lang } = await params;
  const dict = await getDictionary(lang || "sq");

  return <ContactClient lang={lang} dict={dict} />;
}