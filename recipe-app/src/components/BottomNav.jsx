import { I } from '../icons.jsx';
import { T } from '../tokens.js';

export function BottomNav({ tab, onTab, accent, screenBg }) {
  const items = [
    { id:'home',   label:'Recipes', ico: I.book },
    { id:'search', label:'Search',  ico: I.search },
    { id:'add',    label:'Add',     ico: I.plus },
    { id:'saved',  label:'Saved',   ico: p => I.heart(tab === 'saved', p) },
  ];

  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:84, background:screenBg || '#fff', borderTop:'1px solid rgba(0,0,0,0.05)', display:'flex', zIndex:100 }}>
      {items.map(it => {
        const active = tab === it.id;
        const Ico = it.ico;
        if (it.id === 'add') {
          return (
            <button key={it.id} onClick={() => onTab(it.id)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer', paddingBottom:20 }}>
              <div style={{ width:44, height:44, borderRadius:22, background:accent, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', boxShadow:`0 6px 16px ${accent}55`, transition:'transform .2s', transform:active ? 'scale(1.05)' : 'scale(1)' }}>
                <Ico width="22" height="22"/>
              </div>
            </button>
          );
        }
        return (
          <button key={it.id} onClick={() => onTab(it.id)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, background:'none', border:'none', cursor:'pointer', color:active ? accent : '#bdbdbd', paddingBottom:20 }}>
            <Ico width="22" height="22"/>
            <span style={{ ...T.meta, fontSize:10.5, color:active ? accent : '#bdbdbd', fontWeight:active ? 600 : 400, letterSpacing:0.3 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
