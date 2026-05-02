# Arduino 基础入门

::: tip 难度标签
入门
:::

## 什么是Arduino？

Arduino是一个开源电子原型平台，包含硬件（各种型号的开发板）和软件（Arduino IDE）。它使用简单，适合初学者快速上手电子项目开发。

## 开发板介绍

### Arduino Uno
- 最经典的入门级开发板
- ATmega328P微控制器
- 14个数字IO口
- 6个模拟输入口
- USB接口供电和编程

### 其他常用型号
- Arduino Nano：小巧紧凑，适合嵌入式项目
- Arduino Mega：IO口更多，适合复杂项目
- ESP32：内置WiFi和蓝牙，适合物联网应用

## 第一个程序：闪烁LED

```cpp
void setup() {
  // 初始化数字引脚13为输出模式
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);  // 点亮LED
  delay(1000);             // 等待1秒
  digitalWrite(13, LOW);   // 熄灭LED
  delay(1000);             // 等待1秒
}
```

### 代码说明
- `setup()`：程序启动时运行一次，用于初始化
- `loop()`：循环运行，是程序的主逻辑
- `pinMode()`：设置引脚模式（输入/输出）
- `digitalWrite()`：设置引脚电平（高/低）
- `delay()`：延时函数，单位毫秒

## 上传程序步骤

1. 连接Arduino开发板到电脑
2. 打开Arduino IDE
3. 选择正确的开发板型号和端口
4. 复制上述代码到IDE
5. 点击上传按钮
6. 观察开发板上的LED闪烁效果

---

**恭喜！您已完成Arduino入门！**