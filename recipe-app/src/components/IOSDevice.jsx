export function IOSStatusBar({ time = '9:41' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'18px 28px 0', position:'absolute', top:0, left:0, right:0, zIndex:20 }}>
      <div style={{ flex:1, display:'flex', justifyContent:'flex-start' }}>
        <span style={{ fontFamily:'-apple-system,system-ui', fontWeight:600, fontSize:16, color:'#000' }}>{time}</span>
      </div>
      <div style={{ width:140 }}/>
      <div style={{ flex:1, display:'flex', justifyContent:'flex-end', gap:6, alignItems:'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="6" width="3" height="5" rx="0.6" fill="#000"/><rect x="4.5" y="4" width="3" height="7" rx="0.6" fill="#000"/><rect x="9" y="2" width="3" height="9" rx="0.6" fill="#000"/><rect x="13.5" y="0" width="3" height="11" rx="0.6" fill="#000"/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11"><path d="M8 2.8c2.1 0 4 .8 5.4 2.2l1-1C12.7 2.4 10.4 1.4 8 1.4S3.3 2.4 1.6 4l1 1C4 3.6 5.9 2.8 8 2.8z" fill="#000"/><path d="M8 6c1.3 0 2.5.5 3.3 1.3l1-1A6 6 0 0 0 8 4.6a6 6 0 0 0-4.3 1.7l1 1A4.1 4.1 0 0 1 8 6z" fill="#000"/><circle cx="8" cy="9.5" r="1.4" fill="#000"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke="#000" strokeOpacity=".35" fill="none"/><rect x="2" y="2" width="18" height="8" rx="2" fill="#000"/><path d="M23 4v4c.7-.2 1.3-1 1.3-2s-.6-1.8-1.3-2z" fill="#000" fillOpacity=".4"/></svg>
      </div>
    </div>
  );
}

export function IOSDevice({ children, width = 390, height = 844 }) {
  return (
    <div className="ios-device" style={{ width, height, borderRadius:48, overflow:'hidden', position:'relative', background:'#fff', boxShadow:'0 30px 70px rgba(50,70,40,0.22),0 0 0 1px rgba(0,0,0,0.08)' }}>
      <div className="ios-notch" style={{ position:'absolute', top:11, left:'50%', transform:'translateX(-50%)', width:126, height:37, borderRadius:24, background:'#000', zIndex:50 }}/>
      <IOSStatusBar/>
      <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0 }}>{children}</div>
      <div className="ios-home-indicator" style={{ position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', width:139, height:5, borderRadius:100, background:'rgba(0,0,0,0.2)', zIndex:200, pointerEvents:'none' }}/>
    </div>
  );
}
