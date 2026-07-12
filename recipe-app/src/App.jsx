import { useState, useEffect } from 'react';
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

  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [tab, setTab] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [shareTarget, setShareTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const selected = selectedId != null ? recipes.find(r => r.id === selectedId) : null;

  const goTab = t => { setSelectedId(null); setTab(t); };

  const toggleFav = id => {
    setRecipes(rs => rs.map(r => r.id === id ? { ...r, favourite: !r.favourite } : r));
    const r = recipes.find(x => x.id === id);
    if (r && !r.favourite) flashToast(S.toastSaved);
  };

  const onPhotoChange = (id, dataUrl) => {
    setRecipes(rs => rs.map(r => r.id === id ? { ...r, photo: dataUrl } : r));
    flashToast(S.toastPhoto);
  };

  const confirmDelete = () => {
    setRecipes(rs => rs.filter(r => r.id !== deleteTarget.id));
    setDeleteTarget(null);
    setSelectedId(null);
    flashToast(S.toastDeleted);
  };

  const addRecipe = r => {
    setRecipes(rs => [r, ...rs]);
    goTab('home');
    flashToast(S.toastAdded);
  };

  const flashToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  useEffect(() => {
    document.body.style.background = tok.bg;
    document.body.style.backgroundImage = `radial-gradient(ellipse at 30% 20%, ${tok.tint} 0%, ${tok.bg} 60%)`;
  }, [tok]);

  const showNav = !selected && tab !== 'add';
  const screenBg = tok.screen;

  let main = null;
  if (welcome) {
    main = <WelcomeScreen onEnter={() => setWelcome(false)}/>;
  } else if (selected) {
    main = <RecipeDetail recipe={selected} onBack={() => setSelectedId(null)} onToggleFav={toggleFav} onDelete={r => setDeleteTarget(r)} onShare={r => setShareTarget(r)} onPhotoChange={onPhotoChange} accent={accent} screenBg={screenBg}/>;
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
      {/* Palette switcher */}
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
