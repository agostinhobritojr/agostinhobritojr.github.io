#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <numeric>
#include <opencv2/opencv.hpp>
#include <vector>

#define STEP 5
#define JITTER 3
#define RAIO 3

int main(int argc, char** argv) {
  std::vector<int> yrange;
  std::vector<int> xrange;

  cv::Mat image, frame, points;

  int width, height, gray;
  int x, y;

  image = cv::imread(argv[1], cv::IMREAD_GRAYSCALE);

  std::srand(std::time(0));

  if (image.empty()) {
    std::cout << "Could not open or find the image" << std::endl;
    return -1;
  }

  width = image.cols;
  height = image.rows;

  xrange.resize(height / STEP);
  yrange.resize(width / STEP);

  std::iota(xrange.begin(), xrange.end(), 0);
  std::iota(yrange.begin(), yrange.end(), 0);

  for (uint i = 0; i < xrange.size(); i++) {
    xrange[i] = xrange[i] * STEP + STEP / 2;
  }

  for (uint i = 0; i < yrange.size(); i++) {
    yrange[i] = yrange[i] * STEP + STEP / 2;
  }

  points = cv::Mat(height, width, CV_8U, cv::Scalar(255));

  std::random_shuffle(xrange.begin(), xrange.end());

  for (auto i : xrange) {
    std::random_shuffle(yrange.begin(), yrange.end());
    for (auto j : yrange) {
      x = i + std::rand() % (2 * JITTER) - JITTER + 1;
      y = j + std::rand() % (2 * JITTER) - JITTER + 1;
      gray = image.at<uchar>(x, y);
      cv::circle(points, cv::Point(y, x), RAIO, CV_RGB(gray, gray, gray),
                 cv::FILLED, cv::LINE_AA);
    }
  }
  cv::imwrite("pontos.jpg", points);
  return 0;
}
