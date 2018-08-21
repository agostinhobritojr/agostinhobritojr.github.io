#include <iostream>

using namespace std;

class Alo{
public:
  Alo(){
    cout << "Construtor de Alo\n";
  }
  ~Alo(){
    cout << "Destrutor de Alo\n";
  }
};

int main(void){
  Alo x, y;
}
