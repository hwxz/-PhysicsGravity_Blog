# 蓝牙 BLE 通信

## 实验目的

学习 ESP32S3 的蓝牙低功耗（BLE）功能，实现设备间的无线通信。

## 硬件准备

- ESP32S3 开发板
- 手机（支持 BLE）
- BLE 调试应用（如 nRF Connect）

## 代码实现

### BLE 服务器端

```cpp
#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic = NULL;
bool deviceConnected = false;

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};

class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string value = pCharacteristic->getValue();
      if (value.length() > 0) {
        Serial.println("收到数据: ");
        for (int i = 0; i < value.length(); i++) {
          Serial.print(value[i]);
        }
        Serial.println();
      }
    }
};

void setup() {
  Serial.begin(115200);
  
  BLEDevice::init("ESP32S3_BLE");
  
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  
  BLEService *pService = pServer->createService(SERVICE_UUID);
  
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );
  
  pCharacteristic->setCallbacks(new MyCallbacks());
  pCharacteristic->addDescriptor(new BLE2902());
  pCharacteristic->setValue("Hello World");
  
  pService->start();
  
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->start();
  
  Serial.println("BLE 服务器已启动");
}

void loop() {
  if (deviceConnected) {
    static unsigned long lastTime = 0;
    if (millis() - lastTime > 1000) {
      lastTime = millis();
      pCharacteristic->setValue("Heartbeat: " + String(millis()));
      pCharacteristic->notify();
    }
  }
}
```

## 代码解析

### BLE 初始化

```cpp
BLEDevice::init("设备名称");
```

### 创建服务和特征

```cpp
BLEService *pService = pServer->createService(SERVICE_UUID);
BLECharacteristic *pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
);
```

### 通知功能

```cpp
pCharacteristic->setValue("数据");
pCharacteristic->notify();
```

## 技术要点

1. **UUID 格式**：使用标准 UUID 格式，避免冲突
2. **功耗优化**：BLE 适合低功耗场景，注意连接间隔设置
3. **数据长度**：BLE 单次传输数据有限制，注意分包处理

## 常见问题

**Q: 手机找不到设备？**
- 确认蓝牙已开启
- 检查设备名称是否正确
- 确保广告正在发送

**Q: 数据传输不稳定？**
- 增加连接间隔
- 检查信号强度
- 优化数据分包策略