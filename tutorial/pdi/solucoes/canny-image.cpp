#include <iostream>
#include <opencv2/opencv.hpp>
#include <fstream>
#include <iomanip>
#include <numeric>
#include <vector>
#include <ctime>
#include <cstdlib>

using namespace std;
using namespace cv;

#define MAXRADIUS 5

int main(int argc, char** argv){
  Mat image, imagepoint, frame, frameH, frameV; 
  Mat frame32f, frameok;

  vector<int> yrange;
  vector<int> xrange;

  int MAXITER=5;
  int depth, radius;
  
  ofstream fout;

  Mat result, zeros;
  int width, height;
  double min, max;
  char key;

  srand(time(0));
  
  image= imread(argv[1],CV_LOAD_IMAGE_GRAYSCALE);
  
  if(!image.data){
	cout << "nao abriu" << argv[1] << endl;
    cout << argv[0] << " imagem.jpg";
  }

  width=image.size().width;
  height=image.size().height;

  xrange.resize(height);
  yrange.resize(width);
  
  iota(xrange.begin(), xrange.end(), 0); 
  iota(yrange.begin(), yrange.end(), 0);

  image.copyTo(frameok);
  
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
  for(int i=0; i<256; i++){
    fout << std::dec;
    fout << "0 " << i+32 << " #";
    fout << std::hex;
    fout << setw(2) << setfill('0') << i;
    fout << setw(2) << setfill('0') << i;
    fout << setw(2) << setfill('0') << i;
    fout << endl;
  }
  fout << std::dec;

  image.copyTo(imagepoint);

  random_shuffle(xrange.begin(), xrange.end());
  
  for(auto i : xrange){
    random_shuffle(yrange.begin(), yrange.end());
    for(auto j : yrange){
      int gray = image.at<uchar>(i,j);
      circle(imagepoint,cv::Point(j+rand()%3-2,i+rand()%3-2),5,CV_RGB(gray,gray,gray),-1, CV_AA);
    }
  }

        
  for(int k=MAXITER; k>=0; k--){
    Canny(frameok, frame32f, (MAXITER-k+1)*10, (MAXITER-k+1)*30);
    normalize(frame32f, frame32f, 0.0, 1.0, NORM_MINMAX);
    frame32f.convertTo(frame,CV_8U);
    depth = k+50;
    radius = (k+1)*100;

    for(auto i : xrange){
      random_shuffle(yrange.begin(), yrange.end());
      for(auto j : yrange){
        int gray = image.at<uchar>(i,j);
        if(frame.at<uchar>(i,j) > 0 && rand()%MAXITER >= k){
          //circle(imagepoint,cv::Point(j+rand()%(k+1)-k-1,i+rand()%(k+1)-k-1),k+1,CV_RGB(gray,gray,gray),-1, CV_AA);
          circle(imagepoint,cv::Point(j,i),k+1,CV_RGB(gray,gray,gray),-1, CV_AA);
          fout << "1 3 0 0 0 ";
          fout << image.at<uchar>(i,j)+32 << " ";
          fout << depth;
          fout << " -1 20 0.000 1 0.0000 ";
          fout << j*100 << " " << i*100 << " ";
          fout << radius << " " << radius;
          fout << " " << j*100 << " " << j*100 << " ";
          fout << j*100+radius << " " << j*100 << endl;
        }
      }
    }
  }
  fout.close();
  imwrite("saida.png", imagepoint);
  return 0;
}
