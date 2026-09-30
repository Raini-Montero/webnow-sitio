// Genera webnow-deploy.zip con lo necesario para publicar en cPanel (Setup Node.js App):
// el sitio compilado (dist/), el servidor del formulario y el archivo de inicio app.cjs.
// Uso: npm run deploy:zip   → luego se sube el zip a la carpeta de la app en cPanel y se extrae.
import { execSync } from 'node:child_process'
import { createWriteStream, existsSync, rmSync, statSync } from 'node:fs'
import { ZipArchive } from 'archiver'

const ZIP = 'webnow-deploy.zip'
const FILES = ['server/index.js', 'src/lib/validateContact.js', 'app.cjs', 'package.json', 'package-lock.json']

console.log('1/2 Compilando el sitio…')
execSync('npx vite build', { stdio: 'inherit' })

console.log('2/2 Empaquetando…')
if (existsSync(ZIP)) rmSync(ZIP)

// ZIP estándar (rutas con "/"), compatible con el "Extraer" del Administrador de archivos de cPanel
const output = createWriteStream(ZIP)
const zip = new ZipArchive({ zlib: { level: 9 } })
const done = new Promise((resolve, reject) => {
  output.on('close', resolve)
  zip.on('error', reject)
})
zip.pipe(output)
zip.directory('dist/', 'dist')
for (const file of FILES) zip.file(file, { name: file })
await zip.finalize()
await done

console.log(`Listo: ${ZIP} (${(statSync(ZIP).size / 1024 / 1024).toFixed(1)} MB)`)
