/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import ElevenLabsIntro from "./components/ElevenLabsIntro";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [isSynthesized, setIsSynthesized] = useState<boolean>(false);

  return (
    <div id="application-container-viewport" className="w-full min-h-screen bg-[#080808]">
      {!isSynthesized ? (
        <ElevenLabsIntro onComplete={() => setIsSynthesized(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
