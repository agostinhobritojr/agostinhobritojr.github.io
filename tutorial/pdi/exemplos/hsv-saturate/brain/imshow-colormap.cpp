#include <stdio.h>
#include <stdlib.h>

#include <iostream>
#include <opencv2/opencv.hpp>
#include <sstream>
#include <vector>

using namespace cv;
using namespace std;

std::vector<Mat> images;
int top_slider = 108;
int top_slider_max = 108;

int range_slider = 0;
int range_slider_max = 65000;
int nlevels = 1000;

int minGlobal = 65000, maxGlobal = 0, minRange=0, maxRange=100;
double maxLocal, minLocal;

std::vector<cv::Vec3b> makeColorMap(int low, int high) {
  std::vector<cv::Vec3b> colormap;
  double diff = high-low;
  for (int i = low; i < high; i++) {
    cv::Vec3b color;
    color[0] = 128+127*sin((i-low)*2*M_PI/diff);
    color[1] = 128-127*sin((i-low)*2*M_PI/diff+M_PI/2);
    color[2] = 128-127*sin((i-low)*2*M_PI/diff);
    colormap.push_back(color);
  //  std::cout << color << std::endl;
  }
//  std::cout << colormap.size() << std::endl;
  return colormap;
}

void on_trackbar_show(int, void *) {
  Mat tmp;
  int result;
  int range;
  std::vector<cv::Vec3b> colormap;

  cv::minMaxLoc(images[top_slider], &minLocal, &maxLocal);
  std::cout << top_slider << ": minLocal: " << minLocal << " maxLocal: " << maxLocal << std::endl;
  range = maxGlobal-minGlobal;

  colormap = makeColorMap(minLocal, maxLocal);

  if(range == 0) range = 1;
  tmp = Mat(images[top_slider].rows, images[top_slider].cols, CV_8UC3, cv::Scalar(0));
  for (int i = 0; i < tmp.rows; i++) {
    for (int j = 0; j < tmp.cols; j++) {
      tmp.at<Vec3b>(i, j) = colormap[images[top_slider].at<short int>(i, j)-minLocal];
    }
  }
  cv::imshow("janela", tmp);
}


int main(int argc, char **argv) {
  Mat image(256, 256, CV_16UC1);
  unsigned short int *data;

  data = (unsigned short int *)malloc(256 * 256 * sizeof(unsigned short int));

  images.clear();

  namedWindow("janela", cv::WINDOW_NORMAL);

  for (int i = 1; i <= 109; i++) {
    Mat tmp;
    std::stringstream ss;
    std::string filename;
    ss.str("");
    ss.fill('0');
    ss << "MRbrain." << std::setw(3) << i;
    filename = ss.str();
    FILE *fp = fopen(filename.c_str(), "rb");

    fread(data, 1, 2 * 256 * 256, fp);
    for (int j = 0; j < 256 * 256; j++) {
      data[j] = (data[j] << 8) | (data[j] >> 8);
    }

    memcpy(image.data, data, 256 * 256 * sizeof(unsigned short int));
    fclose(fp);

    try {
      images.push_back(image.clone());
    } catch (cv::Exception &e) {
      std::cout << "Error: " << e.what() << std::endl;
    }

    cv::minMaxLoc(image, &minLocal, &maxLocal);
    if (minLocal < minGlobal) minGlobal = minLocal;
    if (maxLocal > maxGlobal) maxGlobal = maxLocal;
  }
  free(data);
  std::cout << "range: " << minGlobal << " - " << maxGlobal << std::endl;

  for (size_t i = 0; i < images.size(); i++) {
  //  cv::normalize(images[i], images[i], 0, 65000.0, cv::NORM_MINMAX, CV_16UC1);
  }

  char TrackbarName[50];
  sprintf(TrackbarName, "Slice");

  createTrackbar(TrackbarName, "janela", &top_slider, top_slider_max,
                 on_trackbar_show);
  on_trackbar_show(top_slider, 0);
  sprintf(TrackbarName, "Min");

  waitKey();

  return 0;
}
