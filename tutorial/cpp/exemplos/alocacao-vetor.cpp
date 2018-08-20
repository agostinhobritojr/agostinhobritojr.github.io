#include <iostream>

using namespace std;

int main(void){
  int *x, n=10;
  x = new int[n];
  for(int i=0; i<n; i++){
	x[i]=i;
  }
  delete [] x;
}
