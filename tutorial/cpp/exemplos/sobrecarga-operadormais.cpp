#include <iostream>
#include <string>
using namespace std;

class Foo{
  float x;
  string nome;
public:
  Foo(string _nome, float _x){
	nome = _nome;
	x = _x;
  }
  Foo(){}
  Foo operator+(Foo b){
	Foo retorno;
	retorno.x = x + b.x;
	retorno.nome= nome + b.nome;
	return(retorno);
  }
  void print(){
	cout << nome << ":"  << x << endl;
  }
};

main(){
  Foo a("jose",3), b("maria",4), c;
  c = a + b;
  c.print();
}
