#include <iostream>
#include <opencv2/opencv.hpp>
#include <vector>
#include "camera.hpp" 

int main(int, char**){
  cv::VideoCapture cap; 
  cv::Mat frame, hsv, h, s, v;
  std::vector<cv::Mat> planes;
  int camera;
  double min, max;

  camera = cameraEnumerator();
  
  cap.open(camera);
  if(!cap.isOpened()){  
    return -1;
  }
  cap.set(cv::CAP_PROP_FRAME_WIDTH, 320);
  cap.set(cv::CAP_PROP_FRAME_HEIGHT, 240);
  
  cv::namedWindow("image", cv::WINDOW_NORMAL);
  for(;;){
    cap >> frame;
    cv::imshow("image", frame);
    cv::cvtColor(frame, frame, cv::COLOR_BGR2HSV_FULL);
    cv::split (frame, planes);
    cv::applyColorMap(planes[0], h, cv::COLORMAP_HSV);
    cv::cvtColor(planes[1], s, cv::COLOR_GRAY2BGR);
    cv::cvtColor(planes[2], v, cv::COLOR_GRAY2BGR);
    cv::hconcat(h, s, hsv);
    cv::hconcat(hsv, v, hsv);
    cv::imshow("hsv", hsv);
    if(cv::waitKey(30) >= 0) break;
  }
  return 0;
}
