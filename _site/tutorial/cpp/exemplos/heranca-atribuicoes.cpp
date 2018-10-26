class Base{
protected:
  int a, b;
public:
  void foo(int x, int y){
    a = x; b = y;
  }
  int getA(void) { return a; }
  int getB(void) { return b; }
};

class Derivada : public Base{
  int c;
public:
  void bar(int z){
    c = z;
  }
};

int main(void){
  Base b;
  Derivada d;
  b = d;
  d = b; // Erro! "d" possui parte indefinida.
}
