import React, { useState, useEffect } from 'react';

export default function CalmOrb({ size = 'medium', className = '', delay = 0, variant = 'default' }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sizeClasses = {
    small: 'w-64 h-64 sm:w-80 sm:h-80',
    medium: 'w-[320px] h-[320px] sm:w-[480px] sm:h-[480px]',
    large: 'w-[450px] h-[450px] sm:w-[650px] sm:h-[650px]',
    extraLarge: 'w-[600px] h-[600px] sm:w-[900px] sm:h-[900px]',
  };

  const orbColorClass = variant === 'dark' ? 'orb-glow-purple-dark' : 'orb-glow-purple';

  if (isMobile) {
    return (
      <div className={`relative pointer-events-none select-none flex items-center justify-center ${className}`}>
        <div className={`absolute rounded-full ${orbColorClass} ${sizeClasses[size]}`} />
      </div>
    );
  }

  // Estilos de atraso para sincronizar as animações CSS
  const delayStyle1 = delay ? { animationDelay: `${delay}s` } : {};
  const delayStyle2 = { animationDelay: `${delay + 2}s` };
  const delayStyle3 = { animationDelay: `${delay + 4}s` };

  return (
    <div className={`relative pointer-events-none select-none flex items-center justify-center ${className}`}>
      
      {/* Camada 1: Núcleo Violeta Profundo (Respirador Principal) */}
      <div
        style={delayStyle1}
        className={`absolute rounded-full ${orbColorClass} ${sizeClasses[size]} animate-orb-float-1 will-change-transform`}
      />
      
      {/* Camada 2: Halo Lavanda e Azul Suave */}
      <div
        style={{
          ...delayStyle2,
          mixBlendMode: variant === 'dark' ? 'screen' : 'plus-lighter'
        }}
        className={`absolute rounded-full orb-glow-lavender ${sizeClasses[size]} animate-orb-float-2 will-change-transform`}
      />

      {/* Camada 3: Brilho Champanhe Dourado */}
      <div
        style={{
          ...delayStyle3,
          mixBlendMode: variant === 'dark' ? 'screen' : 'plus-lighter'
        }}
        className={`absolute rounded-full orb-glow-amber ${sizeClasses[size]} animate-orb-float-3 will-change-transform`}
      />
      
    </div>
  );
}
