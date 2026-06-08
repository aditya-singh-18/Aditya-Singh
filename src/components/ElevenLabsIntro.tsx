import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Volume2, ArrowRight } from "lucide-react";
import AudioVisualizer from "./AudioVisualizer";

interface ElevenLabsIntroProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  "initializing engineering portfolio...",
  "loading backend systems architecture...",
  "connecting project intelligence modules...",
  "verifying developer profile: ADITYA SINGH...",
  "system ready. welcome aboard."
];
export default function ElevenLabsIntro({ onComplete }: ElevenLabsIntroProps) {
  const [bootStep, setBootStep] = useState(0);
  const [lettersReveal, setLettersReveal] = useState(false);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Audio Context synthesis for real auditory feedback (ElevenLabs style!)
  const playEnteringChime = () => {
    try {
      setIsPlayingSynth(true);
      const AudioContextClass = globalThis.AudioContext || (globalThis as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const now = audioCtx.currentTime;

      // 1. Warm Low Bass Impact
      const oscBass = audioCtx.createOscillator();
      const gainBass = audioCtx.createGain();
      oscBass.connect(gainBass);
      gainBass.connect(audioCtx.destination);
      oscBass.type = "sine";
      oscBass.frequency.setValueAtTime(65, now); // C2
      oscBass.frequency.exponentialRampToValueAtTime(120, now + 1.2);
      gainBass.gain.setValueAtTime(0.001, now);
      gainBass.gain.linearRampToValueAtTime(0.6, now + 0.1);
      gainBass.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      // 2. High-end synthetic crystalline bell chime
      const oscBell = audioCtx.createOscillator();
      const gainBell = audioCtx.createGain();
      oscBell.connect(gainBell);
      gainBell.connect(audioCtx.destination);
      oscBell.type = "sine";
      oscBell.frequency.setValueAtTime(880, now); // A5
      oscBell.frequency.setValueAtTime(1174.66, now + 0.15); // D6
      oscBell.frequency.exponentialRampToValueAtTime(1760, now + 0.5); // A6
      gainBell.gain.setValueAtTime(0.001, now);
      gainBell.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gainBell.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      // 3. Modulated white noise vocal-like sweep
      const bufferSize = audioCtx.sampleRate * 1.5; // 1.5sec
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = buffer;
      
      const filterNode = audioCtx.createBiquadFilter();
      filterNode.type = "bandpass";
      filterNode.frequency.setValueAtTime(100, now);
      filterNode.frequency.exponentialRampToValueAtTime(2200, now + 1.2);
      filterNode.Q.setValueAtTime(4.0, now);

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.12, now + 0.4);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      noiseNode.connect(filterNode);
      filterNode.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);

      oscBass.start(now);
      oscBell.start(now);
      noiseNode.start(now);

      oscBass.stop(now + 2.0);
      oscBell.stop(now + 2.0);
      noiseNode.stop(now + 2.0);

      setTimeout(() => {
        setIsPlayingSynth(false);
      }, 2000);
    } catch (e) {
      setIsPlayingSynth(false);
      console.warn("Synthesizer bypassed due to frame security settings or browser default policies.", e);
    }
  };

  useEffect(() => {
    // 1. Sequential boot scripts simulating standard loader progress
    const bootInterval = setInterval(() => {
      setBootStep(prev => {
        if (prev < BOOT_MESSAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(bootInterval);
          setLettersReveal(true);
          return prev;
        }
      });
    }, 900);

    // 2. Continuous granular percentage indicator loading
    const percentInterval = setInterval(() => {
      setLoadedPercent(prev => {
        if (prev < 100) {
          const inc = Math.floor(Math.random() * 4) + 1;
          return Math.min(100, prev + inc);
        } else {
          clearInterval(percentInterval);
          return 100;
        }
      });
    }, 45);

    return () => {
      clearInterval(bootInterval);
      clearInterval(percentInterval);
    };
  }, []);

  const handleLaunch = () => {
    if (loadedPercent < 95 && !lettersReveal) return;
    setIsExiting(true);
    playEnteringChime();
    
    // Smooth cinematic fadeout that aligns perfect with UI transition delay
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  const adityaSpelling = "ADITYA".split("");

  return (
    <div
      id="elevenlabs-intro-wrapper"
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 overflow-hidden bg-[#080808] select-none text-white transition-all duration-1000 border-8 border-[#1A1A1A]"
    >
      {/* Background Matrix/Grid Overlay */}
      <div 
        id="cinematic-bg-grid"
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-color-dodge transition-opacity duration-1000"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, white 1px, transparent 0),
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px",
          backgroundPosition: "center center",
        }}
      />

      {/* Subtle floating blue ambient glow */}
      <div 
        id="bg-laser-glow-left"
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF4D00]/10 blur-[130px] pointer-events-none" 
      />
      <div 
        id="bg-laser-glow-right"
        className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none" 
      />

      {/* Header telemetry and clock */}
      <div className="flex justify-between items-center w-full font-mono text-[10px] text-gray-500 tracking-wider">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-[#FF4D00] animate-pulse" />
          <span>JAVA • SPRING BOOT • SYSTEM DESIGN</span>
        </div>
        <div>
          <span>ADITYA SINGH</span>
        </div>
      </div>

      {/* Core central letters assemblers */}
      <div className="flex flex-col items-center justify-center flex-grow py-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[170%] w-full max-w-[540px] px-6 text-center select-none pointer-events-none">
          {/* Audio Visualizer matching ElevenLabs Spectrum */}
          <AudioVisualizer isPulsing={true} height={80} waveCount={isHovered || isPlayingSynth ? 4 : 3} />
        </div>

        {/* Spelling name text */}
        <div className="flex items-center justify-center gap-3 md:gap-7 mt-16 relative z-10">
          {adityaSpelling.map((letter, idx) => (
            <motion.span
              id={`intro-letter-${letter}-${idx}`}
              key={idx}
              initial={{ opacity: 0, y: 15, filter: "blur(12px)", scale: 0.85 }}
              animate={
                isExiting
                  ? { opacity: 0, y: -40, filter: "blur(20px)", scale: 1.15 }
                  : lettersReveal
                  ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
                  : { opacity: 0.15, y: 0, filter: "blur(4px)", scale: 0.95 }
              }
              transition={{
                delay: isExiting ? idx * 0.05 : idx * 0.12,
                duration: isExiting ? 0.6 : 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-4xl sm:text-6xl md:text-8xl font-sans tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 font-extrabold"
              style={{
                textShadow: "0px 15px 30px rgba(0, 0, 0, 0.4)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Status text */}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: lettersReveal ? 1 : 0,
            y: lettersReveal ? 0 : 10,
          }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="mt-4 text-center"
          >
            <p className="text-sm md:text-lg text-gray-400 tracking-[0.2em] uppercase font-medium">
              Backend Engineer • System Designer • Problem Solver
            </p>
        </motion.div>
        <div className="h-6 font-mono text-[11px] text-[#FF4D00]/80 mt-6 md:mt-8 tracking-[0.25em] text-center select-none z-10 w-full px-4">
          <AnimatePresence mode="wait">
            {!lettersReveal ? (
              <motion.span
                key={bootStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="inline-block uppercase"
              >
                {BOOT_MESSAGES[bootStep]}
              </motion.span>
            ) : (
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="inline-block font-sans uppercase font-semibold text-white/50 tracking-[0.3em]"
              >
                ENTER THE MIND OF AN ENGINEER
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom control zone */}
      <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto relative z-10">
        {/* Interaction trigger overlay */}
        <AnimatePresence>
          {lettersReveal && (
            <motion.div
              id="intro-launch-control"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-3 w-full"
            >
              <button
                id="transmit-portfolio-button"
                onClick={handleLaunch}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                disabled={isExiting}
                className="group relative w-full flex items-center justify-between px-6 py-4 rounded-xl border border-[#1A1A1A] bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] transition-all duration-300 backdrop-blur-xl cursor-pointer hover:border-orange-500/30 overflow-hidden"
                style={{
                  boxShadow: isHovered 
                    ? "0 0 35px -5px rgba(255, 77, 0, 0.15), inset 0 1px 0px 0px rgba(255,255,255,0.1)"
                    : "inset 0 1px 0px 0px rgba(255,255,255,0.05)",
                }}
              >
                {/* Laser hover glow sweep */}
                <div 
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-[#FF4D00]/10 to-transparent skew-x-12 -translate-x-full transition-transform duration-1000 ease-out group-hover:translate-x-[250%]"
                />

                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-orange-950/40 border border-[#FF4D00]/20 text-[#FF4D00] group-hover:scale-105 transition-transform duration-300">
                    <Volume2 size={16} className={isHovered ? "animate-pulse" : ""} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs uppercase font-mono tracking-wider text-gray-400">ADITYA'S DIGITAL ECOSYSTEM</div>
                    <div className="text-sm font-semibold tracking-wide">Explore Systems, Projects & Impact</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-[#FF4D00] group-hover:text-white transition-colors duration-300">
                  <span>ENTER EXPERIENCE</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest text-center">
                Enable audio for the full cinematic experience
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading progress bar indicator */}
        {!lettersReveal && (
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between items-center font-mono text-[9px] text-gray-500">
              <span>LOADING ENGINEERING MODULES: {loadedPercent}%</span>
              <span>SYSTEMS: ONLINE</span>
            </div>
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF4D00]"
                style={{ width: `${loadedPercent}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Cinematic Flash Transition overlay on exit */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            id="strobe-transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none z-50 bg-[#080808] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: [1, 2, 8], opacity: [0, 0.85, 0], filter: ["blur(10px)", "blur(2px)", "blur(30px)"] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-[120px] h-[120px] rounded-full bg-[#FF4D00]/50 mix-blend-screen pointer-events-none absolute"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
