// TODO 广告组件
import { FC, useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import WeChatPay from "@/assets/WeChatPay.png"
import Alipay from "@/assets/Alipay.jpg"

// 广告组件配置接口
interface AdvertiseConfig {
    /**挂载时是否显示 */
    showOnMount?: boolean;
    /**自动隐藏时间(毫秒) */
    autoHideAfter?: number;
    /**关闭回调 */
    onClose?: () => void;
    /**是否显示倒计时 */
    showCountdown?: boolean;
}


const MyAdvertise: FC<AdvertiseConfig> = (
    {
        showOnMount = true,
        autoHideAfter = 5000,
        onClose = () => { },
        showCountdown = true,
    }
) => {
    const [isOpen, setIsOpen] = useState(showOnMount);
    const [countdown, setCountdown] = useState(autoHideAfter / 1000); // 转换为秒
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const firstMountRef = useRef(true);
    // 组件挂载时处理
    useEffect(() => {
        if (firstMountRef.current) {
            firstMountRef.current = false;
            return;
        }

        // 自动弹出广告
        setIsOpen(showOnMount);

        // 初始化倒计时
        setCountdown(autoHideAfter / 1000);

        // 设置自动隐藏定时器和倒计时
        if (showOnMount && autoHideAfter > 0) {
            timerRef.current = setInterval(() => {
                // 更新倒计时
                setCountdown(prev => {
                    if (prev <= 1) {
                        handleClose();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000); // 每秒更新一次

            // 自动隐藏广告
            timerRef.current = setTimeout(() => {
                handleClose();
            }, autoHideAfter);
        }

        // 组件卸载时清除定时器
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                clearTimeout(timerRef.current);
            }
        };
    }, [showOnMount, autoHideAfter]);
    // 关闭广告
    function handleClose() {
        setIsOpen(false);
        onClose();
        if (timerRef.current) {
            clearInterval(timerRef.current);
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }
    // 将秒数格式化为 mm:ss
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return (
        <Drawer open={isOpen} modal={true}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className='text-center'>VitaLink</DrawerTitle>
                        {showCountdown && (
                            <span className='text-center'>
                                倒计时: {formatTime(countdown)}
                            </span>
                        )}
                        <DrawerDescription>如果你觉得这个项目对你有帮助 可以赞助我一杯咖啡☕️.</DrawerDescription>
                        <div className="flex-1 text-center">
                            <div className="text-7xl font-bold tracking-tighter">
                                50¥
                            </div>
                        </div>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <img className='w-45 h-60' src={WeChatPay} alt="微信支付" />
                            <img className='w-45 h-60' src={Alipay} alt="支付宝支付" />
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleClose}>关闭</Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default MyAdvertise;