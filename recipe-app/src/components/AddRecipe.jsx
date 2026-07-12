import { useState, useRef } from 'react';
import { Photo } from './Photo.jsx';
import { I } from '../icons.jsx';
import { T, FAINT, MUTED, INK } from '../tokens.js';
import { S } from '../strings.js';
import { IMPORT_PHOTO } from '../data.js';

function usePhotoUpload(initial) {
  const [photo, setPhoto] = useState(initial);
  const inputRef = useRef(null);
  const open = () => inputRef.current?.click();
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target.result);
    reader.readAsDataURL(f);
  };
  const input = <input ref={inputRef} type="file" accept="image/*" onChange={onFile} style={{ display:'none' }}/>;
  return { photo, setPhoto, open, input };
}

export function AddRecipe({ onBack, onAdd, accent, screenBg }) {
  const [mode, setMode] = useState('type');
  const [form, setForm] = useState({ title:'', category: S.categories[0], time:'', servings:'', source:'', note:'', ingredients:'', steps:'' });
  const { photo, setPhoto, open: openPhoto, input: photoInput } = usePhotoUpload(null);
  const [url, setUrl] = useState('');
  const [urlState, setUrlState] = useState('idle');

  const baseInput = { width:'100%', border:'none', borderBottom:'1.5px solid ' + FAINT, background:'transparent', padding:'10px 0 8px', ...T.body, fontSize:15, color:INK };
  const lbl = { ...T.label, marginTop:18, marginBottom:0, display:'block' };

  const importFromUrl = () => {
    if (!url.trim()) return;
    setUrlState('loading');
    setTimeout(() => {
      setForm({ title:"Risotto de azafrán", category:'Platos', time:'40m', servings:'4', source:'importada · ' + url.replace(/^https?:\/\//, '').split('/')[0], note:"Un risotto cremoso y dorado — perfecto para una noche acogedora.", ingredients:"320g de arroz arborio\n1 cebolla picada fina\n1 copa de vino blanco\nUna pizca de azafrán\n1,2L de caldo de pollo caliente\n50g de mantequilla\n50g de parmesano rallado", steps:"Remojar el azafrán en 2 cdas de caldo caliente.\nPochar la cebolla en mantequilla a fuego suave.\nAñadir el arroz, tostar 1 min, después el vino y dejar evaporar.\nAñadir el caldo poco a poco, removiendo constantemente, ~18 min.\nIncorporar el azafrán, el parmesano y una nuez de mantequilla. Reposar 2 min." });
      setPhoto(IMPORT_PHOTO);
      setUrlState('done');
      setMode('type');
    }, 1500);
  };

  const save = () => {
    if (!form.title.trim()) return;
    onAdd({
      id: Date.now(),
      title: form.title.trim(),
      category: form.category,
      time: form.time || '?',
      servings: parseInt(form.servings) || 4,
      favourite: false,
      photo,
      source: form.source || 'Tú · hoy',
      note: form.note || '',
      ingredients: form.ingredients.split('\n').map(s => s.trim()).filter(Boolean),
      steps: form.steps.split('\n').map(s => s.trim()).filter(Boolean),
    });
  };

  const valid = form.title.trim().length > 0;

  return (
    <div className="fade-in" style={{ height:'100%', display:'flex', flexDirection:'column', background:screenBg }}>
      {photoInput}
      {/* Header */}
      <div style={{ padding:'58px 20px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <button onClick={onBack} style={{ ...T.body, fontSize:14, color:MUTED, background:'none', border:'none', cursor:'pointer', padding:0 }}>{S.cancel}</button>
        <div style={{ ...T.body, fontSize:15, fontWeight:600 }}>{S.newRecipe}</div>
        <button onClick={save} disabled={!valid} style={{ ...T.body, fontSize:14, fontWeight:600, color:valid ? accent : '#ccc', background:'none', border:'none', cursor:valid ? 'pointer' : 'default', padding:0 }}>{S.save}</button>
      </div>

      {/* Mode tabs */}
      <div style={{ display:'flex', padding:'4px 20px', gap:8, flexShrink:0 }}>
        {[['type', S.writeItOut], ['url', S.importLink]].map(([id, label]) => {
          const active = mode === id;
          return (
            <button key={id} onClick={() => setMode(id)} style={{ flex:1, padding:'8px 0', borderRadius:8, border:active ? `1.5px solid ${accent}` : `1.5px solid ${FAINT}`, background:active ? accent : 'transparent', color:active ? '#fff' : MUTED, ...T.body, fontSize:13, fontWeight:500, cursor:'pointer' }}>{label}</button>
          );
        })}
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'10px 24px 24px' }}>
        {mode === 'url' ? (
          <div style={{ paddingTop:16 }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:18 }}>
              <div style={{ width:54, height:54, borderRadius:27, background:`${accent}1a`, display:'flex', alignItems:'center', justifyContent:'center', color:accent }}>{I.link({ width:24, height:24 })}</div>
            </div>
            <div style={{ ...T.body, fontSize:18, fontWeight:600, textAlign:'center', marginBottom:6 }}>{S.pasteLink}</div>
            <p style={{ ...T.serif, fontStyle:'italic', fontSize:13, color:MUTED, textAlign:'center', lineHeight:1.55, marginBottom:24, padding:'0 20px' }}>{S.pasteLinkSub}</p>
            <label style={{ ...T.label }}>{S.websiteUrl}</label>
            <input style={baseInput} placeholder="https://www.directoalpaladar.com/…" value={url} onChange={e => { setUrl(e.target.value); setUrlState('idle'); }}/>
            {urlState === 'idle' && <button onClick={importFromUrl} style={{ marginTop:24, width:'100%', padding:'13px 0', borderRadius:8, background:url.trim() ? accent : '#eee', color:url.trim() ? '#fff' : '#bbb', border:'none', ...T.body, fontWeight:600, fontSize:14, cursor:url.trim() ? 'pointer' : 'default' }}>{S.importRecipe}</button>}
            {urlState === 'loading' && <div style={{ ...T.meta, textAlign:'center', marginTop:30, fontStyle:'italic' }}>{S.fetchingRecipe}</div>}
          </div>
        ) : (
          <div>
            {/* Photo uploader */}
            <div onClick={openPhoto} style={{ marginTop:14, height:170, borderRadius:10, overflow:'hidden', position:'relative', cursor:'pointer', background:photo ? '#f0f0f0' : 'transparent', border:photo ? 'none' : '1.5px dashed rgba(0,0,0,0.18)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, color:MUTED }}>
              {photo ? (
                <>
                  <Photo src={photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  <div style={{ position:'absolute', bottom:10, right:10, padding:'7px 14px', borderRadius:18, background:'rgba(0,0,0,0.6)', color:'#fff', ...T.body, fontSize:12, fontWeight:500, display:'flex', alignItems:'center', gap:6, backdropFilter:'blur(6px)' }}>
                    {I.camera({ width:14, height:14 })}<span>{S.changePhoto}</span>
                  </div>
                </>
              ) : (
                <>
                  {I.camera({ width:28, height:28 })}
                  <div style={{ ...T.body, fontSize:13, fontWeight:500 }}>{S.addPhoto}</div>
                  <div style={{ ...T.meta, fontSize:11 }}>{S.addPhotoSub}</div>
                </>
              )}
            </div>

            <label style={lbl}>{S.recipeName} <span style={{ color:'#ccc' }}>· {S.required}</span></label>
            <input style={baseInput} placeholder="p.ej. Tarta de manzana de la abuela" value={form.title} onChange={e => setForm({ ...form, title:e.target.value })}/>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
              <div>
                <label style={lbl}>{S.category}</label>
                <select style={{ ...baseInput, fontSize:14 }} value={form.category} onChange={e => setForm({ ...form, category:e.target.value })}>
                  {S.categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>{S.cookTime}</label>
                <input style={baseInput} placeholder={S.cookTimePlaceholder} value={form.time} onChange={e => setForm({ ...form, time:e.target.value })}/>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
              <div>
                <label style={lbl}>{S.servingsLabel}</label>
                <input type="number" style={baseInput} placeholder="4" value={form.servings} onChange={e => setForm({ ...form, servings:e.target.value })}/>
              </div>
              <div>
                <label style={lbl}>{S.fromLabel}</label>
                <input style={baseInput} placeholder={S.fromPlaceholder} value={form.source} onChange={e => setForm({ ...form, source:e.target.value })}/>
              </div>
            </div>

            <label style={lbl}>{S.note}</label>
            <input style={baseInput} placeholder={S.notePlaceholder} value={form.note} onChange={e => setForm({ ...form, note:e.target.value })}/>

            <label style={lbl}>{S.ingredientsLabel} <span style={{ color:'#ccc' }}>· {S.onePerLine}</span></label>
            <textarea style={{ ...baseInput, minHeight:100, padding:'10px 12px', border:'1.5px solid ' + FAINT, borderRadius:6, marginTop:4, resize:'none' }} placeholder={S.ingredientsPlaceholder} value={form.ingredients} onChange={e => setForm({ ...form, ingredients:e.target.value })}/>

            <label style={lbl}>{S.methodLabel} <span style={{ color:'#ccc' }}>· {S.oneStepPerLine}</span></label>
            <textarea style={{ ...baseInput, minHeight:100, padding:'10px 12px', border:'1.5px solid ' + FAINT, borderRadius:6, marginTop:4, resize:'none' }} placeholder={S.methodPlaceholder} value={form.steps} onChange={e => setForm({ ...form, steps:e.target.value })}/>

            <button onClick={save} disabled={!valid} style={{ marginTop:28, width:'100%', padding:'14px 0', borderRadius:8, background:valid ? accent : '#eee', color:valid ? '#fff' : '#bbb', border:'none', ...T.body, fontWeight:600, fontSize:14, cursor:valid ? 'pointer' : 'default' }}>{S.saveRecipe}</button>
            <div style={{ height:40 }}/>
          </div>
        )}
      </div>
    </div>
  );
}
