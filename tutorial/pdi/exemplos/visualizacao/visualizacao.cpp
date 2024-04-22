#include <iostream>
#include <fstream>
#include <string>
#include <opencv2/opencv.hpp>

using namespace cv;

int main(int argc, char** argv){
  Mat image;
  std::ofstream file;

  image = imread(argv[1],cv::IMREAD_GRAYSCALE);
  if(!image.data){
    std::cout << "imagem nao carregou corretamente\n";
    return(-1);
  }
  file.open("image.txt");
  for(int j=0; j<image.rows; j++){
    for(int i=0; i<image.cols; i++){
      file << (int)(image.at<uchar>(j,i)) << " ";
    }
    file << "\n";
  }
  file.close();
  file.open("line.txt");
  for(int i=0; i<image.cols; i++){
    file << (int)(image.at<uchar>(image.rows/2,i)) << "\n";
  }
  file.close();
  return 0;
}

