#include <iostream>
#include "opencv2/opencv.hpp"
#include <fstream>

using namespace std;
using namespace cv;

int top_slider = 10;
int top_slider_max = 200;

char TrackbarName[50];

void on_trackbar_line(int, void*){
}

int main(int, char**){
  VideoCapture video; // open the default camera

  Mat cap, frame, frame32f, frameH, frameV, frameok;

  ofstream fout;

  
  Mat result, zeros;
  int width, height;
  double min, max;
  int absolut, boost;
  char key;
  
  video.open(0);
  if(!video.isOpened()){  
    cout << "nao abriu a camera\n";
    return -1;
  }
  video >> cap;
  width=cap.size().width;
  height=cap.size().height;
  zeros = Mat::zeros(height, width, CV_32F);

  sprintf( TrackbarName, "Alpha x %d", top_slider_max );

  namedWindow("canny",1);
  createTrackbar( TrackbarName, "canny",
                &top_slider,
                top_slider_max,
                on_trackbar_line );

  on_trackbar_line(top_slider, 0 );
  
  for(;;){
    video >> cap;
    cvtColor(cap, frame, CV_BGR2GRAY);
    flip(frame,frame,1);
    imshow("original",frame);
    frame.copyTo(frameok);
    Canny(frameok, frame32f, top_slider, 3*top_slider);
    imshow("canny", frame32f);
    key = (char) waitKey(10);
    if( key == 27 ) break;
  }
  normalize(frame32f, frame32f, 0.0, 1.0, NORM_MINMAX);
  frame32f.convertTo(frame,CV_8U);
  fout.open("saida.fig");
  fout << "#FIG 3.2  Produced by xfig version 3.2.5c" << endl;
  fout << "Landscape" << endl;
  fout << "Center" << endl;
  fout << "Metric" << endl;
  fout << "A4" << endl;      
  fout << "100.00" << endl;
  fout << "Single" << endl;
  fout << "-2" << endl;
  fout << "1200 2" << endl;
  for(int i=0; i<height; i++){
    for(int j=0; j<width; j++){
      if(frame32f.at<uchar>(i,j) > 0){
        fout << "1 3 0 1 0 7 50 -1 -1 0.000 1 0.0000 ";
        fout << j*100 << " " << i*100 << " 100  100 " << j*100 << " " << j*100 << " ";
        fout << j*100+100 << " " << j*100 << endl;
      }
    }
  }
  fout.close();
  return 0;
}
