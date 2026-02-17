import { Suspense } from "react";
import Page from "@/components/portfeuille/page";

export default function PortefeuillePage() {
  return (
    <div>
      <Suspense fallback={<div>Chargement...</div>}>
        <Page />
      </Suspense>
    </div>
  );
}
