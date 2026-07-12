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
  const tok = TOKENS['sage'];
  const accent = tok.accent;

  const [recipes, setRecipes] = useState(() => {
    try { const c = localStorage.getItem('recetas_cache'); return c ? JSON.parse(c) : null; }
    catch { return null; }
  });
  const [tab, setTab] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [shareTarget, setShareTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const seeded = useRef(false);

  const col = collection(db, 'recipes');


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
        const data = snap.docs.map(d => d.data()).sort((a, b) => a.id - b.id);
        setRecipes(data);
        // Cache without base64 photos — keeps cache small and write non-blocking
        setTimeout(() => {
          try {
            const slim = data.map(r => ({ ...r, photo: r.photo?.startsWith('data:') ? null : r.photo, photos: [] }));
            localStorage.setItem('recetas_cache', JSON.stringify(slim));
          } catch {}
        }, 0);
      }
    });
    return unsub;
  }, []);

  const selected = selectedId != null ? (recipes || []).find(r => r.id === selectedId) : null;
  const goTab = t => { setSelectedId(null); setTab(t); };

  const flashToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const updateLocal = (id, patch) =>
    setRecipes(prev => (prev || []).map(r => r.id === id ? { ...r, ...patch } : r));

  const toggleFav = (id) => {
    const r = recipeList.find(x => x.id === id);
    if (!r) return;
    const next = !r.favourite;
    updateLocal(id, { favourite: next });
    if (next) flashToast(S.toastSaved);
    updateDoc(doc(col, String(id)), { favourite: next });
  };

  const onPhotoChange = (id, dataUrl) => {
    updateLocal(id, { photo: dataUrl });
    flashToast(S.toastPhoto);
    updateDoc(doc(col, String(id)), { photo: dataUrl });
  };

  const onAddPhoto = (id, dataUrl) => {
    const r = recipeList.find(x => x.id === id);
    const photos = [...(r.photos || []), dataUrl];
    updateLocal(id, { photos });
    flashToast(S.toastPhoto);
    updateDoc(doc(col, String(id)), { photos });
  };

  const onRemovePhoto = (id, idx) => {
    const r = recipeList.find(x => x.id === id);
    const photos = (r.photos || []).filter((_, i) => i !== idx);
    updateLocal(id, { photos });
    updateDoc(doc(col, String(id)), { photos });
  };

  const confirmDelete = async () => {
    const id = deleteTarget.id;
    setDeleteTarget(null);
    setSelectedId(null);
    flashToast(S.toastDeleted);
    await deleteDoc(doc(col, String(id)));
  };

  const addRecipe = (r) => {
    setRecipes(prev => [...(prev || []), r].sort((a, b) => a.id - b.id));
    goTab('home');
    flashToast(S.toastAdded);
    setDoc(doc(col, String(r.id)), { ...r, photos: r.photos || [] });
  };

  const updateRecipe = (r) => {
    updateLocal(r.id, r);
    setEditTarget(null);
    setSelectedId(r.id);
    flashToast('Receta actualizada ✓');
    const existing = recipeList.find(x => x.id === r.id);
    const photosChanged = existing?.photo !== r.photo ||
      JSON.stringify(existing?.photos) !== JSON.stringify(r.photos || []);
    if (photosChanged) {
      setDoc(doc(col, String(r.id)), { ...r, photos: r.photos || [] });
    } else {
      const { photo, photos, ...textFields } = r;
      updateDoc(doc(col, String(r.id)), textFields);
    }
  };

  useEffect(() => {
    document.body.style.background = tok.bg;
    document.body.style.backgroundImage = `radial-gradient(ellipse at 30% 20%, ${tok.tint} 0%, ${tok.bg} 60%)`;
  }, [tok]);

  const showNav = !selected && tab !== 'add' && !editTarget;
  const screenBg = tok.screen;
  const loading = recipes === null;
  const recipeList = recipes || [];

  const skeleton = (
    <div style={{ height:'100%', background:screenBg, padding:'68px 24px 24px' }}>
      {[180, 140, 160, 140, 160].map((w, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 0', borderBottom:'1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ flex:1 }}>
            <div style={{ height:18, width:w, borderRadius:6, background:'rgba(0,0,0,0.08)', marginBottom:8 }}/>
            <div style={{ height:12, width:100, borderRadius:6, background:'rgba(0,0,0,0.05)' }}/>
          </div>
          <div style={{ width:64, height:64, borderRadius:8, background:'rgba(0,0,0,0.08)', flexShrink:0 }}/>
        </div>
      ))}
    </div>
  );

  let main = null;
  if (welcome) {
    main = <WelcomeScreen onEnter={() => setWelcome(false)}/>;
  } else if (loading) {
    main = skeleton;
  } else if (editTarget) {
    main = <AddRecipe initialRecipe={editTarget} onBack={() => { setEditTarget(null); setSelectedId(editTarget.id); }} onUpdate={updateRecipe} onAdd={addRecipe} accent={accent} screenBg={screenBg}/>;
  } else if (selected) {
    main = <RecipeDetail recipe={selected} onBack={() => setSelectedId(null)} onToggleFav={toggleFav} onDelete={r => setDeleteTarget(r)} onShare={r => setShareTarget(r)} onPhotoChange={onPhotoChange} onAddPhoto={onAddPhoto} onRemovePhoto={onRemovePhoto} onEdit={r => setEditTarget(r)} accent={accent} screenBg={screenBg}/>;
  } else if (tab === 'home') {
    main = <HomeScreen recipes={recipeList} onRecipe={setSelectedId} accent={accent} screenBg={screenBg}/>;
  } else if (tab === 'search') {
    main = <SearchScreen recipes={recipeList} onRecipe={setSelectedId} accent={accent} screenBg={screenBg} palette={tok}/>;
  } else if (tab === 'saved') {
    main = <SavedScreen recipes={recipeList} onRecipe={setSelectedId} accent={accent} screenBg={screenBg}/>;
  } else if (tab === 'add') {
    main = <AddRecipe onBack={() => goTab('home')} onAdd={addRecipe} accent={accent} screenBg={screenBg}/>;
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', maxWidth:'100vw', overflow:'hidden' }}>

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
