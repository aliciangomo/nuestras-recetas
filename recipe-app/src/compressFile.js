export function compressFile(file, maxPx = 480, quality = 0.45) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(null), 20000);
    const reader = new FileReader();
    reader.onerror = () => { clearTimeout(timeout); resolve(null); };
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => { clearTimeout(timeout); resolve(null); };
      img.onload = () => {
        clearTimeout(timeout);
        const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
