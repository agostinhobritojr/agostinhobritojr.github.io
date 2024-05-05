#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main(int, char**){
  Mat image, gray;

  image= imread("bolhas.png",CV_LOAD_IMAGE_COLOR);
  if(!image.data)
    cout << "nao abriu bolhas.png" << endl;
  
  cvtColor(image, gray, COLOR_BGR2GRAY);
  threshold(gray, gray, 1, 255, THRESH_BINARY+THRESH_OTSU);
  
  // Find all objects of interest
  vector<vector<Point> > contours;
  vector<Vec4i> hierarchy;
  findContours(gray, contours, hierarchy, CV_RETR_EXTERNAL, CV_CHAIN_APPROX_NONE);
  for (size_t i = 0; i < contours.size(); i++){
	drawContours(image, contours, i, CV_RGB(255, 0, 0), 1, 8, hierarchy, 0);
  }
  // For each object
  /*  for (size_t i = 0; i < contours.size(); i++){
	for (size_t j = 0; j < contours[i].size(); j++){
	  arrx.at<float>(j) = contours[i][j].x;
	  arry.at<float>(j) = contours[i][j].y;
	}
	}*/
  imshow("janela", image);  
  waitKey();
  return 0;
}
