#ifndef ESCULTOR_HPP
#define ESCULTOR_HPP
#include <string>
#include <vector>
#include "voxel.h"

using namespace std;

enum {OFF, VECT}; // identifica o tipo de arquivo para salvamento
enum {XY,ZX,YZ}; // identifica o plano a ser recuperado

class Escultor{
private:
  Voxel ***v; // array que armazena o bloco 3d
  float lado; // metade da largura de um cubo
  float delta; // distancia entre os cubos
  int r,g,b,a;
  int nx, ny, nz; // dimensoes do cubo em x,y,z
  int i, x, y, z; // variaveis auxiliares
public:
  // construtor da classe
  Escultor(int _nx=1, int _ny=1, int _nz=1);

  // destrutor da classe
  ~Escultor();

  // aloca nova matriz para guardar a escultura
  void alocaRecursos();

  // libera matriz alocada 
  void liberaRecursos();
  
  // insere um paralelepipedo com vertices extremos opostos pela diagonal
  // iguais a (x0, y0, z0) e (x1, y1, z1)
  void botaCaixa(int x0, int x1, int y0, int y1, int z0, int z1);
  int sizeX();
  int sizeY();
  int sizeZ();

  // insere um elipsoide com centro em (x0, y0, z0) e raios rx, ry, rz
  void botaElipse(int x0, int y0, int z0, int rx, int ry, int rz);
  
  // insere uma esfera com centro em (x0, y0, z0) e raio r
  void botaEsfera(int x0, int y0, int z0, int rr);

  // insere um voxel em (x0, y0, z0)
  void botaVoxel(int x0, int y0, int z0);

  // remove um paralelepipedo com vertices extremos opostos pela diagonal
  // iguais (x0, y0, z0) e (x1, y1, z1)
  void tiraCaixa(int x0, int x1, int y0, int y1, int z0, int z1);

  // remove um elipsoide com centro em (x0, y0, z0) e raios rx, ry, rz
  void tiraElipse(int x0, int y0, int z0, int rx, int ry, int rz);

  // remove uma esfera com centro em (x0, y0, z0) e raio r
  void tiraEsfera(int x0, int y0, int z0, int rr); 

  // remove um voxel em (x0, y0, z0)
  void tiraVoxel(int x0, int y0, int z0);

  // grava o modelo criado no arquivo "nome" no formato OFF
  void gravaOFF(string nome);

  // grava o modelo criado no arquivo "nome" no formato VECT
  void gravaVECT(string nome);

  // le o modelo presente no arquivo "nome" no formato VECT
  void leVECT(string nome);

  // remove os voxels totalmente rodeados, pois nao serao vistos
  // no visualizador, alem de consumirem recursos para exibicao
  void limpaVoxels(void);

  // define o espacamento entre os cubos do bloco
  void setDelta(float _delta);

  // define a cor de desenho
  void setColor(int _r, int _g, int _b, int _a);

  // faz o bloco assumir a união do bloco atual com
  // o bloco representado no escultor "e"
  // a uniao somente deve ocorrer se os dois blocos
  // forem do mesmo tamanho
  void uniao(Escultor &e);

  // faz o bloco assumir a interesecao do bloco atual com
  // o bloco representado no escultor "e"
  // a intersecao somente deve ocorrer se os dois blocos
  // forem do mesmo tamanho
  void intersecao(Escultor &e);

  // faz o bloco assumir a diferenca entre bloco atual
  // e o bloco representado no escultor "e"
  // a diferenca somente deve ocorrer se os dois blocos
  // forem do mesmo tamanho
  void diferenca(Escultor &e);

  // recupera uma matriz de voxels referente a posicao fornecida no
  // plano informado
  vector< vector<Voxel> > getPlano(int i, int plano=XY);
};
#endif
