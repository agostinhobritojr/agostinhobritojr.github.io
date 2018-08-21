#ifndef VOXEL_H
#define VOXEL_H

// Estrutura de um voxel
typedef struct{
    int r,g,b,a;
    bool exists;
    // R,G,B,A : [0,1]
    // A=0 : transparente
    // A=1 : opaco
    // exists: true ou false
} Voxel;

// Estrutura de coordenadas
// (usado para leitura do arquivo VECT)
typedef struct{
    int x,y,z;
    bool exists;
} VoxelCoords;
#endif // VOXEL_H
