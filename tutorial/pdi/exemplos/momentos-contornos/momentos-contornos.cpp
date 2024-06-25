#include <iostream>
#include <fstream>
#include <opencv2/opencv.hpp>

int main(int argc, char** argv){
  cv::Mat image, gray;
  std::ofstream file;
  cv::Moments momentos;

  image= cv::imread(argv[1], cv::IMREAD_GRAYSCALE);

  if(!image.data){
    std::cout << "nao abriu " << argv[1] << std::endl;
    return 0;
  }
  
  file.open("momentos.txt");

  cv::threshold(image, image, 1, 255, cv::THRESH_BINARY + cv::THRESH_OTSU + cv::THRESH_BINARY_INV);

  std::vector< std::vector<cv::Point> > contours;
  std::vector< cv:: Vec4i> hierarchy;

  cv::findContours(image, contours, hierarchy, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_NONE);

  cv::cvtColor(image, image, cv::COLOR_GRAY2BGR);

  int nformas = 0;

  for (size_t i = 0; i < contours.size(); i++){
    if(contours[i].size() < 10){
      continue;
    }
    nformas++;
    momentos = cv::moments(contours[i]);

    cv::Point2f center(momentos.m10/momentos.m00, momentos.m01/momentos.m00);

    double hu[7];
    cv::HuMoments(momentos, hu);
    if(hu[0] > 0)
    {
      cv::drawContours(image, contours, i, cv::Scalar(0, 0, 255), 2);
    }
    else{
      cv::drawContours(image, contours, i, cv::Scalar(0, 255, 0), 2);
    }
    cv::putText(image, std::to_string(i), center, cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 0, 0), 8);
    cv::putText(image, std::to_string(i), center, cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(255, 255, 255), 1);

    file << i << ", ";
    for (int j = 0; j < 7; j++){
      hu[j] = -1 * copysign(1.0, hu[j]) * log10(abs(hu[j]));
      file << hu[j] << ", ";
    }
    file << std::endl;
	}
  std::cout << "Numero de objetos: " << nformas << std::endl;
  file.close();

  cv::imshow("janela", image);  
  cv::imwrite("contornos-rotulados.png", image);
  cv::waitKey();
  return 0;
}
