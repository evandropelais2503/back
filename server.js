const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/achadinhos';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

const produtoSchema = new mongoose.Schema({
  numero: { type: Number, required: true, unique: true },
  nome: String,
  preco: String,
  imagem: String,
  link: String
});

const Produto = mongoose.model('Produto', produtoSchema);

app.get('/api/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ numero: 1 });
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.post('/api/produtos', async (req, res) => {
  try {
    const { numero, nome, preco, imagem, link } = req.body;
    const existente = await Produto.findOne({ numero });
    if (existente) return res.status(400).json({ error: 'Produto com esse número já existe' });
    const novo = new Produto({ numero, nome, preco, imagem, link });
    await novo.save();
    res.status(201).json({ message: 'Produto cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar produto' });
  }
});

app.delete('/api/produtos/:numero', async (req, res) => {
  try {
    const numero = parseInt(req.params.numero);
    const resultado = await Produto.findOneAndDelete({ numero });
    if (!resultado) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});