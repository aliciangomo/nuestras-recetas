import { useState } from 'react';
import { Photo } from './Photo.jsx';
import { I } from '../icons.jsx';
import { T, MUTED, INK } from '../tokens.js';
import { S } from '../strings.js';

export function SearchScreen({ recipes, onRecipe, accent, screenBg, palette }) {
  const [q, setQ] = useState('');
  const recent = ['limón', 'pollo', 'pasta', 'plátano'];
  const results = q.trim()
    ? recipes.filter(r =>
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        r.category.toLowerCase().includes(q.toLowerCase()) ||
        r.ingredients.some(i => i.toLowerCase().includes(q.toLowerCase()))
      )
    : [];

  return (
    <div className="fade-in" style={{ height:'100%', display:'flex', flexDirection:'column', background:screenBg }}>
      <div style={{ padding:'68px 24px 4px', flexShrink:0 }}>
        <div style={{ ...T.cursive, fontSize:32, lineHeight:1 }}>{S.searchTitle}</div>
        <div style={{ ...T.meta, marginTop:2, fontStyle:'italic' }}>{S.searchTagline}</div>
      </div>

      <div style={{ padding:'14px 24px 12px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, background:palette.accentSoft, borderRadius:10, padding:'10px 14px' }}>
          <span style={{ color:MUTED }}>{I.search({ width:18, height:18 })}</span>
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={S.searchPlaceholder}
            style={{ flex:1, background:'none', border:'none', outline:'none', ...T.body, fontSize:15 }}
          />
          {q && <button onClick={() => setQ('')} style={{ ...T.meta, fontSize:13, background:'none', border:'none', cursor:'pointer', color:MUTED, padding:0 }}>{S.clear}</button>}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto' }}>
        {!q.trim() ? (
          <div style={{ padding:'8px 24px' }}>
            <div style={{ ...T.label, marginBottom:10, color:accent }}>{S.recentSearches}</div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {recent.map(t => (
                <button key={t} onClick={() => setQ(t)} style={{ padding:'7px 14px', borderRadius:18, background:palette.accentSoft, border:'none', ...T.body, fontSize:13, color:accent, fontWeight:500, cursor:'pointer' }}>{t}</button>
              ))}
            </div>
            <div style={{ ...T.label, marginTop:28, marginBottom:14, color:accent }}>{S.browseBy}</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {S.browseItems.map(label => (
                <button key={label} onClick={() => setQ(label.split(' ')[0])} style={{ padding:'18px 14px', borderRadius:10, background:palette.accentSoft, border:'none', ...T.body, fontSize:13, fontWeight:500, color:INK, textAlign:'left', cursor:'pointer', minHeight:64 }}>{label}</button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ ...T.label, padding:'4px 24px 8px' }}>{S.results(results.length, q)}</div>
            {results.length === 0 ? (
              <div style={{ ...T.meta, padding:'24px', textAlign:'center', fontStyle:'italic' }}>{S.noResults}</div>
            ) : (
              results.map(r => (
                <div key={r.id} onClick={() => onRecipe(r.id)} style={{ display:'flex', gap:14, padding:'12px 24px', cursor:'pointer', alignItems:'center' }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ ...T.cursive, fontSize:20, lineHeight:1.1, marginBottom:3 }}>{r.title}</div>
                    <div style={{ ...T.meta, fontSize:12 }}>{r.category} · {r.time}</div>
                  </div>
                  <div style={{ width:60, height:60, borderRadius:8, overflow:'hidden', flexShrink:0 }}>
                    <Photo src={r.photo} alt={r.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        <div style={{ height:24 }}/>
      </div>
    </div>
  );
}
