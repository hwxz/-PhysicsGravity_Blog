# 串口通信基础

## 实验目的

学习 ESP32S3 的串口通信功能，掌握数据发送和接收的方法。

## 硬件准备

- ESP32S3 开发板
- USB 数据线
- 串口调试助手软件

## 代码实现

### 基本串口配置

```cpp
#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);
}

void loop() {
  Serial.println("Hello, ESP32S3!");
  delay(1000);
}
```

### 串口数据接收

```cpp
#include <Arduino.h>

void setup() {
  Serial.begin(115200);
}

void loop() {
  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    Serial.print("收到数据: ");
    Serial.println(data);
  }
}
```

### 串口数据解析

```cpp
#include <Arduino.h>

void setup() {
  Serial.begin(115200);
}

void loop() {
  if (Serial.available() > 0) {
    char cmd = Serial.read();
    switch(cmd) {
      case '1':
        digitalWrite(18, HIGH);
        Serial.println("LED 已开启");
        break;
      case '0':
        digitalWrite(18, LOW);
        Serial.println("LED 已关闭");
        break;
      default:
        Serial.println("未知命令");
    }
  }
}
```

## 代码解析

### Serial.begin() 函数

初始化串口通信：

```cpp
Serial.begin(baudRate);
```

常用波特率：9600, 115200, 230400

### Serial.available() 函数

检查接收缓冲区是否有数据：

```cpp
int available = Serial.available();
```

### Serial.read() / Serial.println()

读取和发送数据：

```cpp
char data = Serial.read();
Serial.println("Hello World");
```

## 技术要点

1. **波特率匹配**：确保串口调试助手的波特率与代码一致
2. **数据格式**：注意换行符和数据分隔符的处理
3. **缓冲区大小**：ESP32S3 默认有 256 字节的接收缓冲区

## 常见问题

**Q: 串口没有输出？**
- 确认串口端口选择正确
- 检查波特率设置是否匹配
- 确认开发板已正确连接

**Q: 接收数据乱码？**
- 检查波特率是否一致
- 尝试降低波特率
- 检查 USB 线是否良好