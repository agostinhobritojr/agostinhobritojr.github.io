#include <iostream>
#include <opencv2/opencv.hpp>
#include <vector>

int main(int argc, char** argv){
  cv::Mat image;
  cv::Mat hsv, rgb, h, s, v;

  std::vector<cv::Mat> planes;
  int camera;
  double min, max;

  if(argc != 2){
    std::cerr << "Uso: " << argv[0] << " <Image_Path>\n";
    return -1;
  }

  image = cv::imread(argv[1], cv::IMREAD_COLOR);

  if (!image.data) {
    std::cerr << "Nao abriu " << argv[1] << std::endl;
    return -1;
  }

  cv::namedWindow("image", cv::WINDOW_NORMAL);
  cv::imshow("image", image);

  cv::split (image, planes);
  cv::hconcat(planes[0], planes[1], rgb);
  cv::hconcat(rgb, planes[2], rgb);
  cv::imshow("rgb", rgb);
  
  cv::cvtColor(image, image, cv::COLOR_BGR2HSV_FULL);
  cv::split (image, planes);
  cv::hconcat(planes[0], planes[1], hsv);
  cv::hconcat(hsv, planes[2], hsv);
  cv::imshow("hsv", hsv);

  cv::applyColorMap(planes[0], h, cv::COLORMAP_HSV_FULL);
  cv::imshow("h", h);

  cv::waitKey();
}
