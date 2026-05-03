# 步进电机控制

## 实验目的

学习 ESP32S3 控制步进电机的方法，实现精确的位置控制。

## 硬件准备

- ESP32S3 开发板
- 28BYJ-48 步进电机 + ULN2003 驱动板
- 杜邦线若干

## 电路连接

| ESP32S3 引脚 | ULN2003 驱动板 |
|-------------|----------------|
| GPIO2       | IN1            |
| GPIO3       | IN2            |
| GPIO4       | IN3            |
| GPIO5       | IN4            |
| 5V          | VCC            |
| GND         | GND            |

## 代码实现

```cpp
#include <Arduino.h>
#include <Stepper.h>

const int stepsPerRevolution = 2048;

Stepper myStepper(stepsPerRevolution, 2, 4, 3, 5);

void setup() {
  myStepper.setSpeed(10);
  Serial.begin(115200);
}

void loop() {
  Serial.println("顺时针旋转");
  myStepper.step(stepsPerRevolution);
  delay(500);
  
  Serial.println("逆时针旋转");
  myStepper.step(-stepsPerRevolution);
  delay(500);
}
```

## 进阶控制

```cpp
#include <Arduino.h>
#include <Stepper.h>

const int stepsPerRevolution = 2048;
Stepper myStepper(stepsPerRevolution, 2, 4, 3, 5);

int targetPosition = 0;
int currentPosition = 0;

void setup() {
  myStepper.setSpeed(30);
  Serial.begin(115200);
}

void loop() {
  if (Serial.available() > 0) {
    targetPosition = Serial.parseInt();
    Serial.print("目标位置: ");
    Serial.println(targetPosition);
  }
  
  int stepsToMove = targetPosition - currentPosition;
  
  if (stepsToMove != 0) {
    myStepper.step(stepsToMove);
    currentPosition = targetPosition;
    Serial.print("当前位置: ");
    Serial.println(currentPosition);
  }
  
  delay(10);
}
```

## 技术要点

1. **驱动方式**：ULN2003 是达林顿管阵列，适合驱动感性负载
2. **速度控制**：步进电机速度不宜过快，避免丢步
3. **细分驱动**：通过细分可以提高精度和运行平稳性

## 常见问题

**Q: 电机不转？**
- 检查电源是否充足（至少 5V 1A）
- 确认接线顺序正确
- 检查使能引脚是否正确设置

**Q: 电机丢步？**
- 降低运行速度
- 检查电源稳定性
- 增加驱动电流