const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config()

const app = express(); 

let data = [];

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/api/items', (req, res) => {
    res.json(data);
});

app.post('/api/items', (req, res) => {
    const { name, position } = req.body;
    if (name && position) {
        const newItem = { name, position, completed: false };
        data.push(newItem);
        res.status(201).json(newItem);
    } else {
        res.status(400).json({ message: 'Ошибка при отправке данных' });
    }
});

app.delete('/api/items/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (data[index]) {
        const deleteItem = data.splice(index, 1);
        res.json(deleteItem);
    } else {
        res.status(404).json({ message: 'Не удалось удалить' });
    }
});

app.put('/api/items/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (data[index]) {
        data[index].completed = true;
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Не удалось отметить' });
    }
});


app.listen(port, () => {
    console.log('Сервер запущен на сервере http://localhost:4000');
});
 