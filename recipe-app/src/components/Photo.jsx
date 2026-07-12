import { useState } from 'react';

export function Photo({ src, alt, fallback, style, ...rest }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div style={{ ...style, background: fallback || 'linear-gradient(135deg,#e8efe2,#d4ddc8)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <span style={{ fontFamily:'Caveat,cursive', fontSize:42, color:'rgba(0,0,0,0.18)', fontWeight:700 }}>{(alt || '?').charAt(0)}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} {...rest} />;
}
