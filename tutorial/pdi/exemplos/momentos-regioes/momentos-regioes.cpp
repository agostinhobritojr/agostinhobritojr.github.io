#include <iostream>
#include <vector>
#include <cmath>
#include <opencv2/opencv.hpp>

int main(int argc, char* argv[]) {
  double huMoments[7];
  
  cv::Mat image = cv::imread(argv[1], cv::IMREAD_GRAYSCALE);

  cv::Moments moment = cv::moments(image, false);
  
  cv::HuMoments(moment, huMoments);

  for (int i = 0; i < 7; i++) {
    std::cout << huMoments[i] << ", ";
  }
  std::cout << std::endl;

  for (int i = 0; i < 7; i++) {
    huMoments[i] = -1 * std::copysign(1.0, huMoments[i]) * log10(abs(huMoments[i]));
  }

  for (int i = 0; i < 7; i++) {
    std::cout << huMoments[i] << ", ";
  }

  std::cout << std::endl;
  return 0;
}
