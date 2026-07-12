import { useState } from 'react';
import { S } from '../strings.js';

// Minimalist white & green kitchen
const KITCHEN_PHOTO = 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=85&auto=format&fit=crop';

export function WelcomeScreen({ onEnter }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="fade-in" style={{ height:'100%', position:'relative', overflow:'hidden', background:'#d8e8d8' }}>
      {/* Kitchen photo */}
      <img
        src={KITCHEN_PHOTO}
        alt="cocina"
        onLoad={() => setImgLoaded(true)}
        style={{ position:'absolute', inset:0, width:'100%', height:'65%', objectFit:'cover', objectPosition:'center top', display:'block', opacity: imgLoaded ? 1 : 0, transition:'opacity .8s ease' }}
      />

      {/* Soft gradient over photo */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(255,255,255,0) 30%, rgba(255,255,255,0.92) 60%, #fff 80%)' }}/>

      {/* Content panel */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 32px 56px', textAlign:'center' }}>
        {/* Handwritten title — Caveat, same as app headings */}
        <div style={{ fontFamily:'Caveat,cursive', fontWeight:700, fontSize:54, lineHeight:1.05, color:'#2a1f14', marginBottom:6 }}>
          {S.appName}
        </div>

        {/* Serif italic tagline */}
        <div style={{ fontFamily:'Lora,Georgia,serif', fontStyle:'italic', fontSize:14, color:'#8a7968', lineHeight:1.6, marginBottom:40 }}>
          {S.welcomeTagline}
        </div>

        {/* CTA */}
        <button
          onClick={onEnter}
          style={{ background:'#5b7b62', color:'#fff', border:'none', borderRadius:28, padding:'15px 44px', fontFamily:'DM Sans,system-ui,sans-serif', fontSize:15, fontWeight:600, cursor:'pointer', boxShadow:'0 10px 28px rgba(91,123,98,0.38)', letterSpacing:0.2 }}
        >
          {S.welcomeBtn}
        </button>
      </div>
    </div>
  );
}
