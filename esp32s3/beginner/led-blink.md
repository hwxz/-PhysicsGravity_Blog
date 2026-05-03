# LED 闪烁入门

## 实验目的

学习 ESP32S3 的 GPIO 输出操作，实现 LED 闪烁功能。

## 硬件准备

- ESP32S3 开发板
- LED 灯（红色）
- 220Ω 限流电阻
- 杜邦线若干

## 电路连接

| ESP32S3 引脚 | 连接设备 |
|-------------|---------|
| GPIO18      | LED 正极（通过 220Ω 电阻） |
| GND         | LED 负极 |

## 代码实现

```cpp
#include <Arduino.h>

const int LED_PIN = 18;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}
```

## 代码解析

### pinMode() 函数

用于设置引脚的输入/输出模式：

```cpp
pinMode(pin, mode);
```

- `pin`: 引脚编号（如 GPIO18）
- `mode`: `INPUT` 或 `OUTPUT`

### digitalWrite() 函数

用于设置引脚的电平状态：

```cpp
digitalWrite(pin, value);
```

- `value`: `HIGH`（高电平）或 `LOW`（低电平）

### delay() 函数

延时函数，单位为毫秒：

```cpp
delay(ms);
```

## 技术要点

1. **电流限制**：LED 需要串联限流电阻，通常选择 220Ω~1kΩ
2. **引脚选择**：优先选择未被其他功能占用的引脚
3. **电源考虑**：确保开发板供电稳定

## 常见问题

**Q: LED 不亮怎么办？**
- 检查电路连接是否正确
- 确认引脚号是否正确
- 检查电阻是否正确连接

**Q: LED 一直亮不闪烁？**
- 检查 `delay()` 函数是否正确调用
- 确认 `digitalWrite()` 的参数是否正确