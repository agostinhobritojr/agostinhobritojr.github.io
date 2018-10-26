#include <iostream>

using namespace std;

class Alo{
  int x;
public:
  Alo(int _x=0){ 
    cout << "construtor default\n";
    x= _x;
    print();
  }
  Alo(Alo &a){
    cout << "construtor copia\n";
    x = a.x;
    print();
  }
  void print(){
    cout << "x = " << x << "\n";
  }
};

int main(void){
  Alo x;
  Alo y(1);
  Alo z = x;
  Alo w = y;
  Alo k(y); // mesmo que Alo k = y; !
}
