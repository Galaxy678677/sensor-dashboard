import { Leaf, Cpu, Wifi, Heart } from 'lucide-react';
import { Layout } from '@/components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#7DB87D] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <Leaf size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[#333333] mb-2">智能植物养护系统</h1>
          <p className="text-sm text-gray-500">让科技守护每一片绿叶</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold mb-3 flex items-center gap-2">
            <Cpu size={18} className="text-[#7DB87D]" /> 项目简介
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            本项目是一套面向家庭种植爱好者的智能植物养护方案。通过 STM32N6 单片机采集土壤湿度、空气温湿度、光照强度等多维环境数据，
            经 ESP8266 Wi-Fi 模块上传至云端 MQTT 服务器；用户可通过本网页实时查看植物状态、远程控制浇水/补光/遮阳等设备，
            并借助 AI 图像识别技术对叶片健康进行初步诊断。
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <Wifi size={18} className="text-[#7DB87D]" /> 技术栈
          </h2>
          <div className="flex flex-wrap gap-2">
            {['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'MQTT over WebSocket', 'STM32N6', 'ESP8266'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-[#F5F0E8] text-xs font-medium text-[#333333]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold mb-3">使用说明</h2>
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside leading-relaxed">
            <li>默认使用模拟数据，无需连接硬件即可体验全部功能。</li>
            <li>点击顶部导航栏的“模拟数据/真实设备”按钮可切换 MQTT 连接。</li>
            <li>连接真实设备前，请确保 ESP8266 已连接 Wi-Fi 并能访问 broker.emqx.io。</li>
            <li>数据主题：<code className="bg-[#F5F0E8] px-1 rounded">stm32/sensor/data</code>，指令主题：<code className="bg-[#F5F0E8] px-1 rounded">stm32/sensor/cmd</code>，状态主题：<code className="bg-[#F5F0E8] px-1 rounded">stm32/sensor/status</code>。</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold mb-3 flex items-center gap-2">
            <Heart size={18} className="text-red-400" /> 研发团队
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            团队名称：<span className="font-medium text-[#333333]">嵌入灵魂</span>
          </p>
          <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
            <p className="font-medium text-[#333333]">团队成员：</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>北京邮电大学 电子工程学院 宗敬伦</li>
              <li>北京邮电大学 信息与通信工程学院 王亚洲</li>
              <li>北京邮电大学 国际学院 王辰易</li>
            </ul>
            <p className="pt-2">
              指导老师：<span className="font-medium text-[#333333]">北京邮电大学 电子工程学院 刘昊老师</span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
