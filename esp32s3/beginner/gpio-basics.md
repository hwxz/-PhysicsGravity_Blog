# GPIO 操作详解

## 实验目的

深入理解 ESP32S3 的 GPIO 功能，掌握各种输入输出模式的使用。

## GPIO 概述

ESP32S3 拥有丰富的 GPIO 资源：
- 45 个可编程 GPIO 引脚
- 支持多种功能复用
- 支持内部上拉/下拉电阻

## 引脚模式

### INPUT 模式

```cpp
pinMode(pin, INPUT);
```

用于读取外部信号。

### OUTPUT 模式

```cpp
pinMode(pin, OUTPUT);
```

用于输出高低电平。

### INPUT_PULLUP 模式

```cpp
pinMode(pin, INPUT_PULLUP);
```

启用内部上拉电阻，引脚默认高电平。

### INPUT_PULLDOWN 模式

```cpp
pinMode(pin, INPUT_PULLDOWN);
```

启用内部下拉电阻，引脚默认低电平。

## 完整示例

```cpp
#include <Arduino.h>

const int LED_PIN = 18;
const int BUTTON_PIN = 4;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Serial.begin(115200);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  
  if (buttonState == LOW) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("LED ON");
  } else {
    digitalWrite(LED_PIN, LOW);
    Serial.println("LED OFF");
  }
  
  delay(100);
}
```

## 进阶应用：模拟输入

ESP32S3 支持模拟输入（ADC）：

```cpp
#include <Arduino.h>

const int POT_PIN = 34;

void setup() {
  Serial.begin(115200);
}

void loop() {
  int value = analogRead(POT_PIN);
  Serial.print("ADC 值: ");
  Serial.println(value);
  delay(100);
}
```

## 技术要点

1. **引脚兼容性**：某些引脚有特殊功能，需注意引脚映射
2. **电流能力**：每个 GPIO 引脚最大输出电流约 40mA
3. **ADC 精度**：ESP32S3 ADC 为 12 位，量程 0-4095

## 常见问题

**Q: GPIO 引脚没有输出？**
- 确认引脚模式设置正确
- 检查引脚是否被其他功能占用
- 确认引脚号是否正确

**Q: ADC 读数不稳定？**
- 添加 RC 滤波电路
- 多次采样取平均值
- 注意参考电压的稳定性