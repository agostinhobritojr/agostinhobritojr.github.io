#include <iostream>
#include "vetor2d.hpp"

using namespace std;

int main(void){
  Vetor2d v1;
  v1.setX(4.5);
  v1.setY(-1.3);
  cout << v1.getX() << " " << v1.getY() << "\n";
}
