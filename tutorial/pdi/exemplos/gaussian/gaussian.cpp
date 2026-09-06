#include <iostream>
#include <opencv2/opencv.hpp>

int main(int argc, char **argv) {
  cv::Mat image, filterbox, filtergauss;
  cv::Mat mask(3, 3, CV_32F);
  cv::Mat result;

  int SIZE = 31;

  image = cv::imread(argv[1], cv::IMREAD_GRAYSCALE);

  cv::blur(image, filterbox, cv::Size(SIZE, SIZE), cv::Point(-1, -1));

  cv::imshow("filterbox", filterbox);

  cv::GaussianBlur(image, filtergauss, cv::Size(2 * SIZE + 1, 2 * SIZE + 1), 0);

  cv::imshow("filtergauss", filtergauss);
  cv::waitKey(0);
  return 0;
}
