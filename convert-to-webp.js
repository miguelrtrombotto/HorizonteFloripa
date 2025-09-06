const imagemin = require('imagemin');
const webp = require('imagemin-webp');

(async () => {
  await imagemin(['img/*.{jpg,png}'], {
    destination: 'img/webp',
    plugins: [
      webp({ quality: 85 })  // Nota: ahora usamos 'webp' en lugar de 'imageminWebp'
    ]
  });
  console.log('✅ ¡Conversión a WebP completada!');
})();