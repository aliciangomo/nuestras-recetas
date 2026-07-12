import { useState, useRef } from 'react';
import { Photo } from './Photo.jsx';
import { PillBtn } from './PillBtn.jsx';
import { I } from '../icons.jsx';
import { T, FAINT, MUTED, INK } from '../tokens.js';
import { S } from '../strings.js';

export function RecipeDetail({ recipe, onBack, onToggleFav, onDelete, onShare, onPhotoChange, accent, screenBg }) {
  const [tab, setTab] = useState('ingredients');
  const [checked, setChecked] = useState({});
  const [servings, setServings] = useState(recipe.servings);
  const inputRef = useRef(null);
  const ratio = servings / recipe.servings;

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => onPhotoChange(recipe.id, ev.target.result);
    reader.readAsDataURL(f);
  };

  const scaleIngredient = (ing) => {
    if (ratio === 1) return ing;
    return ing.replace(/(\d+(?:\.\d+)?(?:\/\d+)?|½|⅓|¼|¾|⅔|⅛)/g, m => {
      const fractions = { '½':0.5, '⅓':0.333, '¼':0.25, '¾':0.75, '⅔':0.667, '⅛':0.125 };
      const v = fractions[m] !== undefined ? fractions[m] : (m.includes('/') ? eval(m) : parseFloat(m));
      const out = +(v * ratio).toFixed(2);
      return out % 1 === 0 ? String(out) : String(out);
    });
  };

  return (
    <div className="fade-in" style={{ height:'100%', display:'flex', flexDirection:'column', background:screenBg }}>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display:'none' }}/>

      {/* Hero photo */}
      <div style={{ position:'relative', flexShrink:0, height:340 }}>
        <Photo src={recipe.photo} alt={recipe.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
        <div style={{ position:'absolute', top:54, left:14, right:14, display:'flex', justifyContent:'space-between', zIndex:5 }}>
          <PillBtn onClick={onBack}>{I.back({ width:20, height:20 })}</PillBtn>
          <div style={{ display:'flex', gap:8 }}>
            <PillBtn onClick={() => inputRef.current?.click()}>{I.camera({ width:18, height:18 })}</PillBtn>
            <PillBtn onClick={() => onShare(recipe)}>{I.share({ width:17, height:17 })}</PillBtn>
            <PillBtn onClick={() => onToggleFav(recipe.id)} accent={recipe.favourite ? accent : null}>{I.heart(recipe.favourite, { width:18, height:18 })}</PillBtn>
            <PillBtn onClick={() => onDelete(recipe)}>{I.trash({ width:17, height:17 })}</PillBtn>
          </div>
        </div>
        <div style={{ position:'absolute', left:0, right:0, bottom:0, height:60, background:`linear-gradient(transparent, ${screenBg})`, pointerEvents:'none' }}/>
      </div>

      {/* Title block */}
      <div style={{ padding:'4px 24px 14px', flexShrink:0 }}>
        <div style={{ ...T.label, marginBottom:5, color:accent }}>{recipe.category}</div>
        <div style={{ ...T.cursive, fontSize:34, lineHeight:1.05, marginBottom:6 }}>{recipe.title}</div>
        <div style={{ ...T.serif, fontStyle:'italic', fontSize:13.5, color:MUTED, lineHeight:1.55, marginBottom:14 }}>{recipe.note}</div>
        <div style={{ display:'flex', gap:18, alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, color:MUTED }}>
            {I.clock({ width:14, height:14 })}
            <span style={{ ...T.meta }}>{recipe.time}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:MUTED }}>
            {I.users({ width:14, height:14 })}
            <button onClick={() => setServings(Math.max(1, servings - 1))} style={{ width:22, height:22, borderRadius:11, border:'1px solid ' + FAINT, background:'#fff', color:INK, cursor:'pointer', fontSize:13, lineHeight:1, padding:0 }}>−</button>
            <span style={{ ...T.body, fontSize:13, fontWeight:500, minWidth:18, textAlign:'center' }}>{servings}</span>
            <button onClick={() => setServings(servings + 1)} style={{ width:22, height:22, borderRadius:11, border:'1px solid ' + FAINT, background:'#fff', color:INK, cursor:'pointer', fontSize:13, lineHeight:1, padding:0 }}>+</button>
            <span style={{ ...T.meta }}>{S.servings}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', borderBottom:'1px solid ' + FAINT, padding:'0 24px', gap:24, flexShrink:0 }}>
        {[['ingredients', S.ingredients, recipe.ingredients.length], ['method', S.method, recipe.steps.length]].map(([id, label, n]) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{ ...T.body, fontSize:14, fontWeight:600, padding:'10px 0 12px', background:'none', border:'none', borderBottom:active ? `2px solid ${accent}` : '2px solid transparent', color:active ? accent : '#bbb', cursor:'pointer', marginBottom:-1, display:'flex', alignItems:'center', gap:6 }}>
              {label}<span style={{ ...T.meta, fontSize:11, color:active ? MUTED : '#ccc', fontWeight:500 }}>{n}</span>
            </button>
          );
        })}
      </div>

      {/* Body */}
      <div style={{ flex:1, overflowY:'auto', padding:'18px 24px 24px' }}>
        {tab === 'ingredients' ? (
          <div className="fade-in">
            {recipe.ingredients.map((ing, i) => (
              <div key={i} onClick={() => setChecked(c => ({ ...c, [i]:!c[i] }))} style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'11px 0', borderBottom:'1px solid ' + FAINT, cursor:'pointer', opacity:checked[i] ? 0.4 : 1, transition:'opacity .2s' }}>
                <div style={{ width:20, height:20, borderRadius:'50%', border:`1.5px solid ${checked[i] ? accent : 'rgba(0,0,0,0.18)'}`, background:checked[i] ? accent : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, color:'#fff' }}>
                  {checked[i] && I.check({ width:11, height:11 })}
                </div>
                <span style={{ ...T.serif, fontSize:14.5, lineHeight:1.55, textDecoration:checked[i] ? 'line-through' : 'none' }}>{scaleIngredient(ing)}</span>
              </div>
            ))}
            <div style={{ ...T.meta, fontSize:11, fontStyle:'italic', marginTop:14 }}>{S.tapToCheck}</div>
          </div>
        ) : (
          <div className="fade-in">
            {recipe.steps.map((step, i) => (
              <div key={i} style={{ display:'flex', gap:16, marginBottom:22 }}>
                <div style={{ flexShrink:0 }}>
                  <div style={{ ...T.cursive, fontSize:32, lineHeight:1, color:accent, width:30, textAlign:'center' }}>{i + 1}</div>
                </div>
                <p style={{ ...T.serif, fontSize:14.5, lineHeight:1.65, marginTop:5 }}>{step}</p>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop:18, paddingTop:16, borderTop:'1px solid ' + FAINT, ...T.meta, fontSize:11, fontStyle:'italic', display:'flex', justifyContent:'space-between' }}>
          <span>{S.from}{recipe.source}</span>
          <span>{S.favouriteThis}</span>
        </div>
      </div>
    </div>
  );
}
