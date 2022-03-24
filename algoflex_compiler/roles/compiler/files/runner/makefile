CFLAGS=-Wall -Wextra
OBJECT=execute.o cJSON.o
TITLE=runner.out 

all : $(OBJECT)
		gcc $(OBJECT) -o $(TITLE) $(CFLAGS) -g

final : $(OBJECT)
		gcc $(OBJECT) -o $(TITLE) $(CFLAGS) -O3

%.o : %.c
		gcc -c $^ $(CFLAGS) -O3

clean :
		rm *.o -rf

cleanall :
		rm *.o *.out -rf
