#include <iostream>
#include <opencv2/opencv.hpp>
#include <fstream>
#include <algorithm>
#include <chrono>
#include <random>

int main(int argc, char** argv){
  cv::Mat image;
  cv::Mat hist;

  std::ofstream histfileoriginal("histogram-original.txt");
  std::ofstream histfilesorted("histogram-sorted.txt");
  std::ofstream histfileshuffled("histogram-shuffled.txt");

  int nbins = 256;
  float range[] = {0, 255};
  const float *histrange = { range };
  bool uniform = true;
  bool acummulate = false;

  image = cv::imread(argv[1], cv::IMREAD_GRAYSCALE);
  
  if(!image.data){
    std::cout << "Nao abriu imagem\n";
    return -1;
  }

  cv::calcHist(&image, 1, 0, cv::Mat(), hist, 1, &nbins, &histrange, uniform, acummulate);
  for(int i = 0; i < nbins; i++){
    histfileoriginal << hist.at<float>(i) << std::endl;
  }

  cv::Mat imagesorted = image.clone();

  std::qsort(imagesorted.data, imagesorted.rows * imagesorted.cols, sizeof(uchar), [](const void *a, const void *b){
    return *(uchar*)a - *(uchar*)b;
  });
  cv::calcHist(&imagesorted, 1, 0, cv::Mat(), hist, 1, &nbins, &histrange, uniform, acummulate);
  for(int i = 0; i < nbins; i++){
    histfilesorted << hist.at<float>(i) << std::endl;
  }

  cv::Mat imageshuffled = image.clone();

  std::vector<uchar> pixels(imageshuffled.data, imageshuffled.data + imageshuffled.total());
  
  unsigned seed = std::chrono::system_clock::now().time_since_epoch().count();
  std::shuffle(pixels.begin(), pixels.end(), std::default_random_engine(seed));
  std::copy(pixels.begin(), pixels.end(), imageshuffled.data);

  cv::calcHist(&image, 1, 0, cv::Mat(), hist, 1, &nbins, &histrange, uniform, acummulate);
  for(int i = 0; i < nbins; i++){
    histfileshuffled << hist.at<float>(i) << std::endl;
  }

  cv::hconcat(image, imagesorted, image);
  cv::hconcat(image, imageshuffled, image);

  cv::imshow("Imagem Original, Ordenada e Embaralhada", image);
  cv::waitKey();

  return 0;
}
