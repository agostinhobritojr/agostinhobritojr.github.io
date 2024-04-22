#include <iostream>
#include <opencv2/opencv.hpp>
#include <vector>

int main(int argc, char** argv){
  cv::Mat mtb1, mtb2, mtb3, comb;
  cv::Mat max;
  std::vector<cv::Mat> images;
  mtb1 = cv::imread("align1.jpg");
  mtb2 = cv::imread("align2.jpg");
  cv::bitwise_xor(mtb1, mtb2, max);
  cv::imshow("max1", max);
  images.push_back(mtb1);
  images.push_back(mtb2);
  cv::Ptr<cv::AlignMTB> alignMTB = cv::createAlignMTB();
  alignMTB->process(images, images);
  cv::bitwise_xor(images[0], images[1], max);
  cv::imshow("max2", max);
  cv::waitKey();
  return 0;
}
