import { INK } from '../tokens.js';

export function PillBtn({ children, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      style={{ background:'rgba(255,255,255,0.92)', backdropFilter:'blur(8px)', border:'0.5px solid rgba(0,0,0,0.08)', width:36, height:36, borderRadius:18, color:accent || INK, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}
    >
      {children}
    </button>
  );
}
