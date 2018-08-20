#include <iostream>

using namespace std;

class Base{
public:
  Base(int a){
    cout << "Construtor da classe Base: " << a << "\n";
  }
};

class Intermediaria : public Base{
public:
  Intermediaria(int a) : Base(a-1){
    cout << "Construtor da classe Intermediaria: " << a << "\n";
  }
};

class Derivada : public Intermediaria{
public:
  Derivada(int a) : Intermediaria(a-1){
    cout << "Construtor da classe Derivada: " << a << "\n";
  }
};

int main(void){
  Derivada d(3);
}
