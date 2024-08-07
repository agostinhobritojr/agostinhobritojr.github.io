#include <iostream>

using namespace std;

template <class T>
class Vetor2d{
private:
  T x, y;
public:
  void setX(T x_){
	x = x_;
  }
  T getX(void){
	return x;
  }
  void setY(T y_);
  T getY(void);
};

template <class T>
void Vetor2d<T>::setY(T y_){
  y = y_;
}

template <class T>
T Vetor2d<T>::getY(void){
  return y;
}

int main(void){
  Vetor2d<float> v1;
  Vetor2d<int> v2;
  v1.setX(4.5);  v1.setY(-1.3);
  v2.setX(4.5);  v2.setY(-1.3);
  cout << v1.getX() << " " << v1.getY() << "\n";
  cout << v2.getX() << " " << v2.getY() << "\n";
}
