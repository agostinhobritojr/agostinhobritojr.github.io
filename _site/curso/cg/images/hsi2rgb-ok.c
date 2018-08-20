#include <iostream>
#include <math.h>

float scale;

using std::cout;

void hsi2rgb(float h, float s, float i, float &r, float &g, float &b){
  if((h>=0) && (h<120)){
    b = i * (1 - s)*2.0/3.0;
    r = i * (1 + s*cos(h*scale)/cos((60-h)*scale))*2.0/3.0;
    g = 1 - (r + b);
  }
  else if((h>=120) && (h<240)){
    h = h - 120;
    r = i *(1 - s)*2.0/3.0;
    g = i *(1 + s*cos(h*scale)/cos((60-h)*scale))*2.0/3.0;
    b = 1 - (r+ g);
  }
  else{
    h = h - 240;
    g = i *(1 - s)*2.0/3.0;
    b = i *(1 + s*cos(h*scale)/cos((60-h)*scale))*2.0/3.0;
    r = 1 - (g + b);
  }
  return;
}

int main(void){
  int nsteps;
  float h, s, i, r,g,b;
  int R, G, B;
  s = 1;
  i = 0.5;
  nsteps = 180;
  scale = 3.1415/180.0;
  std::cout << "COFF\n";
  std::cout << nsteps+1 << " " << nsteps << " 0 \n";
  for(int k=0; k<nsteps; k++){
    h = k*360.0/nsteps;
    hsi2rgb(h, s, i, r, g, b);
    R = (int)floor(255*r);
    G = (int)floor(255*g);
    B = (int)floor(255*b);
    cout << cos(h*scale) << " " << sin(h*scale) <<  " 0 " << r << " " << g << " " << b << " 1 \n";
  }
  cout << "0 0 0 0.5 0.5 0.5 1\n";
  for(int k=0; k<nsteps-1; k++){
    cout << 3 << " " << k+1 << " " << k << " " <<  nsteps << "\n";
  }
  cout << 3 << " " << nsteps-1 << " " << " 0 " <<  nsteps << "\n";
}
