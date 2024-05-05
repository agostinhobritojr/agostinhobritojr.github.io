#include <iostream>
#include <opencv2/opencv.hpp>

int main(int argc, char** argv) {
  cv::Mat image, erosao, dilatacao, abertura, fechamento, abertfecha;
  cv::Mat str;

  if (argc != 2) {
    std::cout << "morfologia entrada saida\n";
  }

  image = cv::imread(argv[1], cv::IMREAD_UNCHANGED);

//  image = cv::imread(argv[1], -1);
  
  if(image.empty()) {
    std::cout << "Erro ao carregar a imagem: " << argv[1] << std::endl;
    return -1;
  }

  // elemento estruturante
  str = cv::getStructuringElement(cv::MORPH_RECT, cv::Size(3, 3));
  // erosao
  cv::erode(image, erosao, str);
  // dilatacao
  cv::dilate(image, dilatacao, str);
  // abertura
  cv::morphologyEx(image, abertura, cv::MORPH_OPEN, str);
  // fechamento
  cv::morphologyEx(image, fechamento, cv::MORPH_CLOSE, str);
  // abertura -> fechamento
  cv::morphologyEx(abertura, abertfecha, cv::MORPH_CLOSE, str);
  
  cv::Mat matArray[] = {erosao, dilatacao, abertura, fechamento, abertfecha};
  cv::hconcat(matArray, 5, image);

  cv::imshow("morfologia", image);

  cv::waitKey();
  return 0;
}
