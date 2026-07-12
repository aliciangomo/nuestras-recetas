import { useState } from 'react';
import { Sheet } from './Sheet.jsx';
import { Photo } from './Photo.jsx';
import { I } from '../icons.jsx';
import { T, FAINT, INK } from '../tokens.js';
import { S } from '../strings.js';

export function ShareSheet({ recipe, onClose, accent, palette }) {
  const [copied, setCopied] = useState(false);
  const opts = [
    { ico: I.link,   label: S.copyLink,     sub: S.copyLinkSub(recipe.id),  action: () => { setCopied(true); setTimeout(onClose, 800); } },
    { ico: I.share,  label: S.sendMessages, sub: S.sendMessagesSub,         action: onClose },
    { ico: I.upload, label: S.savePdf,      sub: S.savePdfSub,              action: onClose },
    { ico: I.share,  label: S.sendEmail,    sub: S.sendEmailSub,            action: onClose },
  ];

  return (
    <Sheet onClose={onClose}>
      <div style={{ padding:'0 24px 18px', display:'flex', gap:14, alignItems:'center' }}>
        <div style={{ width:50, height:50, borderRadius:6, overflow:'hidden', flexShrink:0 }}>
          <Photo src={recipe.photo} alt={recipe.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ ...T.label, marginBottom:2, color:accent }}>{S.shareLabel}</div>
          <div style={{ ...T.cursive, fontSize:20, lineHeight:1.15 }}>{recipe.title}</div>
        </div>
      </div>
      <div style={{ borderTop:'1px solid ' + FAINT }}>
        {opts.map((o, i) => (
          <button key={i} onClick={o.action} style={{ width:'100%', padding:'15px 24px', display:'flex', alignItems:'center', gap:14, background:'none', border:'none', borderBottom:i < opts.length - 1 ? '1px solid ' + FAINT : 'none', textAlign:'left', cursor:'pointer' }}>
            <div style={{ width:38, height:38, borderRadius:19, background:palette.accentSoft, color:accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <o.ico width="18" height="18"/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ ...T.body, fontSize:15, fontWeight:500 }}>{o.label}</div>
              <div style={{ ...T.meta, fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{o.sub}</div>
            </div>
            {copied && o.label === S.copyLink && <div style={{ ...T.meta, color:accent, fontSize:13, fontWeight:500 }}>{S.copied}</div>}
          </button>
        ))}
      </div>
      <div style={{ padding:'14px 24px 0' }}>
        <button onClick={onClose} style={{ width:'100%', padding:'12px 0', borderRadius:8, border:'1.5px solid ' + FAINT, background:'none', ...T.body, fontSize:14, fontWeight:500, color:INK, cursor:'pointer' }}>{S.cancel}</button>
      </div>
    </Sheet>
  );
}
