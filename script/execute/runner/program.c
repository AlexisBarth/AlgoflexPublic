#include <stdio.h>
#include <unistd.h>

int main(){
    int i;
    int buffer;
    int buffer2;
    int d = 0;
    scanf("%d", &buffer);
    scanf("%d", &buffer2);
    fprintf(stderr, "buffer1 : %d\n", buffer);
    fprintf(stderr, "buffer2 : %d\n", buffer2);
    sleep(2);
    d = buffer2 + buffer;    
    printf("%d\n", d);

    return 0;
}