import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroCover() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -40]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white/0" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          <h1 className="font-manrope text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Experience Precision. Elevate Your Everyday.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-200 sm:text-lg">
            A minimalist, premium product page with immersive visuals, accessible interactions, and effortless purchasing.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
