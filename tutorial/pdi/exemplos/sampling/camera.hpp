#include <opencv2/opencv.hpp>
#include <vector>

int cameraEnumerator() {
  int camera;
  std::vector<int> cameras;

  cv::VideoCapture cap;

  cameras.clear();
  for (int i = 0; i < 10; i++) {
    cap.open(i);
    if (cap.isOpened()) {
      cameras.push_back(i);
    }
    cap.release();
  }
  if (cameras.size() == 1) {
    return cameras[0];
  }
  std::cout << "--------------------\n";
  for (size_t i = 0; i < cameras.size(); i++) {
    std::cout << "camera [" << cameras[i] << "] esta ativa" << std::endl;
  }
  std::cout << "--------------------\n";
  std::cout << "selecione a camera para ativar: ";
  std::cin >> camera;
  return camera;
}
