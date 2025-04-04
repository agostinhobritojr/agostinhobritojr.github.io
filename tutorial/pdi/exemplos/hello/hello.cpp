#include <iostream>
#include <opencv2/opencv.hpp>

int main(int argc, char** argv) {
  cv::Mat image;
  image = cv::imread(argv[1], cv::IMREAD_GRAYSCALE);
  if (!image.data) {
    std::cout << "nao abriu" << argv[1] << std::endl;
  }
  std::cout << "tamanho: " << image.rows << "x" << image.cols << std::endl;
  cv::imshow("image", image);
  cv::waitKey();
  return 0;
}
