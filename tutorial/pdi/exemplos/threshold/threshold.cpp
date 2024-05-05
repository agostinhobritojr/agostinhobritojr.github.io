#include <iostream>
#include <opencv2/opencv.hpp>

int main(int argc, char** argv) {
  cv::Mat image, image1;

  image = imread(argv[1], cv::IMREAD_GRAYSCALE);

  if (!image.data) {
    std::cout << "imagem nao carregou corretamente\n";
    return (-1);
  }

  cv::threshold(image, image1, 1, 255, cv::THRESH_BINARY + cv::THRESH_OTSU);

  cv::imshow("original", image);
  cv::imshow("otsu", image1);
  cv::imwrite("otsu.png", image1);

  cv::waitKey();
  return 0;
}
