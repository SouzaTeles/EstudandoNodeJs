const customExpress = require('./config/customExpress');
const app = customExpress();
app.listen(3000, () => console.log('servidor rodando na porta 3000'));
app.get('/', (req, res) => res.send('Servidor rodando, tudo ok'))
