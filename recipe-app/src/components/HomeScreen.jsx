import { useState } from 'react';
import { Photo } from './Photo.jsx';
import { I } from '../icons.jsx';
import { T, FAINT, MUTED } from '../tokens.js';

export function HomeScreen({ recipes, onRecipe, accent, screenBg }) {
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...Array.from(new Set(recipes.map(r => r.category)))];
  const shown = filter === 'All' ? recipes : recipes.filter(r => r.category === filter);
  const recent = [...recipes].slice(0, 3);

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:screenBg }}>
      {/* Header */}
      <div style={{ padding:'68px 24px 14px', flexShrink:0 }}>
        <div style={{ ...T.label, color:accent }}>our kitchen</div>
        <div style={{ ...T.cursive, fontSize:38, lineHeight:1, marginTop:6 }}>Family Recipes</div>
        <div style={{ ...T.meta, marginTop:4 }}>{recipes.length} recipes · {recipes.filter(r => r.favourite).length} saved</div>
      </div>

      {/* Recently added */}
      <div style={{ marginBottom:16, flexShrink:0 }}>
        <div style={{ ...T.label, padding:'4px 24px 10px' }}>recently added</div>
        <div style={{ display:'flex', gap:12, overflowX:'auto', padding:'0 24px 8px' }}>
          {recent.map(r => (
            <div key={r.id} onClick={() => onRecipe(r.id)} style={{ flexShrink:0, width:148, cursor:'pointer' }}>
              <div style={{ width:148, height:148, borderRadius:8, overflow:'hidden', position:'relative', background:'#f0f0f0' }}>
                <Photo src={r.photo} alt={r.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                {r.favourite && (
                  <div style={{ position:'absolute', top:8, right:8, width:24, height:24, borderRadius:12, background:'rgba(255,255,255,0.92)', display:'flex', alignItems:'center', justifyContent:'center', color:accent }}>
                    {I.heart(true, { width:13, height:13 })}
                  </div>
                )}
              </div>
              <div style={{ ...T.cursive, fontSize:18, lineHeight:1.15, marginTop:8 }}>{r.title}</div>
              <div style={{ ...T.meta, fontSize:11, marginTop:1 }}>{r.time}</div>
            </div>
          ))}
        </div>
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

      {/* Divider + label */}
      <div style={{ ...T.label, padding:'4px 24px 10px', borderTop:'1px solid ' + FAINT, flexShrink:0 }}>all recipes · {shown.length}</div>

      {/* List */}
      <div style={{ flex:1, overflowY:'auto', paddingBottom:8 }}>
        {shown.map(r => (
          <div key={r.id} onClick={() => onRecipe(r.id)} style={{ display:'flex', gap:14, padding:'12px 24px', cursor:'pointer', alignItems:'center' }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ ...T.cursive, fontSize:21, lineHeight:1.1, marginBottom:4 }}>{r.title}</div>
              <div style={{ ...T.meta, fontSize:12 }}>{r.category} · {r.time} · {r.servings} servings</div>
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
