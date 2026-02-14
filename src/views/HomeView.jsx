// src/views/HomeView.jsx
import React from 'react';

const HomeView = ({ onStartClick }) => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)'
    }}>
      <h1>🌸 识花听曲</h1>
      <p>发现每一朵花的专属旋律</p>
      <button 
        onClick={onStartClick}
        style={{
          marginTop: '20px',
          padding: '15px 40px',
          fontSize: '1.2rem',
          borderRadius: '50px',
          border: 'none',
          background: '#ff6b6b',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
        }}
      >
        开始探索
      </button>
    </div>
  );
};


export default HomeView;