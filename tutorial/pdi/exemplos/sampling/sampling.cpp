#include <cstdlib>
#include <ctime>
#include <fstream>
#include <iostream>
#include <opencv2/opencv.hpp>

#include "camera.hpp"

int main(int argc, char** argv) {
  cv::Mat image;
  int camera;
  cv::VideoCapture cap;

  int histw = 256;

  int histh = 200;

  int key;

  camera = cameraEnumerator();

  cap.open(camera, cv::CAP_V4L2);

  if (!cap.isOpened()) {
    std::cout << "cameras indisponiveis";
    return -1;
  }

  cap.set(cv::CAP_PROP_FRAME_WIDTH, 320);
  cap.set(cv::CAP_PROP_FRAME_HEIGHT, 240);
  cap.set(cv::CAP_PROP_FPS, 15);

  cv::Mat plot(histh, histw, CV_8UC1, cv::Scalar(0));
  cv::Mat histogram(histw, 1, CV_32FC1, cv::Scalar(0));
  cv::Mat histogramNorm;

  unsigned char pixelValue;

  int nrand = 32;

  cv::Vec3b pixel;

  std::srand(std::time(0));

  while (1) {
    cap >> image;
    for (int i = 0; i < nrand; i++) {
      pixelValue = 0;
      for (int j = 0; j < 8; j++) {
        pixel = image.at<cv::Vec3b>(rand() % image.rows, rand() % image.cols);
        pixelValue = (pixelValue << 1) | (pixel[0] & 0x01);
      }
      histogram.at<float>(pixelValue)++;
    }

    cv::normalize(histogram, histogramNorm, 0, histogram.rows, cv::NORM_MINMAX,
                  -1, cv::Mat());

    plot.setTo(cv::Scalar(0));

    for (int i = 0; i < histw; i++) {
      cv::line(plot, cv::Point(i, histh),
               cv::Point(i, histh - cvRound(histogramNorm.at<float>(i))),
               cv::Scalar(255), 1, 8, 0);
    }

    cv::imshow("sampling", plot);
    key = cv::waitKey(30);
    if (key == 27) break;
  }

  for (int i = 0; i < histw; i++) {
    std::cout << (int)histogram.at<float>(i) << std::endl;
  }

  std::ofstream out("histogram.txt");
  for (int i = 0; i < histw; i++) {
    out << histogram.at<float>(i) << std::endl;
  }

  return 0;
}
