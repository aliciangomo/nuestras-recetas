export function Sheet({ children, onClose }) {
  return (
    <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'flex-end', zIndex:300 }}>
      <div className="slide-up" onClick={e => e.stopPropagation()} style={{ width:'100%', background:'#fff', borderRadius:'18px 18px 0 0', padding:'8px 0 28px' }}>
        <div style={{ width:36, height:4, borderRadius:2, background:'rgba(0,0,0,0.15)', margin:'0 auto 16px' }}/>
        {children}
      </div>
    </div>
  );
}
