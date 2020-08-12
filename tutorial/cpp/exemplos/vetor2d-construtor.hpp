#ifndef VETOR2D_HPP
#define VETOR2D_HPP

class Vetor2d{
private:
  float x, y;
public:
  Vetor2d(float x_=0, float y_=0){
    x=x_; y=y_;
  }
  void setX(float x_);
  float getX(void);
  void setY(float y_);
  float getY(void);
};

#endif
