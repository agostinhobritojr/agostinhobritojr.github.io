#include <iostream>
#include <math.h>

float scale;

using std::cout;

void hsi2rgb(float h, float s, float i, float &r, float &g, float &b){
  if((h>=0) && (h<120)){
    b = i * (1 - s);
    r = i * (1 + s*cos(h*scale)/cos((60-h)*scale));
    g = 3*i - (r + b);
  }
  else if((h>=120) && (h<240)){
    h = h - 120;
    r = i *(1 - s);
    g = i *(1 + s*cos(h*scale)/cos((60-h)*scale));
    b = 3*i - (r+ g);
  }
  else{
    h = h - 240;
    g = i *(1 - s);
    b = i *(1 + s*cos(h*scale)/cos((60-h)*scale));
    r = 3*i - (g + b);
  }
  return;
}

int main(void){
  int nsteps;
  float h, s, i, r,g,b, maxcor;
  int R, G, B;
  s = 1;
  i = 0.5;
  nsteps = 255;
  maxcor = 300;
  scale = 3.1415/180.0;
/*   std::cout << "COFF\n"; */
/*   std::cout << nsteps+1 << " " << nsteps << " 0 \n"; */
  for(int k=0; k<nsteps; k++){
    h = k*maxcor/nsteps;
    hsi2rgb(h, s, i, r, g, b);
    R = (int)floor(255*r);
    G = (int)floor(255*g);
    B = (int)floor(255*b);
    //    cout << cos(h*scale) << " " << sin(h*scale) <<  " 0 " << r << " " << g << " " << b << " 1 \n";
    cout << r << " " << g << " " << b << "\n";
  }
/*   cout << "0 0 0 0.5 0.5 0.5 1\n"; */
/*   for(int k=0; k<nsteps-1; k++){ */
/*     cout << 3 << " " << k+1 << " " << k << " " <<  nsteps << "\n"; */
/*   } */
/*   cout << 3 << " " << nsteps-1 << " " << " 0 " <<  nsteps << "\n"; */
}
