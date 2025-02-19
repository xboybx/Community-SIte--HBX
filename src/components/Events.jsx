import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from './Section';

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (Object.keys(timeLeft).length === 0) {
    return <p className="text-primary">Event has started!</p>;
  }

  return (
    <div className="flex space-x-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="w-16 h-16 bg-[#0066FF]/10 rounded-lg flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-[#0066FF]">{value}</span>
          </div>
          <span className="text-xs uppercase text-white/60">{unit}</span>
        </div>
      ))}
    </div>
  );
}

function Events() {
  return (
    <Section id="events" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/home1.webp')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      
      <div className="container-width relative z-10">
        <h2 className="section-title text-center">Upcoming Events</h2>
        
        {/* Countdown Timer */}
        <div className="mb-16 text-center">
          <p className="text-[#0066FF] mb-4">NEXT EVENT</p>
          <CountdownTimer targetDate="2025-02-22T16:00:00" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="card p-8"
            whileHover={{ y: -10 }}
          >
            <Users className="w-12 h-12 text-[#0066FF] mb-6" />
            <h3 className="text-2xl font-semibold mb-4">7 to Smoke Battle</h3>
            <div className="flex items-center text-[#0066FF] mb-4">
              <Clock className="w-4 h-4 mr-2" />
              <span>February 22, 2025 | 4:00 PM Onwards</span>
            </div>
            <p className="text-white/60">
              Hyderabad!!!🔥 Get ready for the Hyderabad Beatbox Showcase! 
              Come thru show your support! 
              📍EXT, Hyderabad
            </p>
          </motion.div>
          
          <motion.div 
            className="card p-8"
            whileHover={{ y: -10 }}
          >
            <Calendar className="w-12 h-12 text-[#0066FF] mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Monthly Jam Session</h3>
            <div className="flex items-center text-[#0066FF] mb-4">
              <Clock className="w-4 h-4 mr-2" />
              <span>Dynamic Timings</span>
            </div>
            <p className="text-white/60">
              Open practice session for all skill levels. Join us for an evening of beats, 
              battles, and community building.
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

export default Events;