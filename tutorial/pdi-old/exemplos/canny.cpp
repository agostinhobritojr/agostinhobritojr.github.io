#include <iostream>
#include "opencv2/opencv.hpp"

int top_slider = 10;
int top_slider_max = 200;

char TrackbarName[50];

cv::Mat image, border;

void on_trackbar_canny(int, void*){
  cv::Canny(image, border, top_slider, 3*top_slider);
  cv::imshow("Canny", border);
}

int main(int argc, char**argv){
  image= cv::imread(argv[1], cv::IMREAD_GRAYSCALE);
  
  sprintf( TrackbarName, "Threshold inferior", top_slider_max );

  cv::namedWindow("Canny",1);
  cv::createTrackbar( TrackbarName, "Canny",
                &top_slider,
                top_slider_max,
                on_trackbar_canny );

  on_trackbar_canny(top_slider, 0 );

  cv::waitKey();
  cv::imwrite("cannyborders.png", border);
  return 0;
}
