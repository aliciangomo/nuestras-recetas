import { useState } from 'react';
import { Photo } from './Photo.jsx';
import { I } from '../icons.jsx';
import { T, FAINT, MUTED } from '../tokens.js';
import { S } from '../strings.js';


export function HomeScreen({ recipes, onRecipe, accent, screenBg }) {
  const [filter, setFilter] = useState(S.catAll);
  const cats = [S.catAll, ...Array.from(new Set(recipes.map(r => r.category)))];
  const shown = filter === S.catAll ? recipes : recipes.filter(r => r.category === filter);

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:screenBg }}>
      {/* Header */}
      <div style={{ padding:'68px 24px 14px', flexShrink:0 }}>
        <div style={{ ...T.label, color:accent }}>{S.tagline}</div>
        <div style={{ ...T.cursive, fontSize:38, lineHeight:1, marginTop:6 }}>{S.appName}</div>
        <div style={{ ...T.meta, marginTop:4 }}>{S.recipeCount(recipes.length)} · {S.savedCount(recipes.filter(r => r.favourite).length)}</div>
      </div>

      {/* Category filter */}
      <div style={{ display:'flex', gap:6, padding:'0 24px 12px', overflowX:'auto', flexShrink:0 }}>
        {cats.map(c => {
          const active = filter === c;
          return (
            <button key={c} onClick={() => setFilter(c)} style={{ padding:'6px 14px', borderRadius:20, border:active ? `1.5px solid ${accent}` : '1.5px solid ' + FAINT, background:active ? accent : 'transparent', color:active ? '#fff' : MUTED, ...T.body, fontSize:12.5, fontWeight:500, whiteSpace:'nowrap', cursor:'pointer' }}>{c}</button>
          );
        })}
      </div>

      {/* Label */}
      <div style={{ ...T.label, padding:'4px 24px 10px', borderTop:'1px solid ' + FAINT, flexShrink:0 }}>{S.allRecipes} · {shown.length}</div>

      {/* List */}
      <div style={{ flex:1, overflowY:'auto', paddingBottom:8 }}>
        {shown.map(r => (
          <div key={r.id} onClick={() => onRecipe(r.id)} style={{ display:'flex', gap:14, padding:'12px 24px', cursor:'pointer', alignItems:'center' }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ ...T.cursive, fontSize:21, lineHeight:1.1, marginBottom:4 }}>{r.title}</div>
              <div style={{ ...T.meta, fontSize:12 }}>{r.category} · {r.time} · {r.servings} {S.servings}</div>
            </div>
            <div style={{ width:64, height:64, borderRadius:8, overflow:'hidden', flexShrink:0, position:'relative', background:'#f0f0f0' }}>
              <Photo src={r.photo} alt={r.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
              {r.favourite && (
                <div style={{ position:'absolute', top:5, right:5, color:'#fff', filter:'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }}>
                  {I.heart(true, { width:13, height:13 })}
                </div>
              )}
            </div>
          </div>
        ))}
        <div style={{ height:8 }}/>
      </div>
    </div>
  );
}
