#include <iostream>

using namespace std;

template <class Tipo>
Tipo media(Tipo a, Tipo b){
  Tipo resultado;
  resultado = (a+b)/2;
  return (resultado);
}

int main(void){
  int ix, iy;
  float fx, fy;
  double dx, dy;
  ix = 3; iy = 4;
  fx = 3; fy = 4;
  dx = 3; dy = 4;
  cout << media<int>(ix,iy) << "\n";
  cout << media<float>(fx,fy) << "\n";
  cout << media<double>(dx,dy) << "\n";
}
