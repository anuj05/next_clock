"use client";
import React, { useEffect, useState } from "react"; 
import Image from "next/image";

export default function Home() {

  const [time, setTime] = useState(null);

  useEffect(() => {
    // Set interval to update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Avoid "Hydration Mismatch" (Server vs Client time difference)
  if (!time) return <div className="min-h-screen bg-[#0f172a]" />;

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  // Rotation Calculations
  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f172a] p-4">
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] text-[12px] sm:text-[16px]">
        
        {/* Clock Face */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1e293b] to-[#334155] border-[0.5em] border-[#6366f1] shadow-[0_0_50px_rgba(99,102,241,0.3)]">
          
          {/* Numbers */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <div
              key={num}
              className="absolute w-full h-full text-center font-black text-[#f8fafc] text-[1.8em]"
              style={{
                transform: `rotate(${num * 30}deg)`,
                padding: '0.5em'
              }}
            >
              <span className="inline-block" style={{ transform: `rotate(-${num * 30}deg)` }}>
                {num}
              </span>
            </div>
          ))}

          {/* Hands */}
          {/* Hour */}
          <div 
            className="absolute bottom-1/2 left-1/2 w-[0.6em] h-[25%] bg-white rounded-full origin-bottom -translate-x-1/2 shadow-lg"
            style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
          />
          {/* Minute */}
          <div 
            className="absolute bottom-1/2 left-1/2 w-[0.4em] h-[38%] bg-[#818cf8] rounded-full origin-bottom -translate-x-1/2 shadow-lg"
            style={{ transform: `translateX(-50%) rotate(${minDeg}deg)` }}
          />
          {/* Second */}
          <div 
            className="absolute bottom-1/2 left-1/2 w-[0.15em] h-[45%] bg-[#f43f5e] rounded-full origin-bottom -translate-x-1/2 shadow-md"
            style={{ transform: `translateX(-50%) rotate(${secDeg}deg)` }}
          />
          
          {/* Center Pin */}
          <div className="absolute top-1/2 left-1/2 w-[1em] h-[1em] bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10 border-2 border-[#1e293b]" />
        </div>

        {/* Digital Readout */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 bg-[#1e1b4b] border border-[#818cf8] px-4 py-2 rounded-lg text-[#22d3ee] font-mono text-[1.5em] flex items-baseline gap-1 shadow-inner">
          <span>{displayHours.toString().padStart(2, '0')}</span>
          <span className="animate-pulse">:</span>
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span className="text-[0.6em] ml-1 text-[#f472b6] font-bold">{ampm}</span>
        </div>
      </div>
    </main>
  );

}
