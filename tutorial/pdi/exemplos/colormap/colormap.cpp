#include <opencv2/opencv.hpp>

int main(int argc, const char *argv[]){
  cv::Mat image, imagecolor;
  
  image = imread(argv[1], cv::IMREAD_GRAYSCALE);
  if(!image.data){
    std::cout << "nao abriu a imagem" << std::endl;
  }

  cv::applyColorMap(image, imagecolor, cv::COLORMAP_JET);
  cv::imshow("colormap_jet", imagecolor);
  cv::waitKey(0);
  return 0;
}
