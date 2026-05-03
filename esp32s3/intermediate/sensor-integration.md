# 传感器集成实践

## 实验目的

学习如何将各种传感器与 ESP32S3 连接并读取数据。

## 硬件准备

- ESP32S3 开发板
- DHT11/DHT22 温湿度传感器
- HC-SR04 超声波测距模块
- 杜邦线若干

## DHT11 温湿度传感器

### 电路连接

| ESP32S3 引脚 | DHT11 |
|-------------|-------|
| 3.3V        | VCC   |
| GPIO15      | DATA  |
| GND         | GND   |

### 代码实现

```cpp
#include <Arduino.h>
#include <DHT.h>

#define DHT_PIN 15
#define DHT_TYPE DHT11

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  delay(2000);
  
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("读取传感器失败");
    return;
  }
  
  Serial.print("湿度: ");
  Serial.print(humidity);
  Serial.print("%\t");
  Serial.print("温度: ");
  Serial.print(temperature);
  Serial.println("°C");
}
```

## HC-SR04 超声波传感器

### 电路连接

| ESP32S3 引脚 | HC-SR04 |
|-------------|---------|
| GPIO12      | TRIG    |
| GPIO13      | ECHO    |
| 5V          | VCC     |
| GND         | GND     |

### 代码实现

```cpp
#include <Arduino.h>

const int TRIG_PIN = 12;
const int ECHO_PIN = 13;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = duration * 0.034 / 2;
  
  Serial.print("距离: ");
  Serial.print(distance);
  Serial.println(" cm");
  
  delay(500);
}
```

## 技术要点

1. **传感器电源**：注意传感器的电压要求
2. **信号滤波**：对模拟传感器进行适当滤波处理
3. **数据校准**：定期校准传感器以保证精度

## 常见问题

**Q: DHT11 读取失败？**
- 检查接线是否正确
- 确认传感器型号是否正确
- 增加读取间隔时间

**Q: HC-SR04 读数不稳定？**
- 添加适当的延时
- 多次测量取平均值
- 确保传感器前方无障碍物