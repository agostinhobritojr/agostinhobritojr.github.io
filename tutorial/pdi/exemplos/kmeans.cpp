#include <cstdlib>
#include <opencv2/opencv.hpp>

int main(int argc, char** argv) {
  int nClusters = 8, nRodadas = 5;

  cv::Mat rotulos, centros;

  if (argc != 3) {
    std::cout << "kmeans entrada.jpg saida.jpg\n";
    exit(0);
  }

  cv::Mat img = cv::imread(argv[1], cv::IMREAD_COLOR);
  cv::Mat samples(img.rows * img.cols, 3, CV_32F);

  for (int y = 0; y < img.rows; y++) {
    for (int x = 0; x < img.cols; x++) {
      for (int z = 0; z < 3; z++) {
        samples.at<float>(y + x * img.rows, z) = img.at<cv::Vec3b>(y, x)[z];
      }
    }
  }

  cv::kmeans(samples, nClusters, rotulos,
             cv::TermCriteria(cv::TermCriteria::EPS | cv::TermCriteria::COUNT,
                              10000, 0.0001),
             nRodadas, cv::KMEANS_PP_CENTERS, centros);

  cv::Mat rotulada(img.size(), img.type());
  for (int y = 0; y < img.rows; y++) {
    for (int x = 0; x < img.cols; x++) {
      int indice = rotulos.at<int>(y + x * img.rows, 0);
      rotulada.at<cv::Vec3b>(y, x)[0] = (uchar)centros.at<float>(indice, 0);
      rotulada.at<cv::Vec3b>(y, x)[1] = (uchar)centros.at<float>(indice, 1);
      rotulada.at<cv::Vec3b>(y, x)[2] = (uchar)centros.at<float>(indice, 2);
    }
  }
  cv::imshow("kmeans", rotulada);
  cv::imwrite(argv[2], rotulada);
  cv::waitKey();
}
