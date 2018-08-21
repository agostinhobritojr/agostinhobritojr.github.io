#include <iostream>
#include <cv.h>
#include <highgui.h>

using namespace cv;
using namespace std;

int main(int, char**){
  double width, height;
  Vec3b val;
  Mat image;

  image= imread("biel.png",CV_LOAD_IMAGE_GRAYSCALE);
  if(!image.data)
	cout << "nao abriu biel.png" << endl;

  namedWindow("janela",WINDOW_AUTOSIZE);

  val[0] = 0;   //B
  val[1] = 0;   //G
  val[2] = 255; //R
  
  Mat roi00a(image,Rect(0,
					   0,
					   image.rows/2,
					   image.cols/2));
  Mat roi01a(image,Rect(image.rows/2,
					   0,
					   image.rows/2,
					   image.cols/2));
  Mat roi10a(image,Rect(0,
					   image.cols/2,
					   image.rows/2,
					   image.cols/2));
  Mat roi11a(image,Rect(image.rows/2,
						image.cols/2,
						image.rows/2,
						image.cols/2));
  Mat output;
  output = image.clone();
  Mat roi00b(output,Rect(0,
						 0,
						 image.rows/2,
						 image.cols/2));
  Mat roi01b(output,Rect(image.rows/2,
						 0,
						 image.rows/2,
						 image.cols/2));
  Mat roi10b(output,Rect(0,
						 image.cols/2,
						 image.rows/2,
						 image.cols/2));
  Mat roi11b(output,Rect(image.rows/2,
						 image.cols/2,
						 image.rows/2,
						 image.cols/2));
  roi11a.copyTo(roi00b);
  roi00a.copyTo(roi11b);
  roi01a.copyTo(roi10b);
  roi10a.copyTo(roi01b);
  imshow("janela", output);	
  waitKey();
  return 0;
}
