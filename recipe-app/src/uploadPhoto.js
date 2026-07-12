async function compress(file) {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(file), 20000);
    const reader = new FileReader();
    reader.onerror = () => { clearTimeout(t); resolve(file); };
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => { clearTimeout(t); resolve(file); };
      img.onload = () => {
        clearTimeout(t);
        const scale = Math.min(1, 1200 / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        c.toBlob(b => resolve(b || file), 'image/jpeg', 0.82);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function uploadPhoto(file) {
  const blob = await compress(file);
  const fd = new FormData();
  fd.append('file', blob, 'photo.jpg');
  fd.append('upload_preset', 'recetas');
  const res = await fetch('https://api.cloudinary.com/v1_1/dqpvwhgod/image/upload', {
    method: 'POST',
    body: fd,
  });
  if (!res.ok) throw new Error('Upload failed');
  return (await res.json()).secure_url;
}
