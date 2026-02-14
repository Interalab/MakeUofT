// views/CameraView/index.js
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import styles from './CameraView.module.css'; // 使用 CSS Modules

const videoConstraints = {
  facingMode: "environment", // 优先使用后置摄像头
  aspectRatio: 16 / 9,
};

const CameraView = ({ onCapture, isScanning }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);

  // 处理拍照
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
        onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  // --- Canvas 滤镜与动画逻辑 ---
useEffect(() => {
    const canvas = canvasRef.current;

    // 👇👇👇 【一定要加这一行】 👇👇👇
    if (!canvas) return; 
    // 👆👆👆 如果 canvas 还没准备好，就直接返回，防止报错

    const ctx = canvas.getContext('2d'); // 这里之前会报错，现在安全了
    let animationFrameId;
    let scanLineY = 0;

    const render = () => {
      // 1. 清空 Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 如果相机准备好了，可以从 video 元素绘制到 canvas 上 (高级玩法)
      // if (webcamRef.current && webcamRef.current.video) {
      //    ctx.drawImage(webcamRef.current.video, 0, 0, canvas.width, canvas.height);
      // }

      if (isScanning) {
        // === 绘制扫描动画 ===
        // 绘制一个半透明的遮罩层
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制移动的扫描线
        ctx.beginPath();
        ctx.moveTo(0, scanLineY);
        ctx.lineTo(canvas.width, scanLineY);
        ctx.strokeStyle = '#00ff00'; // 绿色扫描线
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff00';
        ctx.stroke();

        scanLineY += 5;
        if (scanLineY > canvas.height) scanLineY = 0;

      } else {
        // === 待机状态滤镜 ===
        // 可以在这里绘制取景框，或者轻微的色彩滤镜
        // 例如：绘制一个简单的白色取景框
        const padding = 50;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 2;
        ctx.strokeRect(padding, padding, canvas.width - padding*2, canvas.height - padding*2);
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    // 设置 Canvas 尺寸以匹配窗口 (简化处理)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isScanning, cameraReady]);
  // ---------------------------

  return (
    <div className={styles.cameraContainer}>
      {/* 1. 摄像头层 */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className={styles.videoLayer}
        onUserMedia={() => setCameraReady(true)}
      />

      {/* 2. Canvas 滤镜/动画层 (绝对定位覆盖在视频上) */}
      <canvas
        ref={canvasRef}
        className={styles.canvasLayer}
      />

      {/* 3. 控制按钮层 */}
      {!isScanning && (
        <div className={styles.controlsLayer}>
          <button className={styles.captureButton} onClick={capture}>
            <div className={styles.innerCircle}></div>
          </button>
        </div>
      )}

      {isScanning && (
          <div className={styles.scanningText}>正在识别花朵与心情...</div>
      )}
    </div>
  );
};

export default CameraView;