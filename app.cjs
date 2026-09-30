// Archivo de inicio para cPanel ("Setup Node.js App" / Passenger).
// Passenger carga el archivo de inicio con require(); como server/index.js es un módulo ES,
// este pequeño archivo CommonJS lo importa. En cPanel: "Archivo de inicio de la aplicación" = app.cjs
import('./server/index.js').catch((err) => {
  console.error('No se pudo iniciar el servidor:', err)
  process.exit(1)
})
