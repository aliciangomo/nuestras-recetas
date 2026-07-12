import { Sheet } from './Sheet.jsx';
import { T, FAINT, INK, MUTED } from '../tokens.js';

export function DeleteSheet({ recipe, onConfirm, onCancel }) {
  return (
    <Sheet onClose={onCancel}>
      <div style={{ padding:'0 24px' }}>
        <div style={{ ...T.body, fontSize:18, fontWeight:700, marginBottom:8 }}>Delete this recipe?</div>
        <p style={{ ...T.serif, fontStyle:'italic', color:MUTED, fontSize:14, lineHeight:1.55, marginBottom:22 }}>"{recipe.title}" will be removed from your collection. This cannot be undone.</p>
        <div style={{ display:'flex', gap:10, marginBottom:8 }}>
          <button onClick={onCancel} style={{ flex:1, padding:'13px 0', borderRadius:8, border:'1.5px solid ' + FAINT, background:'none', ...T.body, fontSize:14, fontWeight:500, color:INK, cursor:'pointer' }}>Keep it</button>
          <button onClick={onConfirm} style={{ flex:1, padding:'13px 0', borderRadius:8, border:'none', background:'#9c3a3a', ...T.body, fontSize:14, fontWeight:600, color:'#fff', cursor:'pointer' }}>Delete</button>
        </div>
      </div>
    </Sheet>
  );
}
