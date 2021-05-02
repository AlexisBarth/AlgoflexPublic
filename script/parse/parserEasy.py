import json
import sys

argument = sys.argv[1]
print(argument)

data = json.loads(argument)

f = open("main.cpp", "w")
f.write(data['code'])
f.close()  