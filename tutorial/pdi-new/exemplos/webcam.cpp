#include <iostream>
#include <opencv2/opencv.hpp>
#include "camera.hpp"

int main(int, char**) {
  cv::VideoCapture cap;
  int key, camera;

  camera = cameraEnumerator();

  cap.open(camera);
  if (!cap.isOpened()) return -1;

  cap.set(cv::CAP_PROP_FRAME_WIDTH, 640);
  cap.set(cv::CAP_PROP_FRAME_HEIGHT, 480);

  cv::Mat frame;

  cv::namedWindow("capture");

  for (;;) {
    if(cap.read(frame)){
      cv::flip(frame, frame, 1);
      cv::imshow("capture", frame);
    }
    else{
      std::cout << "." << std::flush;
    }

    key = cv::waitKey(30);
    switch (key) {
      case 27: // ESC
        exit(0);
      case 's':
      case 'S':
        cap.release();
        cap.open(camera);
        cap.set(cv::CAP_PROP_FRAME_WIDTH, 320);
        cap.set(cv::CAP_PROP_FRAME_HEIGHT, 240);
        break;
      case 'w':
      case 'W':
        cap.release();
        cap.open(camera);
        cap.set(cv::CAP_PROP_FRAME_WIDTH, 640);
        cap.set(cv::CAP_PROP_FRAME_HEIGHT, 480);
        break;
    }
  }

  return 0;
}
