const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración
const QUALITY = 85;
const SOURCE_FOLDERS = 'Aluguel*'; // Patrón para todas las carpetas Aluguel

// Procesar cada carpeta Aluguel
fs.readdirSync('.', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('Aluguel'))
  .forEach(dirent => {
    const folder = dirent.name;
    const outputFolder = path.join(folder, 'webp');
    
    // Crear subcarpeta webp si no existe
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    // Procesar imágenes en cada carpeta
    fs.readdirSync(folder)
      .filter(file => file.match(/\.(jpg|jpeg|png)$/i))
      .forEach(file => {
        const inputPath = path.join(folder, file);
        const outputPath = path.join(outputFolder, `${path.parse(file).name}.webp`);

        sharp(inputPath)
          .webp({ quality: QUALITY })
          .toFile(outputPath)
          .then(() => console.log(`✅ [${folder}] Convertido: ${file}`))
          .catch(err => console.error(`❌ [${folder}] Error con ${file}:`, err));
      });
  });