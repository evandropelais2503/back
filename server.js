const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'data', 'produtos.json');

app.get('/api/produtos', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler dados' });
    res.json(JSON.parse(data));
  });
});

app.post('/api/produtos', (req, res) => {
  const novoProduto = req.body;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler dados' });
    let produtos = JSON.parse(data);
    if (produtos.some(p => p.numero === novoProduto.numero)) {
      return res.status(400).json({ error: 'Produto com esse número já existe' });
    }
    produtos.push(novoProduto);
    fs.writeFile(DATA_FILE, JSON.stringify(produtos, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Erro ao salvar produto' });
      res.status(201).json({ message: 'Produto cadastrado com sucesso' });
    });
  });
});

app.delete('/api/produtos/:numero', (req, res) => {
  const numero = parseInt(req.params.numero);
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler dados' });
    let produtos = JSON.parse(data);
    const index = produtos.findIndex(p => p.numero === numero);
    if (index === -1) return res.status(404).json({ error: 'Produto não encontrado' });
    produtos.splice(index, 1);
    fs.writeFile(DATA_FILE, JSON.stringify(produtos, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Erro ao salvar produto' });
      res.json({ message: `Produto ${numero} excluído com sucesso.` });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});