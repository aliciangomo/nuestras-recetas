import { useState } from 'react';
import { S } from '../strings.js';

const KITCHEN_PHOTO = '/welcome.jpg';

export function WelcomeScreen({ onEnter }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="fade-in" style={{ height:'100%', position:'relative', overflow:'hidden', background:'#f5ede2' }}>
      {/* Photo — extended to 76% to give gradient more room */}
      <img
        src={KITCHEN_PHOTO}
        alt="cocina"
        onLoad={() => setImgLoaded(true)}
        style={{ position:'absolute', inset:0, width:'100%', height:'76%', objectFit:'cover', objectPosition:'center top', display:'block', opacity: imgLoaded ? 1 : 0, transition:'opacity .8s ease' }}
      />

      {/* Gradient fades photo → warm cream (not white) */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(255,255,255,0) 48%, rgba(245,237,226,0.2) 56%, rgba(245,237,226,0.6) 63%, rgba(245,237,226,0.9) 69%, #f5ede2 75%)' }}/>

      {/* Content panel — reverse gradient: cream at top fading to white */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 32px 56px', textAlign:'center', background:'linear-gradient(to bottom, #f5ede2 0%, #faf6f0 30%, #fff 60%)' }}>
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
