#include <opencv2/opencv.hpp>

int main() {
  // Define the four source points
  std::vector<cv::Point2f> srcPoints;
  srcPoints.push_back(cv::Point2f(36, 62));
  srcPoints.push_back(cv::Point2f(329, 34));
  srcPoints.push_back(cv::Point2f(493, 264));
  srcPoints.push_back(cv::Point2f(98, 368));

  float area;
  int lado;

  int largura, altura;
  largura = cv::max(
    cv::norm(srcPoints[0] - srcPoints[1]), 
    cv::norm(srcPoints[2] - srcPoints[3]));

  altura = cv::max(
    cv::norm(srcPoints[1] - srcPoints[2]), 
    cv::norm(srcPoints[3] - srcPoints[0]));

  std::cout << "largura: " << largura << std::endl;
  std::cout << "altura: " << altura << std::endl;

  area = cv::contourArea(srcPoints);
  lado = sqrt(area);

  // Define the four destination points
  std::vector<cv::Point2f> dstPoints;
  dstPoints.push_back(cv::Point2f(0, 0));
  dstPoints.push_back(cv::Point2f(largura, 0));
  dstPoints.push_back(cv::Point2f(largura, altura));
  dstPoints.push_back(cv::Point2f(0, altura));

  // Calculate the perspective transformation matrix
  cv::Mat perspectiveMatrix = cv::getPerspectiveTransform(srcPoints, dstPoints);

  // Apply the perspective correction to an image
  cv::Mat image = cv::imread("orca.jpg");
  cv::Mat correctedImage;
  cv::warpPerspective(image, correctedImage, perspectiveMatrix, cv::Size(largura, altura));

  // Display the original and corrected images
  cv::imshow("Original Image", image);
  cv::imshow("Corrected Image", correctedImage);
  cv::waitKey(0);

  return 0;
}