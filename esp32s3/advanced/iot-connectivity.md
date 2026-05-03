# IoT 网络连接

## 实验目的

学习 ESP32S3 的网络连接功能，实现物联网数据传输。

## 硬件准备

- ESP32S3 开发板
- WiFi 网络
- 可选：MQTT 服务器

## WiFi 连接

```cpp
#include <Arduino.h>
#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi 连接成功");
  Serial.print("IP 地址: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.reconnect();
  }
  delay(1000);
}
```

## HTTP 请求

```cpp
#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    http.begin("http://example.com/api/data");
    int httpCode = http.GET();
    
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(payload);
    }
    
    http.end();
  }
  
  delay(5000);
}
```

## MQTT 通信

```cpp
#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqttServer = "broker.hivemq.com";
const int mqttPort = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("收到消息 [");
  Serial.print(topic);
  Serial.print("] ");
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP32Client")) {
      client.subscribe("esp32/test");
    } else {
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  client.publish("esp32/test", "Hello from ESP32S3");
  delay(2000);
}
```

## 技术要点

1. **网络稳定性**：添加重连机制确保连接可靠性
2. **功耗优化**：不需要网络时进入低功耗模式
3. **安全连接**：使用 HTTPS/WSS 加密通信

## 常见问题

**Q: WiFi 连接失败？**
- 确认 SSID 和密码正确
- 检查 WiFi 信号强度
- 确认开发板在 WiFi 覆盖范围内

**Q: MQTT 连接失败？**
- 检查服务器地址和端口
- 确认网络连接正常
- 检查防火墙设置