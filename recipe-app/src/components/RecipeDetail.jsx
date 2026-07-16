import { useState, useRef } from 'react';
import { Photo } from './Photo.jsx';
import { PillBtn } from './PillBtn.jsx';
import { I } from '../icons.jsx';
import { T, FAINT, MUTED, INK } from '../tokens.js';
import { S } from '../strings.js';
import { uploadPhoto } from '../uploadPhoto.js';

export function RecipeDetail({ recipe, onBack, onToggleFav, onDelete, onShare, onPhotoChange, onAddPhoto, onRemovePhoto, onEdit, accent, screenBg }) {
  const [tab, setTab] = useState('ingredients');
  const [checked, setChecked] = useState({});
  const [servings, setServings] = useState(recipe.servings);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [compressing, setCompressing] = useState(false);
  const [noteExpanded, setNoteExpanded] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const touchStartX = useRef(null);
  const ratio = servings / recipe.servings;

  const allPhotos = [recipe.photo, ...(recipe.photos || [])].filter(Boolean);

  const handleFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    e.target.value = '';
    setCompressing(true);
    try {
      const url = await uploadPhoto(f);
      if (!recipe.photo) onPhotoChange(recipe.id, url);
      else onAddPhoto(recipe.id, url);
    } catch {
      // upload failed — spinner will disappear, user can retry
    } finally {
      setCompressing(false);
    }
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) setPhotoIdx(i => Math.max(0, i - 1));
    else if (dx < -50) setPhotoIdx(i => Math.min(allPhotos.length - 1, i + 1));
    touchStartX.current = null;
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

      {/* Hero photo carousel */}
      <div style={{ position:'relative', flexShrink:0, height:340, overflow:'hidden' }}
           onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

        {/* Photo strip */}
        <div style={{ display:'flex', height:'100%', transform:`translateX(-${photoIdx * 100}%)`, transition:'transform 0.32s ease', willChange:'transform' }}>
          {allPhotos.length > 0 ? allPhotos.map((p, i) => (
            <div key={i} style={{ minWidth:'100%', height:'100%', position:'relative' }}>
              <Photo src={p} alt={recipe.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
              {/* Remove extra photo (not the cover) */}
              {i > 0 && (
                <button onClick={() => { onRemovePhoto(recipe.id, i - 1); setPhotoIdx(p => Math.min(p, allPhotos.length - 2)); }}
                  style={{ position:'absolute', bottom:72, right:12, width:26, height:26, borderRadius:13, background:'rgba(0,0,0,0.55)', color:'#fff', border:'none', cursor:'pointer', fontSize:15, lineHeight:1, display:'flex', alignItems:'center', justifyContent:'center', zIndex:6 }}>×</button>
              )}
            </div>
          )) : (
            <div style={{ minWidth:'100%', height:'100%', background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', color:MUTED }}>
              {I.camera({ width:36, height:36 })}
            </div>
          )}
        </div>

        {/* Dot indicators */}
        {allPhotos.length > 1 && (
          <div style={{ position:'absolute', bottom:66, left:0, right:0, display:'flex', justifyContent:'center', gap:5, zIndex:5, pointerEvents:'none' }}>
            {allPhotos.map((_, i) => (
              <div key={i} style={{ width: i === photoIdx ? 18 : 6, height:6, borderRadius:3,
                                    background: i === photoIdx ? '#fff' : 'rgba(255,255,255,0.55)',
                                    transition:'width 0.2s' }}/>
            ))}
          </div>
        )}

        {/* Buttons row */}
        <div style={{ position:'absolute', top:'calc(env(safe-area-inset-top, 0px) + 10px)', left:14, right:14, display:'flex', justifyContent:'space-between', zIndex:5 }}>
          <PillBtn onClick={onBack}>{I.back({ width:20, height:20 })}</PillBtn>
          <div style={{ display:'flex', gap:8 }}>
            <PillBtn onClick={() => !compressing && inputRef.current?.click()}>
              {compressing
                ? <div style={{ width:14, height:14, border:'2px solid rgba(0,0,0,0.15)', borderTop:'2px solid rgba(0,0,0,0.5)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
                : I.camera({ width:18, height:18 })}
            </PillBtn>
            <PillBtn onClick={() => onEdit(recipe)}>{I.edit({ width:16, height:16 })}</PillBtn>
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
        <div style={{ ...T.cursive, fontSize:34, lineHeight:1.05, marginBottom:4 }}>{recipe.title}</div>
        {recipe.note ? (
          <div style={{ marginBottom:14 }} onClick={() => setNoteExpanded(e => !e)}>
            <div style={{ ...T.serif, fontStyle:'italic', fontSize:13.5, color:MUTED, lineHeight:1.55,
              display:'-webkit-box', WebkitBoxOrient:'vertical',
              WebkitLineClamp: noteExpanded ? 'unset' : 2,
              overflow: noteExpanded ? 'visible' : 'hidden',
              transition:'all 0.2s' }}>
              {recipe.note}
            </div>
            {!noteExpanded && recipe.note.length > 80 && (
              <span style={{ ...T.meta, fontSize:12, color:accent, cursor:'pointer' }}>Leer más</span>
            )}
            {noteExpanded && (
              <span style={{ ...T.meta, fontSize:12, color:accent, cursor:'pointer' }}>Cerrar</span>
            )}
          </div>
        ) : null}
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
          {recipe.source && <span style={{ ...T.meta, color:MUTED }}>{recipe.source}</span>}
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
      <div ref={scrollRef} onScroll={() => setNoteExpanded(false)} style={{ flex:1, overflowY:'auto', padding:'18px 24px 24px' }}>
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
        {recipe.link && (
          <div style={{ marginTop:12 }}>
            <a href={recipe.link} target="_blank" rel="noopener noreferrer"
               style={{ ...T.body, fontSize:14, fontWeight:700, color:accent, textDecoration:'none' }}>
              {S.viewLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
