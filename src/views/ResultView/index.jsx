// views/ResultView/index.js
import React, { useEffect, useRef, useState } from 'react';
import styles from './ResultView.module.css';

const ResultView = ({ image, data, onRestart }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { flower, music } = data;

  // 自动播放音乐
  useEffect(() => {
    if (audioRef.current) {
        // 注意：现代浏览器通常阻止自动播放，需要用户交互。
        // 实际项目中，可能需要用户点击一下“播放”按钮才能开始。
        // 这里为了演示先尝试自动播放。
        audioRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(e => console.log("Autoplay blocked:", e));
    }
  }, []);

  const togglePlay = () => {
      if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
      } else {
          audioRef.current.pause();
          setIsPlaying(false);
      }
  };

  // 动态样式，根据音乐主题色改变背景氛围
  const dynamicStyle = {
      '--theme-color': music.themeColor || '#ffffff',
      backgroundImage: `url(${image})`
  };

  return (
    <div className={styles.resultContainer} style={dynamicStyle}>
      {/* 背景遮罩，用于营造氛围滤镜 */}
      <div className={styles.colorOverlay}></div>
      <div className={styles.blurBackground} style={{backgroundImage: `url(${image})`}}></div>


      <div className={styles.content}>
        <div className={styles.flowerCard}>
            <img src={image} alt="Captured flower" className={styles.flowerImage} />
            <h2>{flower.name}</h2>
            <p className={styles.flowerLanguage}>{flower.language}</p>
        </div>

        <div className={styles.musicPlayer}>
            <p>正在为你播放:</p>
            <h3>🎵 {music.title}</h3>
            {/* 这里替换为真实的音乐链接 */}
            <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop />
            <button className={styles.playButton} onClick={togglePlay}>
                {isPlaying ? '暂停 II' : '播放 ▶'}
            </button>
        </div>
      </div>

      <button className={styles.restartButton} onClick={onRestart}>
        识别另一朵花
      </button>
    </div>
  );
};

export default ResultView;