#include <iostream>

using namespace std;

class Vetor2d{
private:
  float x, y;
public:
  void setX(float x_){
	x = x_;
  }
  float getX(void){
	return x;
  }
  void setY(float y_){
	y = y_;
  }
  float getY(void){
	return y;
  }
};

int main(void){
  Vetor2d v1;
  v1.setX(4.5);
  v1.setY(-1.3);
  cout << v1.getX() << " " << v1.getY() << "\n";
}
