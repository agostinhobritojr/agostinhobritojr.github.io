#include <iostream>

using namespace std;

class Vetor2d{
  float x, y;
public:
  Vetor2d(float _x=0, float _y=0);
  void print();
};

Vetor2d::Vetor2d(float _x, float _y){
    x=_x; y=_y;
}

void Vetor2d::print(){
  cout << "(" << x << "," << y << ")";
}

int main(void){
  Vetor2d v(3,4);
  v.print();
  cout << endl;
  return 0;
}
