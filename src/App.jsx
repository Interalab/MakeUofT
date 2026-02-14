// App.js
import React, { useState } from 'react';
import HomeView from './views/HomeView';
import CameraView from './views/CameraView';
import ResultView from './views/ResultView';
import './App.css'; // 全局样式

// 应用状态枚举
const APP_STATES = {
  HOME: 'HOME',
  CAMERA: 'CAMERA',
  SCANNING: 'SCANNING',
  RESULT: 'RESULT',
};

function App() {
  const [currentState, setCurrentState] = useState(APP_STATES.HOME);
  const [capturedImage, setCapturedImage] = useState(null);
  const [resultData, setResultData] = useState(null); // 存放识别结果和音乐信息

  // 模拟 API 调用过程
  const handleImageCaptured = async (imageSrc) => {
    setCapturedImage(imageSrc);
    setCurrentState(APP_STATES.SCANNING);

    // 这里将来替换为真实的后端 API 调用
    console.log('正在识别图片并匹配音乐...');
    setTimeout(() => {
      // 模拟返回数据
      const mockResult = {
        flower: { name: '向日葵 (Sunflower)', language: '信念、光辉、高傲' },
        music: { title: 'Walking On Sunshine', mood: 'cheerful', themeColor: '#FFD700' } // 主题色用于滤镜
      };
      setResultData(mockResult);
      setCurrentState(APP_STATES.RESULT);
    }, 3000); // 模拟 3秒等待
  };

  const resetApp = () => {
    setCapturedImage(null);
    setResultData(null);
    setCurrentState(APP_STATES.CAMERA);
  };

  return (
    <div className="app-container">
        {/* 根据状态渲染不同的视图 */}
      {currentState === APP_STATES.HOME && (
        <HomeView onStartClick={() => setCurrentState(APP_STATES.CAMERA)} />
      )}

      {/* CameraView 在 SCANNING 状态下也需要保持挂载，以便显示扫描动画 */}
      {(currentState === APP_STATES.CAMERA || currentState === APP_STATES.SCANNING) && (
        <CameraView
          isScanning={currentState === APP_STATES.SCANNING}
          onCapture={handleImageCaptured}
        />
      )}

      {currentState === APP_STATES.RESULT && resultData && (
        <ResultView
          image={capturedImage}
          data={resultData}
          onRestart={resetApp}
        />
      )}
    </div>
  );
}

export default App;