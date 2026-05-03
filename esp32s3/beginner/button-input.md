# 按键输入与中断

## 实验目的

学习 ESP32S3 的 GPIO 输入操作，掌握按键检测和外部中断的使用方法。

## 硬件准备

- ESP32S3 开发板
- 轻触按键
- 10kΩ 下拉电阻
- 杜邦线若干

## 电路连接

| ESP32S3 引脚 | 连接设备 |
|-------------|---------|
| GPIO4       | 按键一端 |
| GND         | 按键另一端（通过 10kΩ 电阻） |

## 基础方法：轮询方式

```cpp
#include <Arduino.h>

const int BUTTON_PIN = 4;

void setup() {
  pinMode(BUTTON_PIN, INPUT);
  Serial.begin(115200);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  if (buttonState == HIGH) {
    Serial.println("按键按下");
    delay(200);
  }
}
```

## 进阶方法：外部中断

```cpp
#include <Arduino.h>

const int BUTTON_PIN = 4;
volatile bool buttonPressed = false;

void IRAM_ATTR buttonISR() {
  buttonPressed = true;
}

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLDOWN);
  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), buttonISR, RISING);
  Serial.begin(115200);
}

void loop() {
  if (buttonPressed) {
    Serial.println("按键中断触发");
    buttonPressed = false;
    delay(200);
  }
}
```

## 代码解析

### digitalRead() 函数

读取引脚电平状态：

```cpp
int value = digitalRead(pin);
```

返回值：`HIGH` 或 `LOW`

### attachInterrupt() 函数

配置外部中断：

```cpp
attachInterrupt(interruptNum, ISR, mode);
```

- `interruptNum`: 中断编号
- `ISR`: 中断服务函数
- `mode`: 触发模式（`RISING`/`FALLING`/`CHANGE`）

## 技术要点

1. **去抖处理**：按键机械抖动需要通过软件延时或硬件滤波处理
2. **中断优先级**：使用 `IRAM_ATTR` 宏确保中断函数存储在 IRAM 中
3. **内部上拉/下拉**：ESP32 支持内部上拉/下拉电阻，可减少外部元件

## 常见问题

**Q: 按键检测不稳定？**
- 添加适当的延时去抖
- 使用外部下拉电阻代替内部电阻
- 检查按键接线是否牢固

**Q: 中断不触发？**
- 确认中断触发模式是否正确
- 检查引脚是否支持中断功能