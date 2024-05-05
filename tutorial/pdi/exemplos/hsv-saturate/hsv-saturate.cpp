#include <iostream>
#include <opencv2/opencv.hpp>
#include <vector>
#include "camera.hpp" 

std::vector<cv::Mat> planes;
int slider;
int slider_max = 100;

float alfa;

void on_trackbar_blend(int, void*){
  alfa = (double) 2*slider/slider_max-1;
}

int main(int, char**){
  cv::VideoCapture cap; 
  cv::Mat frame, hsv, old_h, new_h, frame_hsv, v, concatena;
  int camera;

  camera = cameraEnumerator();
  cap.open(camera);
  if(!cap.isOpened()){  
    return -1;
  }
  cap.set(cv::CAP_PROP_FRAME_WIDTH, 640);
  cap.set(cv::CAP_PROP_FRAME_HEIGHT, 480);
  
  cv::namedWindow("image", cv::WINDOW_NORMAL);
  cv::resizeWindow("image", 1280, 480);

  slider = slider_max/2;
  cv::createTrackbar("Saturation", "image", &slider, slider_max, on_trackbar_blend);

  for(;;){
    cap >> frame;
    cv::cvtColor(frame, frame_hsv, cv::COLOR_BGR2HSV_FULL);
    cv::split (frame_hsv, planes);
    planes[1] = planes[1]*(1+alfa);
    cv::merge(planes, hsv);
    cv::cvtColor(hsv, hsv, cv::COLOR_HSV2BGR_FULL);
    cv::hconcat(frame, hsv, concatena);
    cv::imshow("image", concatena);
    if(cv::waitKey(30) >= 0) break;
  }
  return 0;
}
