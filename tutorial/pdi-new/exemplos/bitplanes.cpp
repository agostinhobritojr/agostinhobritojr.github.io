#include <iostream>
#include <opencv2/opencv.hpp>

int main(int, char**) {
  cv::Mat image, imagebits;
  cv::Vec3b val;
  int key;
  int nbits=0;

  image = cv::imread("biel.png", cv::IMREAD_COLOR);

  while (1) {
    image.copyTo(imagebits);
    
    for(int i=0; i<imagebits.rows; i++){
      for(int j=0; j<imagebits.cols; j++){
        val = imagebits.at<cv::Vec3b>(i,j);
        val[0] = val[0] >> nbits << nbits;
        val[1] = val[1] >> nbits << nbits;
        val[2] = val[2] >> nbits << nbits;
        imagebits.at<cv::Vec3b>(i,j) = val;
      }
    }

    cv::imshow("janela", imagebits);
    key = cv::waitKey();
    if(key == 'a'){
      nbits--;
      if(nbits < 1) nbits = 1;
    }
    if(key == 's'){
      nbits++;
      if(nbits > 7) nbits = 7;
    }
    if(key == 27) break; // ESC key
  }
  return 0;
}
