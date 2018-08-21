#include <iostream>

using namespace std;

class Base{
public:
  Base(){
    cout << "Construtor da classe Base\n";
  }
};

class Intermediaria : public Base{
public:
  Intermediaria(){
    cout << "Construtor da classe Intermediaria\n";
  }
};

class Derivada : public Intermediaria{
public:
  Derivada(){
    cout << "Construtor da classe Derivada\n";
  }
};

int main(void){
  Derivada d;
}
