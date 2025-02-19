import React from 'react';
import { LuMicVocal } from "react-icons/lu";
import ReactTypingEffect from 'react-typing-effect';
import Header from './components/Header';
import About from './components/About';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
import Contact from './components/Contact';

function ImageCarousel() {
  const [currentImage, setCurrentImage] = React.useState(0);
  const images = ['/home1.webp', '/home2.webp', '/home3.webp', '/home4.webp', '/Home5.webp', '/Home6.webp'];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="home" className="relative h-screen overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={src} alt="Landscape" className="w-full h-full object-cover" />
          <div className="hero-gradient absolute inset-0" />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center ">
        <div className="text-center p-8 max-w-5xl mt-80">
          {/* <Mic className="w-16 h-16 mx-auto mb-6 text-[#5c2a2a] animate-pulse" /> */}
          <LuMicVocal className="w-16 h-16 mx-auto mb-6 text-[#909090] animate-pulse" />
          <h1 className="text-4xl md:text-8xl font-bold mb-8 text-gradient tracking-tight">
            Hyderabad Beatbox Community
          </h1>
          <p className="text-xl md:text-xl text-white/60 max-w-2xl mx-auto">
            Uniting rhythms, creating beats, building community
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-black text-white">
      <Header />
      <ImageCarousel />
      <About />
      <Events />
      <Gallery />
      <Videos />
      <Contact />
      <footer className="glass-effect py-8 px-4 text-center text-sm text-white/60">
        <p>© 2024 Hyderabad Beatbox Community. All rights reserved.</p>
        <p className="text-center text-white/40 text-[10px]">
          <ReactTypingEffect
            text={["Developed by X Boy"]}
            speed={100}
            eraseDelay={2000}
            typingDelay={1000}
            cursorRenderer={cursor => <span>{cursor}</span>}
          />
        </p>
       
      </footer>
    </div>
  );
}

export default App;