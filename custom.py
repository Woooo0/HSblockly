from led import Led
from motor import Motor
import utime

led1 = Led(1)

led2 = Led(2)

motor1 = Motor(1)

motor2 = Motor(2)


while True:
  led1.on()
  led2.on()
  motor1.forward()
  motor2.forward()
  motor1.speed(10)
  motor2.speed(10)
  utime.sleep_ms(1000)
  led1.off()
  led2.off()
  motor1.backward()
  motor2.backward()
  motor1.speed(10)
  motor2.speed(10)
  utime.sleep_ms(1000)

