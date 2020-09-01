#include <iostream>
#include <cstdio>
#include <opencv2/opencv.hpp>

double alfa;
int alfa_slider = 0;
int alfa_slider_max = 100;

int top_slider = 0;
int top_slider_max = 100;

cv::Mat image1, image2, blended;
cv::Mat imageTop; 

char TrackbarName[50];

void on_trackbar_blend(int, void*){
 alfa = (double) alfa_slider/alfa_slider_max ;
 cv::addWeighted(image1, 1-alfa, imageTop, alfa, 0.0, blended);
 cv::imshow("addweighted", blended);
}

void on_trackbar_line(int, void*){
  image1.copyTo(imageTop);
  int limit = top_slider*255/100;
  if(limit > 0){
    cv::Mat tmp = image2(cv::Rect(0, 0, 256, limit));
    tmp.copyTo(imageTop(cv::Rect(0, 0, 256, limit)));
  }
  on_trackbar_blend(alfa_slider,0);
}

int main(int argvc, char** argv){
  image1 = cv::imread("blend1.jpg");
  image2 = cv::imread("blend2.jpg");
  image2.copyTo(imageTop);
  cv::namedWindow("addweighted", 1);
  
  std::sprintf( TrackbarName, "Alpha x %d", alfa_slider_max );
  cv::createTrackbar( TrackbarName, "addweighted",
                      &alfa_slider,
                      alfa_slider_max,
                      on_trackbar_blend );
  on_trackbar_blend(alfa_slider, 0 );
  
  std::sprintf( TrackbarName, "Scanline x %d", top_slider_max );
  cv::createTrackbar( TrackbarName, "addweighted",
                      &top_slider,
                      top_slider_max,
                      on_trackbar_line );
  on_trackbar_line(top_slider, 0 );

  cv::waitKey(0);
  return 0;
}
