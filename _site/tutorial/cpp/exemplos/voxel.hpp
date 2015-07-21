#ifndef CELL_H
#define CELL_H
typedef struct{
    int r,g,b,a;
    bool exists;
    // R,G,B,A : [0,1]
    // A=0 : transparente
    // A=1 : opaco
    // exists: true ou false
} Voxel;
#endif // CELL_H
