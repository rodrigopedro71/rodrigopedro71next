'use client'

import React, { useState, useEffect } from 'react';

interface ContadorPersonalizadoProps {
  title: string;
}

export default function ContadorPersonalizado({ title }: ContadorPersonalizadoProps) {
  const [likes, setLikes] = useState(0);


  useEffect(() => {
    const armazenado = localStorage.getItem(`likes_${title}`);
    if (armazenado !== null) {
      setLikes(Number(armazenado));
    }
  }, [title]);


  useEffect(() => {
    localStorage.setItem(`likes_${title}`, likes.toString());
  }, [likes, title]);

  function incrementar() {
    setLikes((l) => l + 1);
    
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={incrementar}
        className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
      >
        Likes: {likes}
      </button>
    </div>
  );
}
