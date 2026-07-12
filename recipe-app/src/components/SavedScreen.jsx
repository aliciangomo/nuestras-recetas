import { Photo } from './Photo.jsx';
import { I } from '../icons.jsx';
import { T, FAINT, MUTED } from '../tokens.js';

export function SavedScreen({ recipes, onRecipe, accent, screenBg }) {
  const favs = recipes.filter(r => r.favourite);

  return (
    <div className="fade-in" style={{ height:'100%', display:'flex', flexDirection:'column', background:screenBg }}>
      <div style={{ padding:'68px 24px 14px', flexShrink:0 }}>
        <div style={{ ...T.label, color:accent }}>made with love</div>
        <div style={{ ...T.cursive, fontSize:34, lineHeight:1, marginTop:6 }}>Saved Recipes</div>
        <div style={{ ...T.meta, marginTop:4 }}>{favs.length} favourites</div>
      </div>
      <div style={{ height:1, background:FAINT, flexShrink:0 }}/>
      <div style={{ flex:1, overflowY:'auto', paddingBottom:8 }}>
        {favs.length === 0 ? (
          <div style={{ padding:'60px 32px', textAlign:'center' }}>
            <div style={{ ...T.serif, fontStyle:'italic', color:MUTED, lineHeight:1.6 }}>No saved recipes yet.<br/>Tap ♡ on any recipe to add it here.</div>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, padding:'18px 20px' }}>
            {favs.map(r => (
              <div key={r.id} onClick={() => onRecipe(r.id)} style={{ cursor:'pointer' }}>
                <div style={{ width:'100%', aspectRatio:'1/1', borderRadius:10, overflow:'hidden', position:'relative', background:'#f0f0f0' }}>
                  <Photo src={r.photo} alt={r.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  <div style={{ position:'absolute', top:8, right:8, color:accent }}>
                    {I.heart(true, { width:18, height:18, style:{ filter:'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' } })}
                  </div>
                </div>
                <div style={{ ...T.cursive, fontSize:19, lineHeight:1.15, marginTop:8 }}>{r.title}</div>
                <div style={{ ...T.meta, fontSize:11, marginTop:1 }}>{r.time} · {r.category}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
