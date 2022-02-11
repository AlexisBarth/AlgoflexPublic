#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/wait.h> 
#include <sys/time.h>
#include <string.h>
#include "cJSON.h"
#include <signal.h>
#define EXIT_ERROR 2

typedef struct{
    char** entree;
    char** sortie;
    int maxtime;
    int maxmemory;
    int numberOfEntrees;
    int numberOfSorties;
}TEST;

typedef struct{
    TEST* tests;
    int numberOfTests;
    cJSON* json;
}EXERCICE;

int child_pid = 0;

// Détermine le nombre de caractère dans un fichier
size_t fsize(FILE* fp){
    size_t size;
    fseek(fp, 0, SEEK_END);
    size = ftell(fp);
    fseek(fp, 0, SEEK_SET);
    return size;
}

// Lis un json et retourne le contenu
char* readJson(const char* const filename, size_t* size){
    FILE* file = fopen(filename, "r");
    *size = fsize(file);
    char* content = malloc(sizeof(char) * (*size+1));
    if(*size != fread(content, sizeof(char), *size, file)){
         fprintf(stderr, "Cannot read blocks in file\n" );
    }
    fclose(file);
    return content;
}

// Recupère l'exercice à partir d'un fichier json
EXERCICE getExercice(const char* const file){
    const cJSON* json_exercices = NULL;
    const cJSON* json_exercice = NULL;
    const cJSON* sortie = NULL;
    const cJSON* entree = NULL;
    TEST* tests = NULL;
    int i = 0, j;
    size_t size = 0;
    EXERCICE exo;

    char* jsoncontent = readJson(file, &size);
    exo.json = cJSON_ParseWithLength(jsoncontent, size);
    json_exercices = cJSON_GetObjectItemCaseSensitive(exo.json, "exercice");
    
    exo.numberOfTests = cJSON_GetArraySize(json_exercices);

    tests = malloc(sizeof(TEST) * exo.numberOfTests);

    cJSON_ArrayForEach(json_exercice, json_exercices){
        const cJSON *entrees = cJSON_GetObjectItemCaseSensitive(json_exercice, "entree");
        const cJSON *sorties = cJSON_GetObjectItemCaseSensitive(json_exercice, "sorties");
        const cJSON *maxtime = cJSON_GetObjectItemCaseSensitive(json_exercice, "maxtime");
        const cJSON *maxmemory = cJSON_GetObjectItemCaseSensitive(json_exercice, "maxmemory");

        if(!cJSON_IsArray(entrees) || !cJSON_IsArray(sorties) || !cJSON_IsNumber(maxtime) || !cJSON_IsNumber(maxmemory)){
            perror("Erreur pendant le parsing des questions");
        }
        tests[i].numberOfSorties = cJSON_GetArraySize(sorties);
        tests[i].sortie = malloc(sizeof(char*) * tests[i].numberOfSorties);
        j = 0;
        cJSON_ArrayForEach(sortie, sorties){
            if(!cJSON_IsString(sortie)){
                perror("Erreur pendant le parsing des questions");
            }
            tests[i].sortie[j] = sortie->valuestring;
            j++;
        }

        tests[i].numberOfEntrees = cJSON_GetArraySize(entrees);
        tests[i].entree = malloc(sizeof(char*) * tests[i].numberOfEntrees);
        j = 0;
        cJSON_ArrayForEach(entree, entrees){
            if(!cJSON_IsString(entree)){
                perror("Erreur pendant le parsing des questions");
            }
            tests[i].entree[j] = entree->valuestring;
            j++;
        }

        tests[i].maxtime = maxtime->valueint;
        tests[i].maxmemory = maxmemory->valueint;
        i++;
    }
    exo.tests = tests;

    free(jsoncontent);

    return exo;
}

// Libère la mémoire de la structure EXERCICE
void disposeExercice(EXERCICE exercice){
    int i;
    for(i = 0; i < exercice.numberOfTests; i++){
        free(exercice.tests[i].entree);
        free(exercice.tests[i].sortie);
    }

    free(exercice.tests);
    cJSON_Delete(exercice.json);
}

// Termine le programme en cas d'erreur
void exitWithError(EXERCICE exercice, const char* error_message){
    perror(error_message);
    disposeExercice(exercice);
    exit(EXIT_ERROR);
}


// Termine le programme en ayant réussi tout les tests
void exitWithSuccess(EXERCICE exercice){
    disposeExercice(exercice);
    exit(EXIT_SUCCESS);
}

// Termine le programme à cause d'un test qui a échoué
void exitWithFailure(EXERCICE exercice){
    disposeExercice(exercice);
    exit(EXIT_FAILURE);
}

// Libère le resultat lu dans le programme fils
void freeResult(char** result, int numberOfElements){
    int i;

    for(i = 0; i < numberOfElements; i++){
        free(result[i]);
    }

    free(result);
}

// Tue le processus fils en cas de timeout
void alarm_handler(int sig) {
    kill(child_pid, SIGKILL);
}

int main(){
    int wstatus, status, success;
    int inputFiledes[2], outputFileDes[2];
    const char r = '\r';
    char** result;
    char buffer[4096];
    int i, j, n, k, nbOfValue, nbOfCharacter;
    ssize_t count;
    pid_t pid;

    // On récupère l'exercice
    EXERCICE exercice = getExercice("/volume/pcr/test.json");

    // On itère sur les tests à faire passer
    for(i = 0; i < exercice.numberOfTests; i++){
        k = 0;
        nbOfValue = 0;
        // On créé un pipe 
        if(pipe(inputFiledes) == -1){
            exitWithError(exercice, "Pipe error");
        }

        if(pipe(outputFileDes) == -1){
            exitWithError(exercice, "Pipe error");
        }

        // On fork pour créé un processus fils
        pid = fork();

        // On garde en mémoire le PID du fils
        child_pid = pid;
        if(pid == -1){
            exitWithError(exercice, "Fork error");
        }
        else if(pid == 0){
            // On duplique l'entrée du pipe à la sortie standard du processus fils
            while((dup2(outputFileDes[1], STDOUT_FILENO) == -1) && (errno == EINTR)) {}

            // On duplique la sortie du pipe à l'entrée standard du processus fils
            while((dup2(inputFiledes[0], STDIN_FILENO) == -1) && (errno == EINTR)) {}

            // On ferme les pipes
            close(outputFileDes[1]);
            close(outputFileDes[0]);
            close(inputFiledes[1]);
            close(inputFiledes[0]);

            // On remplace le code du processus fils par le programme de l'utilisateur
            execl("/volume/pcr/program", "program", (char*) NULL);
            exitWithError(exercice, "Execv error");
        }
        else{
            // On écrit les entrées du programmes dans le pipe
            for(j = 0; j < exercice.tests[i].numberOfEntrees; j++){
                if(write(inputFiledes[1], exercice.tests[i].entree[j], (strlen(exercice.tests[i].entree[j]) ) * sizeof(char)) == -1 || write(inputFiledes[1], &r , 1) == -1){
                    exitWithError(exercice, "Write error");
                }
            }

            // On bind la alarm_handler au signal SIGALRM
            signal(SIGALRM, alarm_handler);

            // On lance une alarme à la fin du temps imparti
            alarm(exercice.tests[i].maxtime);

            // On attend la fin du precessus fils
            waitpid(pid, &wstatus, 0);

            // On fait échoué le test si le fils s'est fait tué par son père
            if(wstatus == 9){
                printf("Test numero %d/%d : Timeout\n", i+1, exercice.numberOfTests);
                exitWithFailure(exercice);
            }

            // En cas d'erreur dans le programme fils, on quitte le programme
            status = WEXITSTATUS(wstatus);
            if(status != 0){
                exitWithError(exercice, "Program failed");
            }

            while(1){

                // Lit les données du pipe
                count = read(outputFileDes[0], buffer, sizeof(buffer));

                // On ferme les pipes
                close(outputFileDes[1]);
                close(outputFileDes[0]);
                close(inputFiledes[1]);
                close(inputFiledes[0]);

                // En cas d'erreur de lecture, on quitte le programme
                if(count == -1){
                    if(errno == EINTR){
                        continue;
                    }
                    else{
                        if(nbOfValue != 0){
                            freeResult(result, nbOfValue);
                        }
                        exitWithError(exercice, "Read error");
                    }
                }
                else{
                    // On compte le nombre de sorties
                    for(j = 0; j < count; j++){
                        if(buffer[j] == '\n'){
                            nbOfValue++;
                        }
                    }
                    // On alloue la mémoire en fonction du nombre de sorties
                    result = malloc(sizeof(char*) * nbOfValue);
                    nbOfCharacter = 0;

                    // On stocke les sorties dans un tableau
                    for(j = 0; j < count; j++){
                        if(buffer[j] == '\n'){
                            result[k] = malloc(sizeof(char) * (nbOfCharacter + 1));
                            for(n = 0; n < nbOfCharacter; n++){
                                result[k][n] = buffer[j - nbOfCharacter + n];
                            }
                            result[k][n] = '\0';
                            nbOfCharacter = 0;
                            k++;
                        }
                        else{
                            nbOfCharacter++;
                        }
                    }
                    break;
                }
            }

            // On vérifie les résultats avec la sortie attendue
            success = 0;
            if(k == exercice.tests[i].numberOfSorties){
                success = 1;
                for(j = 0; j < k ; j++){
                    printf("Sortie attendue : %s\n", exercice.tests[i].sortie[j]);
                    printf("Sortie lue : %s\n", result[j]);
                    if(strcmp(result[j], exercice.tests[i].sortie[j]) != 0){
                        success = 0;
                    }
                }
            }

            // On libère la mémoire des résultats
            freeResult(result, k);

            // Si un test échoue, on quitte le programme sinon on continue
            if(success){
                printf("Test numero %d/%d : Success\n", i+1, exercice.numberOfTests);
            }
            else{
                printf("Test numero %d/%d : Failure\n", i+1, exercice.numberOfTests);
                exitWithFailure(exercice);
            }
        } 
    }
    exitWithSuccess(exercice);
}