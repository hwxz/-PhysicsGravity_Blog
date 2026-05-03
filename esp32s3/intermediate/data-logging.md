# 数据记录与存储

## 实验目的

学习如何在 ESP32S3 上实现数据记录和存储功能。

## 硬件准备

- ESP32S3 开发板
- MicroSD 卡模块
- SD 卡（FAT32 格式）
- DHT11 传感器（可选）

## SD 卡数据记录

### 电路连接

| ESP32S3 引脚 | SD 模块 |
|-------------|---------|
| GPIO12      | MISO    |
| GPIO13      | MOSI    |
| GPIO14      | SCK     |
| GPIO15      | CS      |
| 3.3V        | VCC     |
| GND         | GND     |

### 代码实现

```cpp
#include <Arduino.h>
#include <SPI.h>
#include <SD.h>

const int CS_PIN = 15;
File dataFile;

void setup() {
  Serial.begin(115200);
  
  if (!SD.begin(CS_PIN)) {
    Serial.println("SD 卡初始化失败");
    return;
  }
  
  dataFile = SD.open("data.csv", FILE_WRITE);
  
  if (dataFile) {
    dataFile.println("时间,温度,湿度");
    dataFile.close();
    Serial.println("文件创建成功");
  } else {
    Serial.println("无法创建文件");
  }
}

void loop() {
  float temperature = 25.5;
  float humidity = 60.0;
  
  dataFile = SD.open("data.csv", FILE_WRITE);
  
  if (dataFile) {
    dataFile.print(millis());
    dataFile.print(",");
    dataFile.print(temperature);
    dataFile.print(",");
    dataFile.println(humidity);
    dataFile.close();
    
    Serial.print("记录数据: ");
    Serial.print(millis());
    Serial.print(", ");
    Serial.print(temperature);
    Serial.print(", ");
    Serial.println(humidity);
  } else {
    Serial.println("无法打开文件");
  }
  
  delay(1000);
}
```

## 内部 Flash 存储

```cpp
#include <Arduino.h>
#include <Preferences.h>

Preferences preferences;

void setup() {
  Serial.begin(115200);
  
  preferences.begin("my-app", false);
  
  int bootCount = preferences.getInt("bootCount", 0);
  bootCount++;
  preferences.putInt("bootCount", bootCount);
  
  Serial.print("启动次数: ");
  Serial.println(bootCount);
  
  preferences.end();
}

void loop() {
  delay(1000);
}
```

## 技术要点

1. **文件格式**：使用 CSV 格式便于后续数据分析
2. **数据完整性**：定期刷新缓冲区确保数据写入
3. **存储空间**：注意 SD 卡的剩余空间

## 常见问题

**Q: SD 卡无法初始化？**
- 检查 SPI 引脚连接是否正确
- 确认 SD 卡已正确格式化
- 检查 CS 引脚配置

**Q: 数据写入失败？**
- 检查文件是否已打开
- 确认 SD 卡有足够空间
- 尝试重新格式化 SD 卡