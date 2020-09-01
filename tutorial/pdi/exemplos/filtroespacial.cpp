#include <iostream>
#include <opencv2/opencv.hpp>
#include "camera.hpp"

void printmask(cv::Mat &m){
  for(int i=0; i<m.size().height; i++){
    for(int j=0; j<m.size().width; j++){
      std::cout << m.at<float>(i,j) << ",";
    }
    std::cout << "\n";
  }
}

int main(int, char**){
  cv::VideoCapture video; // open the default camera
  float media[] = {0.1111,0.1111,0.1111,
				   0.1111,0.1111,0.1111,
				   0.1111,0.1111,0.1111};
  float gauss[] = {1,2,1,
				   2,4,2,
				   1,2,1};
  float horizontal[]={-1,0,1,
					  -2,0,2,
					  -1,0,1};
  float vertical[]={-1,-2,-1,
					0,0,0,
					1,2,1};
  float laplacian[]={0,-1,0,
					 -1,4,-1,
					 0,-1,0};
  
  float boost[]={0,-1,0,
				 -1,5.2,-1,
				 0,-1,0};
  
  cv::Mat cap, frame, frame32f, frameFiltered;
  cv::Mat mask(3,3,CV_32F), mask1(3,3,CV_32F);
  cv::Mat result, result1;
  double width, height, min, max;
  int absolut;
  char key;
  int camera;

  camera = cameraEnumerator();
  video.open(camera);
  if(!video.isOpened())  // check if we succeeded
    return -1;
  width=video.get(cv::CAP_PROP_FRAME_WIDTH);
  height=video.get(cv::CAP_PROP_FRAME_HEIGHT);
  std::cout << "largura=" << width << "\n";;
  std::cout << "altura =" << height<< "\n";;
  std::cout << "fps    =" << video.get(cv::CAP_PROP_FPS) << "\n";
  std::cout << "format =" << video.get(cv::CAP_PROP_FORMAT) << "\n";

  cv::namedWindow("filtroespacial", cv::WINDOW_NORMAL);
  cv::namedWindow("original", cv::WINDOW_NORMAL);

  mask = cv::Mat(3,3,CV_32F,media);

  absolut=1; // calcs abs of the image

  for(;;){
    video >> cap; // get a new frame from camera
	cv::cvtColor(cap, frame, cv::COLOR_BGR2GRAY);
	cv::flip(frame,frame,1);
	cv::imshow("original",frame);
    frame.convertTo(frame32f, CV_32F);
    filter2D(frame32f,
			 frameFiltered,
			 frame32f.depth(),
			 mask,
			 cv::Point(1,1),
			 0);
    if(absolut){
      frameFiltered=abs(frameFiltered);
    }

    //std::cout << max << "\n";
    frameFiltered.convertTo(result,CV_8U);

	cv::imshow("filtroespacial", result);

    key = (char) cv::waitKey(10);
    if( key == 27 ) break; // esc pressed!
    switch(key){
    case 'a':
      absolut=!absolut;
      break;
    case 'm':
      mask = cv::Mat(3,3,CV_32F,media);
      printmask(mask);
      break;
    case 'g':
      mask = cv::Mat(3,3,CV_32F,gauss);
      printmask(mask);
      break;
    case 'h':
      mask = cv::Mat(3,3,CV_32F,horizontal);
      printmask(mask);
      break;
    case 'v':
      mask = cv::Mat(3,3,CV_32F,vertical);
      printmask(mask);
      break;
    case 'l':
      mask = cv::Mat(3,3,CV_32F,laplacian);
      printmask(mask);
      break;
    case 'b':
      mask = cv::Mat(3,3,CV_32F,boost);
      break;
    default:
      break;
    }
  }

  return 0;
}
