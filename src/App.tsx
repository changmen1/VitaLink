import { useState } from "react";
import MyAdvertise from "./pages/components/myDarwer";

function App() {
  const [showAd, setShowAd] = useState(true);
  // 自定义关闭回调
  const handleAdClose = () => {
    setShowAd(false);
  };
  return (
    <>
      <h1>内容</h1>
      {/* 广告组件 - 挂载时显示，10秒后自动隐藏 */}
      {showAd && (
        <MyAdvertise
          showOnMount={true}
          autoHideAfter={60000}
          onClose={handleAdClose}
        />
      )}
    </>
  )
}

export default App
