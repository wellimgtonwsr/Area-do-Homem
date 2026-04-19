const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota admin de imagens
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-images.html'));
});

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📱 Admin de imagens: http://localhost:${PORT}/admin`);
  console.log(`🛑 Para parar: pressione Ctrl+C`);
});
