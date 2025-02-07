"use client"
import React, { useState } from 'react';
import axios from 'axios';

const Page = () => {
    const [youtubeLink, setYoutubeLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/update-youtube-link', { link: youtubeLink });
            console.log('Link updated:', response.data);
        } catch (error) {
            console.error('Error updating link:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    YouTube Link:
                    <input
                        type="text"
                        value={youtubeLink}
                        onChange={(e) => setYoutubeLink(e.target.value)}
                    />
                </label>
                <button type="submit">Update</button>
            </form>
        </>
    );
};

export default Page;
