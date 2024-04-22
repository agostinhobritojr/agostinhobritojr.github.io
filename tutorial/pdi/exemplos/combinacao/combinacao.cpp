#include <iostream>
#include <opencv2/opencv.hpp>

int main(int argc, char** argv) {
  cv::Mat image1, image2, comb;
  cv::Mat img_add, img_sub, img_max, img_min;
  cv::Mat img_addweighted, img_and, img_or, img_not, img_xor;
  cv::Vec3b val;

  if (argc != 3){
    std::cout << "Usage: " << argv[0] << " <imagem1> <imagem2>" << std::endl;
    return -1;
  }

  image1 = cv::imread(argv[1], cv::IMREAD_GRAYSCALE);
  image2 = cv::imread(argv[2], cv::IMREAD_GRAYSCALE);

  if (!image1.data){
    std::cout << "nao abriu " << argv[1] << std::endl;
    return 0;
  } 

  if (!image2.data){
    std::cout << "nao abriu " << argv[2] << std::endl;
    return 0;
  }

  // compare se as imagens tem o mesmo tamanho
  if (image1.size() != image2.size()) {
    std::cout << "As imagens devem ter o mesmo tamanho" << std::endl;
    return 0;
  }

  cv::hconcat(image1, image2, comb);
  cv::imshow("imagens", comb);

  // operacoes aritmeticas
  img_add = image1 + image2;
  img_sub = cv::abs(image1 - image2);
  img_max = cv::max(image1, image2);
  img_min = cv::min(image1, image2);
  cv::addWeighted(image1, 1, image2, 0.3, 0, img_addweighted);

  // concatenando as imagens
  cv::hconcat(img_add, img_sub, comb);
  cv::hconcat(comb, img_max, comb);
  cv::hconcat(comb, img_min, comb);
  cv::hconcat(comb, img_addweighted, comb);
  cv::imshow("aritmeticas", comb);

  // operacoes logicas
  cv::bitwise_and(image1, image2, img_and);
  cv::bitwise_or(image1, image2, img_or);
  cv::bitwise_not(image1, img_not);
  cv::bitwise_xor(image1, image2, img_xor);

  // concatenando as imagens
  cv::hconcat(img_and, img_or, comb);
  cv::hconcat(comb, img_not, comb);
  cv::hconcat(comb, img_xor, comb);
  cv::imshow("logicas", comb);

  cv::waitKey();
  return 0;
}
