#include <iostream>
#include <opencv2/opencv.hpp>
#include <vector>

int main(int argc, char** argv){
  cv::Mat mtb1, mtb2, mtb3;
  std::vector<cv::Mat> images;
  mtb1 = cv::imread("mtb1.jpg");
  mtb2 = cv::imread("mtb2.jpg");
  mtb3 = cv::imread("mtb3.jpg");
  images.push_back(mtb1);
  images.push_back(mtb2);
  images.push_back(mtb3);
  cv::Ptr<cv::AlignMTB> alignMTB = cv::createAlignMTB();
  alignMTB->process(images, images);
  cv::imshow("mtb1", images[0]);
  cv::imshow("mtb2", images[1]);
  cv::imshow("mtb3", images[2]);
  cv::waitKey();
  return 0;
}
