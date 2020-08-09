#include <iostream>

using namespace std;

class Vetor2d{
  float x, y;
public:
  Vetor2d(float x_=0, float y_=0);
  void print();
};

Vetor2d::Vetor2d(float x_, float y_){
    x=x_; y=y_;
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
