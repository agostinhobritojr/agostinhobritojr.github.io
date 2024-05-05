#include <iostream>
#include <opencv2/cv.hpp>

using namespace cv;
using namespace std;

int incsat;
char TrackbarName[50];
int sat_slider = 255;
int sat_slider_max = 510;
Mat image, hsv, saturated;

void update();

void on_trackbar_blend(int, void*){
  incsat = 510*sat_slider/sat_slider_max-255;
  cout << "incsat = " << incsat << endl; 
 update();
}

void update(){
  int sat;
  cvtColor(image, hsv, CV_BGR2HSV);
  for(int i=0; i<image.rows; i++){
    for(int j=0; j<image.cols; j++){
	  sat = hsv.at<Vec3b>(i,j)[1];
	  sat = sat + incsat;
	  if(sat < 0) sat = 0;
	  if(sat > 255) sat = 255;
	  hsv.at<Vec3b>(i,j)[1] = sat;
	}
  }
  cvtColor(hsv, saturated, CV_HSV2BGR);
  imshow("saturated", saturated);
}

int main(int, char**){
  double width, height;
  Vec3b val;
 
  image= imread("sushi.jpg");
  if(!image.data)
    cout << "nao abriu saturate.png" << endl;

  namedWindow("original",WINDOW_AUTOSIZE);
  namedWindow("saturated",WINDOW_AUTOSIZE);

  incsat=50;
  
  imshow("original", image);

  sprintf( TrackbarName, "Alpha: -%d <-> %d", sat_slider_max/2, sat_slider_max/2 );
  createTrackbar( TrackbarName, "saturated",
				  &sat_slider,
				  sat_slider_max,
				  on_trackbar_blend );
  on_trackbar_blend(sat_slider, 0 );
  waitKey(0);
  return 0;
}
