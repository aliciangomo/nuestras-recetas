import { useState, useRef } from 'react';
import { Photo } from './Photo.jsx';
import { I } from '../icons.jsx';
import { T, FAINT, MUTED, INK } from '../tokens.js';
import { S } from '../strings.js';

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

export function AddRecipe({ onBack, onAdd, onUpdate, initialRecipe, accent, screenBg }) {
  const isEdit = !!initialRecipe;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => isEdit ? {
    title: initialRecipe.title,
    category: initialRecipe.category,
    time: initialRecipe.time,
    servings: String(initialRecipe.servings),
    source: initialRecipe.source || '',
    link: initialRecipe.link || '',
    note: initialRecipe.note || '',
    ingredients: (initialRecipe.ingredients || []).join('\n'),
    steps: (initialRecipe.steps || []).join('\n'),
    photos: initialRecipe.photos || [],
  } : { title:'', category: S.categories[0], time:'', servings:'', source:'', link:'', note:'', ingredients:'', steps:'', photos:[] });
  const { photo, setPhoto, open: openPhoto, input: photoInput } = usePhotoUpload(isEdit ? initialRecipe.photo : null);
  const extraPhotoRef = useRef(null);

  const baseInput = { width:'100%', border:'none', borderBottom:'1.5px solid ' + FAINT, background:'transparent', padding:'10px 0 8px', ...T.body, fontSize:15, color:INK };
  const lbl = { ...T.label, marginTop:18, marginBottom:0, display:'block' };

  const addExtraPhoto = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(prev => ({ ...prev, photos: [...prev.photos, ev.target.result] }));
    reader.readAsDataURL(f);
    e.target.value = '';
  };

  const removeExtraPhoto = (idx) => setForm(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== idx) }));

  const save = async () => {
    if (!form.title.trim() || saving) return;
    setSaving(true);
    try {
      const updated = {
        id: isEdit ? initialRecipe.id : Date.now(),
        title: form.title.trim(),
        category: form.category,
        time: form.time || '?',
        servings: parseInt(form.servings) || 4,
        favourite: isEdit ? initialRecipe.favourite : false,
        photo,
        photos: form.photos,
        source: form.source || 'Tú · hoy',
        link: form.link.trim() || null,
        note: form.note || '',
        ingredients: form.ingredients.split('\n').map(s => s.trim()).filter(Boolean),
        steps: form.steps.split('\n').map(s => s.trim()).filter(Boolean),
      };
      if (isEdit) await onUpdate(updated);
      else await onAdd(updated);
    } finally {
      setSaving(false);
    }
  };

  const valid = form.title.trim().length > 0;

  return (
    <div className="fade-in" style={{ height:'100%', display:'flex', flexDirection:'column', background:screenBg }}>
      {photoInput}
      <input ref={extraPhotoRef} type="file" accept="image/*" onChange={addExtraPhoto} style={{ display:'none' }}/>
      {/* Header */}
      <div style={{ padding:'58px 20px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <button onClick={onBack} style={{ ...T.body, fontSize:14, color:MUTED, background:'none', border:'none', cursor:'pointer', padding:0 }}>{S.cancel}</button>
        <div style={{ ...T.body, fontSize:15, fontWeight:600 }}>{isEdit ? S.editRecipe : S.newRecipe}</div>
        <button onClick={save} disabled={!valid || saving} style={{ ...T.body, fontSize:14, fontWeight:600, color:valid && !saving ? accent : '#ccc', background:'none', border:'none', cursor:valid && !saving ? 'pointer' : 'default', padding:0 }}>{saving ? 'Guardando…' : S.save}</button>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'10px 24px 24px' }}>
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

            {/* Extra photos */}
            <div style={{ marginTop:10 }}>
              <div style={{ ...T.label, marginBottom:8 }}>Más fotos <span style={{ color:'#ccc', fontWeight:400 }}>· pasos, detalles</span></div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {form.photos.map((p, i) => (
                  <div key={i} style={{ position:'relative', width:72, height:72 }}>
                    <img src={p} alt="" style={{ width:72, height:72, borderRadius:8, objectFit:'cover', display:'block' }}/>
                    <button onClick={() => removeExtraPhoto(i)}
                      style={{ position:'absolute', top:-6, right:-6, width:20, height:20, borderRadius:10, background:'rgba(0,0,0,0.65)', color:'#fff', border:'none', cursor:'pointer', fontSize:14, lineHeight:1, padding:0, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
                  </div>
                ))}
                <div onClick={() => extraPhotoRef.current?.click()}
                  style={{ width:72, height:72, borderRadius:8, border:'1.5px dashed rgba(0,0,0,0.18)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer', gap:4, color:MUTED, background:'transparent' }}>
                  {I.plus({ width:18, height:18 })}
                  <span style={{ ...T.meta, fontSize:10 }}>añadir</span>
                </div>
              </div>
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

            <label style={lbl}>{S.linkLabel}</label>
            <input style={baseInput} placeholder={S.linkPlaceholder} value={form.link} onChange={e => setForm({ ...form, link:e.target.value })} inputMode="url" autoCapitalize="none"/>

            <label style={lbl}>{S.ingredientsLabel} <span style={{ color:'#ccc' }}>· {S.onePerLine}</span></label>
            <textarea style={{ ...baseInput, minHeight:100, padding:'10px 12px', border:'1.5px solid ' + FAINT, borderRadius:6, marginTop:4, resize:'none' }} placeholder={S.ingredientsPlaceholder} value={form.ingredients} onChange={e => setForm({ ...form, ingredients:e.target.value })}/>

            <label style={lbl}>{S.methodLabel} <span style={{ color:'#ccc' }}>· {S.oneStepPerLine}</span></label>
            <textarea style={{ ...baseInput, minHeight:100, padding:'10px 12px', border:'1.5px solid ' + FAINT, borderRadius:6, marginTop:4, resize:'none' }} placeholder={S.methodPlaceholder} value={form.steps} onChange={e => setForm({ ...form, steps:e.target.value })}/>

            <button onClick={save} disabled={!valid || saving} style={{ marginTop:28, width:'100%', padding:'14px 0', borderRadius:8, background:valid && !saving ? accent : '#eee', color:valid && !saving ? '#fff' : '#bbb', border:'none', ...T.body, fontWeight:600, fontSize:14, cursor:valid && !saving ? 'pointer' : 'default' }}>{saving ? 'Guardando…' : S.saveRecipe}</button>
            <div style={{ height:40 }}/>
          </div>
      </div>
    </div>
  );
}
