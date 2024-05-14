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

void on_trackbar_show(int, void *) {
  Mat tmp;
  int result;
  int range;
  range = maxRange-minRange;
  if(range == 0) range = 1;
  tmp = Mat(images[top_slider].rows, images[top_slider].cols, CV_8UC1, cv::Scalar(0));
  for (int i = 0; i < tmp.rows; i++) {
    for (int j = 0; j < tmp.cols; j++) {
      if (
        images[top_slider].at<short int>(i, j) > minRange &&
        images[top_slider].at<short int>(i, j) < maxRange) {
          result = 255.0/range*(images[top_slider].at<short int>(i, j) - minRange);
          tmp.at<uchar>(i, j) = result;
      }
    }
  }
  cv::imshow("janela", tmp);
}

void on_trackbar_minRange(int, void *) {
  on_trackbar_show(range_slider, 0);
  if(minRange >= maxRange){
    minRange = maxRange-1;
    setTrackbarPos("Min", "janela", minRange);
  }
}

void on_trackbar_maxRange(int, void *) {
  on_trackbar_show(range_slider, 0);
  if(maxRange <= minRange){
    maxRange = minRange+1;
    setTrackbarPos("Max", "janela", maxRange);
  }
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

  createTrackbar(TrackbarName, "janela", &minRange, maxGlobal-1,
                 on_trackbar_minRange);
  setTrackbarMin("Min", "janela", minGlobal);
  setTrackbarPos("Min", "janela", minGlobal);

  on_trackbar_maxRange(range_slider, 0);
  sprintf(TrackbarName, "Max");
  createTrackbar(TrackbarName, "janela", &maxRange, maxGlobal,
                 on_trackbar_maxRange);
  setTrackbarMin("Max", "janela", minGlobal+1);
  setTrackbarPos("Max", "janela", maxGlobal);

  waitKey();

  return 0;
}
