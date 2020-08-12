#include <iostream>
#include <cv.h>
#include <highgui.h>

using namespace cv;
using namespace std;

int main(int, char**){
  Mat image;
  image= imread("bolhas.png",CV_LOAD_IMAGE_GRAYSCALE);
  if(!image.data)
    cout << "nao abriu bolhas.png" << endl;

  namedWindow("janela",WINDOW_AUTOSIZE);

  for(int i=200;i<210;i++){
    for(int j=10;j<200;j++){
      image.at<uchar>(i,j)=0;
    }
  }
  
  imshow("janela", image);  
  waitKey();

  image= imread("bolhas.png",CV_LOAD_IMAGE_COLOR);

  Vec3b val;
  val[0] = 255;   //B
  val[1] = 0;   //G
  val[2] = 0; //R
  
  for(int i=200;i<210;i++){
    for(int j=10;j<200;j++){
      image.at<Vec3b>(i,j)=val;
    }
  }

  imshow("janela", image);  
  waitKey();
  return 0;
}
