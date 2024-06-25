#include <chrono>
#include <iostream>
#include <opencv2/opencv.hpp>

int main(int argc, char* argv[]) {
  cv::Mat dist;
  cv::Mat bw;
  cv::Mat src;
  cv::Mat dist_8u;
  cv::Mat distance;
  cv::Mat background;
  double min, max;
  int numComponents;

  src = cv::imread(argv[1], cv::IMREAD_COLOR);
  if (!src.data) {
    return -1;
  }

  cv::namedWindow("Segmentacao de Otsu", cv::WINDOW_NORMAL);
  cv::namedWindow("Marcadores Interiores", cv::WINDOW_NORMAL);
  cv::namedWindow("Marcadores de Fundo", cv::WINDOW_NORMAL);
  cv::namedWindow("Watershed", cv::WINDOW_NORMAL);
  cv::namedWindow("Watershed Lines", cv::WINDOW_NORMAL);
  cv::namedWindow("Transformada Distancia", cv::WINDOW_NORMAL);

  cv::cvtColor(src, bw, cv::COLOR_BGR2GRAY);
  cv::threshold(bw, bw, 0, 255,
                cv::THRESH_BINARY + cv::THRESH_OTSU + cv::THRESH_BINARY_INV);

  cv::distanceTransform(bw, dist, cv::DIST_L2, 3);
  dist.convertTo(distance, CV_8U);
  cv::minMaxLoc(dist, &min, &max);
  cv::threshold(dist, dist, max * 0.65, 255, cv::THRESH_BINARY);

  dist.convertTo(dist_8u, CV_8U);

  cv::Mat markers = cv::Mat::zeros(dist.size(), CV_32SC1);

  numComponents = cv::connectedComponents(dist_8u, markers, 8);

  cv::Mat interior_markers = src.clone();
  cv::Mat bg_markers = src.clone();

  cv::bitwise_not(bw, bw);
  cv::erode(bw, background, cv::Mat(), cv::Point(-1, -1), 2);

  for (int i = 0; i < background.rows; i++) {
    for (int j = 0; j < background.cols; j++) {
      if (background.at<uchar>(i, j) > 0) {
        bg_markers.at<cv::Vec3b>(i, j) = cv::Vec3b(255, 0, 0);
        markers.at<int>(i, j) = INT32_MAX;
      }
      if (dist_8u.at<uchar>(i, j) == 255) {
        interior_markers.at<cv::Vec3b>(i, j) = cv::Vec3b(0, 255, 0);
      }
    }
  }

  cv::watershed(src, markers);

  std::vector<cv::Vec3b> colors;
  std::srand(time(0));

  for (int i = 0; i < numComponents; i++) {
    uchar b = std::rand() % 256;
    uchar g = std::rand() % 256;
    uchar r = std::rand() % 256;
    colors.push_back(cv::Vec3b((uchar)b, (uchar)g, (uchar)r));
  }

  cv::Mat watershed_result = cv::Mat::zeros(markers.size(), CV_8UC3);
  cv::Mat watershed_markers = cv::Mat::zeros(src.size(), CV_8UC3);

  for (int i = 0; i < markers.rows; i++) {
    for (int j = 0; j < markers.cols; j++) {
      int index = markers.at<int>(i, j);
      if (index > 0 && index <= numComponents)
        watershed_result.at<cv::Vec3b>(i, j) = colors[index - 1];
      else {
        watershed_result.at<cv::Vec3b>(i, j) = cv::Vec3b(0, 0, 0);
        watershed_markers.at<cv::Vec3b>(i, j) = cv::Vec3b(255, 255, 255);
      }
    }
  }

  cv::bitwise_not(bw, bw);

  cv::imshow("Segmentacao de Otsu", bw);
  cv::imshow("Marcadores Interiores", interior_markers);
  cv::imshow("Marcadores de Fundo", bg_markers);
  cv::imshow("Watershed", watershed_result);
  cv::imshow("Watershed Lines", watershed_markers);
  cv::imshow("Transformada Distancia", distance);

  cv::imwrite("watershed-otsu.png", bw);
  cv::imwrite("watershed-background-markers.png", background);
  cv::imwrite("watershed-background-markers-color.png", bg_markers);
  cv::imwrite("watershed-interior-markers.png", interior_markers);
  cv::imwrite("watershed-lines.png", watershed_markers);
  cv::imwrite("watershed-output.png", watershed_result);
  cv::imwrite("watershed-distancia.png", distance);

  cv::waitKey(0);
  return 0;
}
