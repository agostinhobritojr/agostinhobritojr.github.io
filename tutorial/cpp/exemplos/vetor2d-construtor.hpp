#ifndef VETOR2D_HPP
#define VETOR2D_HPP

class Vetor2d{
private:
  float x, y;
public:
  Vetor2d(float _x=0, float _y=0){
    x=_x; y=_y;
  }
  void setX(float _x);
  float getX(void);
  void setY(float _y);
  float getY(void);
};

#endif
