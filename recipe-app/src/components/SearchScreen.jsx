import { useState } from 'react';
import { Photo } from './Photo.jsx';
import { I } from '../icons.jsx';
import { T, FAINT, MUTED, INK } from '../tokens.js';
import { S } from '../strings.js';

function FilterChip({ label, active, onClick, accent, palette }) {
  return (
    <button onClick={onClick} style={{
      padding:'7px 14px', borderRadius:18,
      background: active ? accent : palette.accentSoft,
      border: active ? 'none' : 'none',
      color: active ? '#fff' : INK,
      ...T.body, fontSize:13, fontWeight: active ? 600 : 400,
      cursor:'pointer', whiteSpace:'nowrap',
    }}>{label}</button>
  );
}

export function SearchScreen({ recipes, onRecipe, accent, screenBg, palette }) {
  const [q, setQ] = useState('');
  const [chefFilter, setChefFilter] = useState(null);
  const [catFilter, setCatFilter] = useState(null);

  const chefs = [...new Set(recipes.map(r => r.source).filter(Boolean))].sort();
  const cats = [...new Set(recipes.map(r => r.category).filter(Boolean))].sort();

  const hasQuery = q.trim().length > 0;
  const hasFilter = !!(chefFilter || catFilter);

  const results = (() => {
    if (!hasQuery && !hasFilter) return null;
    return recipes.filter(r => {
      const matchesText = !hasQuery || (
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        r.category.toLowerCase().includes(q.toLowerCase()) ||
        (r.source || '').toLowerCase().includes(q.toLowerCase()) ||
        r.ingredients.some(i => i.toLowerCase().includes(q.toLowerCase()))
      );
      const matchesChef = !chefFilter || r.source === chefFilter;
      const matchesCat = !catFilter || r.category === catFilter;
      return matchesText && matchesChef && matchesCat;
    });
  })();

  const toggleChef = (chef) => setChefFilter(f => f === chef ? null : chef);
  const toggleCat = (cat) => setCatFilter(f => f === cat ? null : cat);

  return (
    <div className="fade-in" style={{ height:'100%', display:'flex', flexDirection:'column', background:screenBg }}>
      <div style={{ padding:'68px 24px 4px', flexShrink:0 }}>
        <div style={{ ...T.cursive, fontSize:32, lineHeight:1 }}>{S.searchTitle}</div>
        <div style={{ ...T.meta, marginTop:2, fontStyle:'italic' }}>{S.searchTagline}</div>
      </div>

      {/* Search box */}
      <div style={{ padding:'14px 24px 0', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, background:palette.accentSoft, borderRadius:10, padding:'10px 14px' }}>
          <span style={{ color:MUTED }}>{I.search({ width:18, height:18 })}</span>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={S.searchPlaceholder}
            style={{ flex:1, background:'none', border:'none', outline:'none', ...T.body, fontSize:15 }}
          />
          {q && <button onClick={() => setQ('')} style={{ ...T.meta, fontSize:13, background:'none', border:'none', cursor:'pointer', color:MUTED, padding:0 }}>{S.clear}</button>}
        </div>
      </div>

      {/* Filter rows */}
      <div style={{ flexShrink:0 }}>
        {/* Chef filter */}
        <div style={{ padding:'14px 0 0 24px' }}>
          <div style={{ ...T.label, marginBottom:8, color:accent }}>Por chef</div>
          <div style={{ display:'flex', gap:8, overflowX:'auto', paddingRight:24, paddingBottom:4 }}>
            {chefs.map(chef => (
              <FilterChip key={chef} label={chef} active={chefFilter === chef} onClick={() => toggleChef(chef)} accent={accent} palette={palette}/>
            ))}
          </div>
        </div>
        {/* Category filter */}
        <div style={{ padding:'12px 0 12px 24px', borderBottom:'1px solid ' + FAINT }}>
          <div style={{ ...T.label, marginBottom:8, color:accent }}>Por tipo</div>
          <div style={{ display:'flex', gap:8, overflowX:'auto', paddingRight:24, paddingBottom:4 }}>
            {cats.map(cat => (
              <FilterChip key={cat} label={cat} active={catFilter === cat} onClick={() => toggleCat(cat)} accent={accent} palette={palette}/>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ flex:1, overflowY:'auto' }}>
        {results === null ? (
          <div style={{ ...T.meta, padding:'32px 24px', textAlign:'center', fontStyle:'italic', color:MUTED }}>
            Busca una receta o filtra por chef o tipo
          </div>
        ) : results.length === 0 ? (
          <div style={{ ...T.meta, padding:'24px', textAlign:'center', fontStyle:'italic' }}>{S.noResults}</div>
        ) : (
          <>
            <div style={{ ...T.label, padding:'12px 24px 4px' }}>{results.length} {results.length === 1 ? 'receta' : 'recetas'}</div>
            {results.map(r => (
              <div key={r.id} onClick={() => onRecipe(r.id)} style={{ display:'flex', gap:14, padding:'12px 24px', cursor:'pointer', alignItems:'center' }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ ...T.cursive, fontSize:20, lineHeight:1.1, marginBottom:3 }}>{r.title}</div>
                  <div style={{ ...T.meta, fontSize:12 }}>{r.category} · {r.source}</div>
                </div>
                <div style={{ width:60, height:60, borderRadius:8, overflow:'hidden', flexShrink:0 }}>
                  <Photo src={r.photo} alt={r.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                </div>
              </div>
            ))}
          </>
        )}
        <div style={{ height:24 }}/>
      </div>
    </div>
  );
}
