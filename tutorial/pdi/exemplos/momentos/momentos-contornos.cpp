#include <iostream>
#include <fstream>
#include <opencv2/opencv.hpp>

int main(int argc, char** argv){
  cv::Mat image, gray;
  std::ofstream file;
  cv::Moments mom;

  image= cv::imread(argv[1], cv::IMREAD_GRAYSCALE);

  if(!image.data){
    std::cout << "nao abriu " << argv[1] << std::endl;
    return 0;
  }
  
  file.open("moments.txt");

  cv::threshold(image, image, 1, 255, cv::THRESH_BINARY + cv::THRESH_OTSU);

  // calculate negative
  cv::bitwise_not(image, image);
  
  // Find all objects of interest
  std::vector< std::vector<cv::Point> > contours;
  std::vector< cv:: Vec4i> hierarchy;

  cv::findContours(image, contours, hierarchy, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_NONE);

//  cv::Mat arrx(1, contours[0].size(), CV_32F);
//  cv::Mat arry(1, contours[0].size(), CV_32F);
  
  cv::cvtColor(image, image, cv::COLOR_GRAY2BGR);

  int nshapes = 0;

  // For each object
  for (size_t i = 0; i < contours.size(); i++){
    // Calculate the moments
    std::cout << i << " " << contours[i].size() << std::endl;
    if(contours[i].size() < 100){
      continue;
    }
    nshapes++;
    mom = cv::moments(contours[i]);
    // Calculate the center of mass
    cv::Point2f center(mom.m10/mom.m00, mom.m01/mom.m00);
    // Draw a circle in the center of mass
    // cv::circle(image, center, 5, cv::Scalar(0, 0, 255), -1);
    // draw text with the object number
    // Write the moments to a file
/*    file << "Objeto " << i << std::endl;
    file << "Area: " << mom.m00 << std::endl;
    file << "Centro de massa: " << center << std::endl;
    file << "Momentos: " << std::endl;
    file << "m00: " << mom.m00 << std::endl;
    file << "m01: " << mom.m01 << std::endl;
    file << "m10: " << mom.m10 << std::endl;
    file << "m11: " << mom.m11 << std::endl;
    file << "m02: " << mom.m02 << std::endl;
    file << "m20: " << mom.m20 << std::endl;
    file << "m12: " << mom.m12 << std::endl;
    file << "m21: " << mom.m21 << std::endl;
    file << "m03: " << mom.m03 << std::endl;
    file << "m30: " << mom.m30 << std::endl;*/

    double hu[7];
    cv::HuMoments(mom, hu);
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
  std::cout << "Numero de objetos: " << nshapes << std::endl;
  file.close();
/*  for (size_t i = 0; i < contours.size(); i++){
    for (size_t j = 0; j < contours[i].size(); j++){
      arrx.at<float>(j) = contours[i][j].x;
      arry.at<float>(j) = contours[i][j].y;
    }
	}*/

  cv::imshow("janela", image);  
  cv::waitKey();
  return 0;
}
