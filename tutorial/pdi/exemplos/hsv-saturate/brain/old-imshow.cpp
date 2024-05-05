#include <iostream>
#include <opencv2/opencv.hpp>
#include <stdio.h>
#include <stdlib.h>

using namespace cv;
using namespace std;

int main(int argc, char** argv){
  Mat image(256, 256, CV_16UC1);
  double min, max;
  unsigned short int *data;
  short int swapped;

  FILE *fp = fopen("MRbrain.54", "rb");

  data = (unsigned short int *)malloc(256*256*sizeof(unsigned short int));
  fread(data, 1, 2*256*256, fp);
  for(int i = 0; i <256*256; i++){
    data[i] = (data[i] << 8) | (data[i] >> 8);
  }
  memcpy(image.data, data, 256*256*sizeof(unsigned short int));

/*
  fread(image.data, 1, 2*256*256, fp);
  for(int i = 0; i <256*256; i++){
    image.data[i] = (image.data[i] << 8) | (image.data[i] >> 8);
  }
*/

  fclose(fp);

  Mat test2 = imread("mrbrain-16bit054.tif", cv::IMREAD_ANYDEPTH);
  cout << test2.type() << endl;
  cout << test2.rows << endl;
  cout << test2.cols << endl;
  cout << test2.at<unsigned short>(100,100) << endl;
  //cout << data[100*256+100] << endl;

  cv::minMaxLoc(test2, &min, &max);
  std::cout << min << "x" << max << std::endl;

  cv::normalize(test2, test2, 0, 65000.0, cv::NORM_MINMAX, CV_16UC1);
  cv::normalize(image, image, 0, 65000.0, cv::NORM_MINMAX, CV_16UC1);

 // image.convertTo(test2, CV_8UC1);

  namedWindow("janela", cv::WINDOW_NORMAL);

  imshow("janela", test2);  

  namedWindow("janela2", cv::WINDOW_NORMAL);

  imshow("janela2", image);
  waitKey();
  
  return 0;
}
