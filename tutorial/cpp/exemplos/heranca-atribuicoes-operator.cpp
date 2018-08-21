class Base{
  int a, b;
public:
  void foo(int x, int y){
    a = x; b = y;
  }
};

class Derivada : public Base{
  int c;
public:
  Derivada& operator=(Base &x){
    a = x.getA(); 
    b = x.getB();
    c = 0;
  }
  void bar(int z){
    c = z;
  }
};

int main(void){
  Base b;
  Derivada d;
  b = d;
  d = b; //OK! Parte indefinida de "d" agora é tratada
}
