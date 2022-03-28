import sys

code = sys.argv[1]
json = sys.argv[2]

fcode = open("main.cpp", "w")
fcode.write(code)
fcode.close()  

fjson = open("test.json", "w")
fjson.write(json)
fjson.close()
