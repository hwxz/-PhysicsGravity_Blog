# 电源管理优化

## 实验目的

学习 ESP32S3 的电源管理功能，优化设备功耗。

## 硬件准备

- ESP32S3 开发板
- 锂电池（可选）
- 万用表（用于测量电流）

## 睡眠模式配置

### 浅睡眠模式

```cpp
#include <Arduino.h>
#include <esp_sleep.h>

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("进入浅睡眠模式");
  
  esp_sleep_enable_timer_wakeup(5000000);
  esp_light_sleep_start();
  
  Serial.println("从浅睡眠唤醒");
}

void loop() {
  delay(1000);
}
```

### 深睡眠模式

```cpp
#include <Arduino.h>
#include <esp_sleep.h>

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("进入深睡眠模式");
  
  esp_sleep_enable_timer_wakeup(10000000);
  esp_deep_sleep_start();
}

void loop() {
  
}
```

### 外部唤醒

```cpp
#include <Arduino.h>
#include <esp_sleep.h>

#define WAKEUP_PIN 4

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  esp_sleep_enable_ext0_wakeup(GPIO_NUM_4, 1);
  
  Serial.println("进入深睡眠，等待外部唤醒");
  esp_deep_sleep_start();
}

void loop() {
  
}
```

## 功耗优化技巧

```cpp
#include <Arduino.h>
#include <esp_pm.h>

void setup() {
  Serial.begin(115200);
  
  esp_pm_config_t pm_config = {
    .max_freq_mhz = 80,
    .min_freq_mhz = 20,
    .light_sleep_enable = true
  };
  
  esp_pm_configure(&pm_config);
  
  Serial.println("电源管理配置完成");
}

void loop() {
  delay(1000);
}
```

## 技术要点

1. **模式选择**：根据应用场景选择合适的睡眠模式
2. **唤醒源**：合理选择唤醒源以平衡功耗和响应速度
3. **外设管理**：进入睡眠前关闭不必要的外设

## 常见问题

**Q: 无法从睡眠中唤醒？**
- 检查唤醒源配置是否正确
- 确认定时器时间设置正确
- 检查外部唤醒引脚连接

**Q: 功耗没有降低？**
- 确认进入了正确的睡眠模式
- 检查是否有外设仍在工作
- 使用万用表实际测量电流