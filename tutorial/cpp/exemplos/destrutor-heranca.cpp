#include <iostream>

using namespace std;

class Base{
public:
  ~Base(){
    cout << "Destrutor da classe Base\n";
  }
};

class Intermediaria : public Base{
public:
  ~Intermediaria(){
    cout << "Destrutor da classe Intermediaria\n";
  }
};

class Derivada : public Intermediaria{
public:
  ~Derivada(){
    cout << "Destrutor da classe Derivada\n";
  }
};

int main(void){
  Derivada d;
}
