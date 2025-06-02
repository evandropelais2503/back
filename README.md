# Achadinhos Shopee - Backend com MongoDB (Railway)

Backend em Node.js + Express + MongoDB Atlas.

## Como usar no Railway

1. Faça upload deste repositório no GitHub
2. Vá para https://railway.app
3. Clique em "New Project" > "Deploy from GitHub Repo"
4. Escolha este projeto

### Variável de ambiente

Adicione a seguinte variável:

```
MONGO_URI = mongodb+srv://evandropelais:dan025031990@cluster0.ea3g9n2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### Rotas da API

- `GET /api/produtos` — listar produtos
- `POST /api/produtos` — adicionar novo
- `DELETE /api/produtos/:numero` — remover por número