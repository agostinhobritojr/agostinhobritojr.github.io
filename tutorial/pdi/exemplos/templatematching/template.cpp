#include <iostream>
#include <vector>
#include <cmath>
#include <opencv2/opencv.hpp>

int main(int argc, char* argv[]) {
  cv::Mat cena, detalhe;
  cv::Point minLoc, maxLoc;
  double minVal, maxVal;
  
  cena = cv::imread(argv[1], cv::IMREAD_GRAYSCALE);
  detalhe = cv::imread(argv[2], cv::IMREAD_GRAYSCALE);
  
  cv::Mat result(cena.rows - detalhe.rows + 1, cena.cols - detalhe.cols + 1, CV_32FC1);

  cv::matchTemplate(cena, detalhe, result, cv::TM_CCORR_NORMED);
  cv::minMaxLoc(result, &minVal, &maxVal, &minLoc, &maxLoc, cv::Mat());

  std::cout << "Encontrado em: " << maxLoc.x << ", " << maxLoc.y << std::endl;
  cv::Rect roiRect(maxLoc.x, maxLoc.y, detalhe.cols, detalhe.rows);
  cv::cvtColor(cena, cena, cv::COLOR_GRAY2BGR);
  cv::rectangle(cena, roiRect, cv::Scalar(255, 0, 0), 4);
  cv::imwrite("resultado.png", cena);
}

