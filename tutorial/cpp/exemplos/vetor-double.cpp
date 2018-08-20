#include <iostream>

using namespace std;

class Vetor2dDouble{
private:
  double x, y;
public:
  void setX(double _x){
	x = _x;
  }
  double getX(void){
	return x;
  }
  void setY(double _y){
	y = _y;
  }
  double getY(void){
	return y;
  }
};

int main(void){
  Vetor2d v1;
  v1.setX(4.5);
  v1.setY(-1.3);
  cout << v1.getX() << " " << v1.getY() << "\n";
}
