import React, { useState } from 'react';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import './App.css';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage('Please select a file first.');
            return;
        }
        
        const chatId = WebApp.initDataUnsafe.user.id;
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('chatId', chatId);

        try {
            await axios.post('http://localhost:3000/upload', formData);
            setMessage('Image uploaded successfully! You have earned 100 points.');
        } catch (error) {
            setMessage('Failed to upload image.');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Upload an Image and Earn Points</h1>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
                <p>{message}</p>
            </header>
        </div>
    );
}

export default App;
