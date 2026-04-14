'use client';
import React from 'react';
import Link from 'next/link';
import { FaHeartBroken, FaMoon, FaGhost, FaFire, FaCloud, FaSearch } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

      <div className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(135deg, #000000 0%, #0d0015 40%, #1a0030 70%, #2d0050 100%)' }}
      />

      <div className="absolute top-[-60px] left-[-60px] w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ background: '#7c3aed' }}
      />
      <div className="absolute bottom-[-40px] right-[-40px] w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: '#9333ea' }}
      />

      <div className="animate-float absolute top-16 left-10 opacity-20" style={{ animationDelay: '0s', color: '#7c3aed', fontSize: '28px' }}><FaHeartBroken /></div>
      <div className="animate-float absolute top-24 right-14 opacity-20" style={{ animationDelay: '0.6s', color: '#7c3aed', fontSize: '24px' }}><FaMoon /></div>
      <div className="animate-float absolute bottom-24 left-16 opacity-20" style={{ animationDelay: '1.1s', color: '#7c3aed', fontSize: '24px' }}><FaGhost /></div>
      <div className="animate-float absolute bottom-16 right-10 opacity-20" style={{ animationDelay: '1.6s', color: '#7c3aed', fontSize: '28px' }}><FaFire /></div>
      <div className="animate-float absolute top-1/2 right-8 opacity-20" style={{ animationDelay: '0.9s', color: '#7c3aed', fontSize: '22px' }}><FaCloud /></div>

      <div className="animate-fadeup-1 relative rounded-2xl px-10 py-12 max-w-md w-full"
        style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="animate-fadeup-2 font-extrabold leading-none mb-4"
          style={{ fontSize: 'clamp(80px,18vw,120px)', background: 'linear-gradient(135deg, #4c1d95, #7c3aed, #6d28d9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          404
        </div>

        <div className="animate-float my-3 flex justify-center opacity-70" style={{ color: '#7c3aed', fontSize: '48px' }}>
          <FaSearch />
        </div>

        <h2 className="animate-fadeup-3 font-bold text-xl mb-3" style={{ color: '#c4b5fd' }}>
          You seem lost...
        </h2>

        <p className="animate-fadeup-4 text-sm leading-relaxed mb-3" style={{ color: '#6b7280', maxWidth: '300px', margin: '0 auto 12px' }}>
          This page does not exist. The connection you were looking for could not be found.
        </p>

        <p className="animate-fadeup-4 text-xs leading-relaxed mb-8" style={{ color: '#4b5563' }}>
          Sometimes paths disappear — but there is always a way back.
        </p>

        <div className="w-12 h-px mx-auto mb-8" style={{ background: 'rgba(124,58,237,0.3)' }} />

        <div className="animate-fadeup-5 flex gap-3 justify-center flex-wrap">
          <Link href="/"
            className="px-6 py-3 rounded-full font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #3b0764, #6d28d9)', color: '#e9d5ff' }}
          >
            Find My Way Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-full font-bold text-sm"
            style={{ border: '1px solid rgba(124,58,237,0.25)', background: 'transparent', color: '#6b7280', cursor: 'pointer' }}
          >
            Go Back
          </button>
        </div>
      </div>

      <p className="animate-slide-in text-xs mt-8" style={{ color: '#374151' }}>
        You are not alone — let us guide you back.
      </p>

    </div>
  );
};

export default NotFoundPage;