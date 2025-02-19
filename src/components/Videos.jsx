import React from 'react';
import { motion } from 'framer-motion';
import Section from './Section';

const youtubeVideos = [
  {
    url: "https://www.youtube.com/embed/ni-1assZsfc?si=ADdSbv7V5d1bRvkB",
    title: 'SNX | Hyderabad Beatbox Championship 2024'
  },
  {
    url: "https://www.youtube.com/embed/QyGCPgzaoS8?si=qvTQcV1Kpy1O-741",
    title: "SNX vs Xyku | Hyderabad Beatbox Championship 2024"
  },
  {
    url: "https://www.youtube.com/embed/C2qtRLccbIs?si=3OAZsP5K6SaPqNnA",
    title: "Piku vs Tej | Hyderabad Beatbox Championship 2024"
  },
  {
    url: "https://www.youtube.com/embed/py49gbZ-xZY?si=km9Wy13CbIzyJvM_",
    title: 'RIP vs SNX | Hyderabad Beatbox Championship 2024'
  },
  {
    url: "https://www.youtube.com/embed/BUK9URefJnA?si=e-m6wprMYuz245Ya",
    title: "Mute vs Xyku | Hyderabad Beatbox Championship 2024"
  },
  {
    url: "https://www.youtube.com/embed/806ipUGsKbI?si=XnmY4yT1CaQ9lMr7",
    title: "Mute | Hyderabad Beatbox Championship 2024"
  }
];

function Videos() {
  return (
    <Section id="videos" className="section-padding bg-black/50">
      <div className="container-width">
        <h2 className="section-title text-center">Featured Videos</h2>
        <div className="overflow-x-auto custom-scrollbar">
          <div className="flex space-x-8 py-8" style={{ width: 'max-content' }}>
            {youtubeVideos.map((video, index) => (
              <motion.div
                key={index}
                className="card w-[400px]"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative pb-[56.25%]">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="absolute inset-0 w-full h-full rounded-t-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white/90">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Videos;