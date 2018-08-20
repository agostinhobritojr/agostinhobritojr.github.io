#ifndef POLIGONO_HPP
#define POLIGONO_HPP
class Poligono{
  Ponto pos; // posicao do poligono
  int nvert; // numero de vertices
  Ponto *vert; // posicoes dos vertices
public:
  // Constroi poligono com nvert vertices.
  // Os vertices sao alocados dinamicamente
  Poligono(int a);
  void add(Ponto p){
    static int count=0;
    vert[count]=p;
    count++;
  }
  // calcula a area
  double area(void);
  // Incrementa as posições dos vertices do
  // poligono para +(a,b)
  void move(double a, double b);
  // Incrementa as posições dos vertices do
  // poligono para +a
  void move(Ponto a);
  // Rotaciona o poligono de teta graus
  // no sentido horario em torno da
  // posicao de origem do poligono
  void rot(double teta);
  // Imprime as coordenadas do poligono
  // na forma (x0,y0)->(x1,y1)->...->(xn,yn)
  void print(void);
}
#endif
