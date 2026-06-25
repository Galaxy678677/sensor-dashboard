import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Control from '@/pages/Control';
import History from '@/pages/History';
import Diagnosis from '@/pages/Diagnosis';
import About from '@/pages/About';
import { useMQTT } from '@/hooks/useMQTT';

function MQTTBridge() {
  useMQTT();
  return null;
}

export default function App() {
  return (
    <Router basename="/sensor-dashboard">
      <MQTTBridge />
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
