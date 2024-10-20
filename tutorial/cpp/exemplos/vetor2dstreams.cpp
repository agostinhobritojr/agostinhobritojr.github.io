#include <iostream>

using namespace std;

class Vetor2d{
  float x, y;
public:
  Vetor2d(float x_=0, float y_=0);
  friend ostream& operator<<(ostream& os, Vetor2d &v);
  friend istream& operator>>(istream& is, Vetor2d &v);
};

Vetor2d::Vetor2d(float x_, float y_){
    x=x_; y=y_;
}

ostream& operator<<(ostream& os, Vetor2d &v){
  os << "(" << v.x << "," << v.y << ")";
  return os;
}

istream& operator>>(istream& is, Vetor2d &v){
  is >> v.x >> v.y;
  return is;
}

int main(void){
  Vetor2d v(3,4);
  cout << "Digite os valores das componentes x e y do vetor: ";
  cin >> v;
  cout << v << endl;
  return 0;
}
