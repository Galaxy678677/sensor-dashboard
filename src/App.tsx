import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Control from '@/pages/Control';
import History from '@/pages/History';
import Diagnosis from '@/pages/Diagnosis';
import About from '@/pages/About';
// MQTT: 暂不加载，npm mqtt 包在浏览器生产环境有兼容问题
// 后续接入 STM32 时使用 CDN mqtt.js 替换
// import { useMQTT } from '@/hooks/useMQTT';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/control" element={<Control />} />
        <Route path="/history" element={<History />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
