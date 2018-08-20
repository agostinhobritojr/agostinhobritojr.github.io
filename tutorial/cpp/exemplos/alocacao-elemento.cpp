#include <iostream>

using namespace std;

int main(void){
  int *x;
  x = new int;
  *x = 3; // ou x[0] = 3;
  delete x;
}
