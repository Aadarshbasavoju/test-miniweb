const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const multer = require('multer');
const path = require('path');

const token = '7013342731:AAFPJ4AHxsZbOtVRXL92Ka9P8FGARuBU71I';
const bot = new TelegramBot(token, { polling: true });

const app = express();
const upload = multer({ dest: 'uploads/' });

let users = {}; // In-memory user data store

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Upload an Image', web_app: { url: 'http://localhost:3000' } }]
            ]
        }
    };
    bot.sendMessage(chatId, 'Welcome! Click the button below to upload an image and earn points:', opts);
});

// Endpoint to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
    const chatId = req.body.chatId;
    if (!users[chatId]) {
        users[chatId] = { points: 0 };
    }
    users[chatId].points += 100;
    res.send('Image uploaded successfully!');
});

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
