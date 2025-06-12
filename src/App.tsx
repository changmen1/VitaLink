import { useState } from "react";
import MyAdvertise from "./pages/components/myDarwer";
import RouterProvider from "./router";

function App() {
  const [showAd, setShowAd] = useState(true);
  // 自定义关闭回调
  const handleAdClose = () => {
    setShowAd(false);
  };
  return (
    <>
      <RouterProvider />
      {/* 广告组件 - 挂载时显示*/}
      {showAd && (
        <MyAdvertise
          showOnMount={true}
          autoHideAfter={10000}
          onClose={handleAdClose}
        />
      )}
    </>
  )
}

export default App
