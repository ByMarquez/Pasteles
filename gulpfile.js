import {src, dest, watch} from 'gulp';
import * as dartSass from 'sass';
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

export function css(callback){
    src("src/scss/app.scss")
        .pipe(sass())
        .pipe(dest("build/css"))
    callback();
}

export function dev(){
    watch("src/scss/**/*.scss", css)
}

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Directorio de entrada y salida
const inputDir = 'src/img/';
const outputDir = 'build/img/';

// Crear el directorio de salida si no existe
if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir);
}

// Función para convertir una imagen a WebP
export async function convertToWebP(inputPath, outputPathWebp, outputPathAvif, outputPathJpg) {
  try {
    await sharp(inputPath)
      .toFormat('webp')
      .toFile(outputPathWebp);
    console.log(`Imagen convertida a WebP y guardada en ${outputPathWebp}`);
  } catch (error) {
    console.error('Error al convertir la imagen a WebP:', error);
  }
  try {
    await sharp(inputPath)
      .toFormat('avif')
      .toFile(outputPathAvif);
    console.log(`Imagen convertida a Avif y guardada en ${outputPathAvif}`);
  } catch (error) {
    console.error('Error al convertir la imagen a Avif:', error);
  }
  try {
    await sharp(inputPath)
      .toFormat('jpg')
      .toFile(outputPathJpg);
    console.log(`Imagen convertida a jpg y guardada en ${outputPathJpg}`);
  } catch (error) {
    console.error('Error al convertir la imagen a jpg:', error);
  }
}

// Leer todas las imágenes en el directorio de entrada
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error al leer el directorio:', err);
    return;
  }

  files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPathWebp = path.join(outputDir, `${path.parse(file).name}.webp`);
    const outputPathAvif = path.join(outputDir, `${path.parse(file).name}.avif`);
    const outputPathJpg = path.join(outputDir, `${path.parse(file).name}.jpg`);

    // Convertir la imagen a WebP
    convertToWebP(inputPath, outputPathWebp, outputPathAvif, outputPathJpg);
  });
});
