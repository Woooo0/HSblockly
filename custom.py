from ultrasonic import Ultrasonic
import utime

ultrasonic2 = Ultrasonic(2)


while True:
  print(ultrasonic2.read())
  utime.sleep_ms(1000)
