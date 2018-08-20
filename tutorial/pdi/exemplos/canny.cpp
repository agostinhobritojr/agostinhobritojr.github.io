#include <iostream>
#include "opencv2/opencv.hpp"

using namespace std;
using namespace cv;

int top_slider = 10;
int top_slider_max = 200;

char TrackbarName[50];

Mat image, border;

void on_trackbar_canny(int, void*){
  Canny(image, border, top_slider, 3*top_slider);
  imshow("canny", border);
}

int main(int argc, char**argv){
  int width, height;

  image= imread(argv[1],CV_LOAD_IMAGE_GRAYSCALE);
  
  width=image.size().width;
  height=image.size().height;

  sprintf( TrackbarName, "Threshold inferior", top_slider_max );

  namedWindow("canny",1);
  createTrackbar( TrackbarName, "canny",
                &top_slider,
                top_slider_max,
                on_trackbar_canny );

  on_trackbar_canny(top_slider, 0 );

  waitKey();
  imwrite("cannyborders.png", border);
  return 0;
}
