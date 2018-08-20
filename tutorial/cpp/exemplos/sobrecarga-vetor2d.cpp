#include <iostream>

using namespace std;

class Vetor2d{
private:
  float x, y;
public:
  Vetor2d(float _x=0, float _y=0);
  Vetor2d operator+(Vetor2d v);
  Vetor2d operator-(Vetor2d v);
  Vetor2d operator*(float a);
  float   operator*(Vetor2d v);
};

Vetor2d::Vetor2d(float _x, float _y){
  x=_x; y=_y;
}

Vetor2d Vetor2d::operator+(Vetor2d v){
  return(Vetor2d(x+v.x,y+v.y));
}

Vetor2d Vetor2d::operator-(Vetor2d v){
  return(Vetor2d(x-v.x,y-v.y));
}

Vetor2d Vetor2d::operator*(float a){
  return(Vetor2d(a*x,a*y));  
}
float Vetor2d::operator*(Vetor2d v){
  return(x*v.x+y*v.y);
}

int main(void){
  Vetor2d v1(2,3), v2(-2,5), v3(6,-3), v4(1,1), v5;
  float x;
  v5 = v1 + v2 - v3*4.0;
  x = v5*v4;
  cout << "x = " << x << "\n";
}
