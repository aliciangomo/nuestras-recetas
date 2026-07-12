import { useState, useEffect, useRef } from 'react';
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase.js';
import { TOKENS, T } from './tokens.js';
import { INITIAL_RECIPES } from './data.js';
import { S } from './strings.js';
import { IOSDevice } from './components/IOSDevice.jsx';
import { BottomNav } from './components/BottomNav.jsx';
import { WelcomeScreen } from './components/WelcomeScreen.jsx';
import { HomeScreen } from './components/HomeScreen.jsx';
import { RecipeDetail } from './components/RecipeDetail.jsx';
import { AddRecipe } from './components/AddRecipe.jsx';
import { SearchScreen } from './components/SearchScreen.jsx';
import { SavedScreen } from './components/SavedScreen.jsx';
import { ShareSheet } from './components/ShareSheet.jsx';
import { DeleteSheet } from './components/DeleteSheet.jsx';

export default function App() {
  const [welcome, setWelcome] = useState(true);
  const [palette, setPalette] = useState('sage');
  const tok = TOKENS[palette];
  const accent = tok.accent;

  const [recipes, setRecipes] = useState([]);
  const [tab, setTab] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [shareTarget, setShareTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const seeded = useRef(false);

  const col = collection(db, 'recipes');

  const compressPhoto = (dataUrl, maxPx = 900, quality = 0.72) => new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  });

  // Real-time sync with Firestore
  useEffect(() => {
    const unsub = onSnapshot(col, async (snap) => {
      if (snap.empty && !seeded.current) {
        seeded.current = true;
        const batch = writeBatch(db);
        INITIAL_RECIPES.forEach(r => {
          batch.set(doc(col, String(r.id)), { ...r, photos: r.photos || [] });
        });
        await batch.commit();
      } else {
        setRecipes(snap.docs.map(d => d.data()).sort((a, b) => a.id - b.id));
      }
    });
    return unsub;
  }, []);

  const selected = selectedId != null ? recipes.find(r => r.id === selectedId) : null;
  const goTab = t => { setSelectedId(null); setTab(t); };

  const flashToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const toggleFav = async (id) => {
    const r = recipes.find(x => x.id === id);
    if (!r) return;
    await updateDoc(doc(col, String(id)), { favourite: !r.favourite });
    if (!r.favourite) flashToast(S.toastSaved);
  };

  const onPhotoChange = async (id, dataUrl) => {
    const compressed = await compressPhoto(dataUrl);
    await updateDoc(doc(col, String(id)), { photo: compressed });
    flashToast(S.toastPhoto);
  };

  const onAddPhoto = async (id, dataUrl) => {
    const r = recipes.find(x => x.id === id);
    const compressed = await compressPhoto(dataUrl);
    await updateDoc(doc(col, String(id)), { photos: [...(r.photos || []), compressed] });
    flashToast(S.toastPhoto);
  };

  const onRemovePhoto = async (id, idx) => {
    const r = recipes.find(x => x.id === id);
    await updateDoc(doc(col, String(id)), { photos: (r.photos || []).filter((_, i) => i !== idx) });
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(col, String(deleteTarget.id)));
    setDeleteTarget(null);
    setSelectedId(null);
    flashToast(S.toastDeleted);
  };

  const addRecipe = async (r) => {
    const photo = r.photo?.startsWith('data:') ? await compressPhoto(r.photo) : r.photo;
    const photos = await Promise.all((r.photos || []).map(p => p?.startsWith('data:') ? compressPhoto(p) : p));
    await setDoc(doc(col, String(r.id)), { ...r, photo, photos });
    goTab('home');
    flashToast(S.toastAdded);
  };

  const updateRecipe = async (r) => {
    const photo = r.photo?.startsWith('data:') ? await compressPhoto(r.photo) : r.photo;
    const photos = await Promise.all((r.photos || []).map(p => p?.startsWith('data:') ? compressPhoto(p) : p));
    await setDoc(doc(col, String(r.id)), { ...r, photo, photos });
    setEditTarget(null);
    setSelectedId(r.id);
    flashToast('Receta actualizada ✓');
  };

  useEffect(() => {
    document.body.style.background = tok.bg;
    document.body.style.backgroundImage = `radial-gradient(ellipse at 30% 20%, ${tok.tint} 0%, ${tok.bg} 60%)`;
  }, [tok]);

  const showNav = !selected && tab !== 'add' && !editTarget;
  const screenBg = tok.screen;

  let main = null;
  if (welcome) {
    main = <WelcomeScreen onEnter={() => setWelcome(false)}/>;
  } else if (editTarget) {
    main = <AddRecipe initialRecipe={editTarget} onBack={() => { setEditTarget(null); setSelectedId(editTarget.id); }} onUpdate={updateRecipe} onAdd={addRecipe} accent={accent} screenBg={screenBg}/>;
  } else if (selected) {
    main = <RecipeDetail recipe={selected} onBack={() => setSelectedId(null)} onToggleFav={toggleFav} onDelete={r => setDeleteTarget(r)} onShare={r => setShareTarget(r)} onPhotoChange={onPhotoChange} onAddPhoto={onAddPhoto} onRemovePhoto={onRemovePhoto} onEdit={r => setEditTarget(r)} accent={accent} screenBg={screenBg}/>;
  } else if (tab === 'home') {
    main = <HomeScreen recipes={recipes} onRecipe={setSelectedId} accent={accent} screenBg={screenBg}/>;
  } else if (tab === 'search') {
    main = <SearchScreen recipes={recipes} onRecipe={setSelectedId} accent={accent} screenBg={screenBg} palette={tok}/>;
  } else if (tab === 'saved') {
    main = <SavedScreen recipes={recipes} onRecipe={setSelectedId} accent={accent} screenBg={screenBg}/>;
  } else if (tab === 'add') {
    main = <AddRecipe onBack={() => goTab('home')} onAdd={addRecipe} accent={accent} screenBg={screenBg}/>;
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
      {!welcome && (
        <div style={{ display:'flex', gap:8, background:'rgba(255,255,255,0.7)', backdropFilter:'blur(12px)', borderRadius:20, padding:'6px 10px', boxShadow:'0 2px 12px rgba(0,0,0,0.1)' }}>
          {Object.entries(TOKENS).map(([key, val]) => (
            <button key={key} onClick={() => setPalette(key)} style={{ width:22, height:22, borderRadius:'50%', background:val.accent, border:palette === key ? '2.5px solid #fff' : '2px solid transparent', boxShadow:palette === key ? `0 0 0 2px ${val.accent}` : 'none', cursor:'pointer', padding:0, transition:'transform .15s', transform:palette === key ? 'scale(1.15)' : 'scale(1)' }}/>
          ))}
        </div>
      )}

      <IOSDevice width={390} height={844}>
        <div style={{ position:'absolute', top:0, left:0, right:0, bottom: (!welcome && showNav) ? 84 : 0, overflow:'hidden' }}>
          {main}
        </div>
        {!welcome && showNav && <BottomNav tab={tab} onTab={goTab} accent={accent} screenBg={screenBg}/>}
        {shareTarget && <ShareSheet recipe={shareTarget} onClose={() => setShareTarget(null)} accent={accent} palette={tok}/>}
        {deleteTarget && <DeleteSheet recipe={deleteTarget} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)}/>}
        {toast && (
          <div style={{ position:'absolute', top:62, left:'50%', transform:'translateX(-50%)', background:'rgba(0,0,0,0.85)', color:'#fff', padding:'9px 18px', borderRadius:20, ...T.body, fontSize:13, fontWeight:500, zIndex:400, backdropFilter:'blur(10px)', whiteSpace:'nowrap' }}>{toast}</div>
        )}
      </IOSDevice>
    </div>
  );
}
