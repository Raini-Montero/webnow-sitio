// Genera webnow-deploy.zip con lo necesario para publicar en cPanel (Setup Node.js App):
// el sitio compilado (dist/), el servidor del formulario y el archivo de inicio app.cjs.
// Uso: npm run deploy:zip   → luego se sube el zip a la carpeta de la app en cPanel y se extrae.
import { execSync } from 'node:child_process'
import { existsSync, rmSync, statSync } from 'node:fs'

const ZIP = 'webnow-deploy.zip'
const FILES = ['dist', 'server/index.js', 'src/lib/validateContact.js', 'app.cjs', 'package.json', 'package-lock.json']

console.log('1/2 Compilando el sitio…')
execSync('npx vite build', { stdio: 'inherit' })

console.log('2/2 Empaquetando…')
if (existsSync(ZIP)) rmSync(ZIP)
// tar incluido en Windows 10+, macOS y Linux; -a elige el formato zip por la extensión
execSync(`tar -a -c -f ${ZIP} ${FILES.join(' ')}`, { stdio: 'inherit' })

console.log(`Listo: ${ZIP} (${(statSync(ZIP).size / 1024 / 1024).toFixed(1)} MB)`)
