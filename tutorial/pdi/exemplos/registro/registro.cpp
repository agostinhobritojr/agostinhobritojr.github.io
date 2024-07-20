#include <opencv2/opencv.hpp>

int main(int argc, char *argv[]) {
  std::vector<cv::Point2f> srcPoints;
  std::vector<cv::Point2f> dstPoints;
  cv::Mat correctedImage;

  cv::Mat image = cv::imread(argv[1]);
  if (image.empty()) {
    std::cout << "Imagem nao encontrada" << std::endl;
    return -1;
  }

  srcPoints.push_back(cv::Point2f(70, 81));    // superior esquerdo
  srcPoints.push_back(cv::Point2f(324, 57));   // superior direito
  srcPoints.push_back(cv::Point2f(311, 210));  // inferior direito
  srcPoints.push_back(cv::Point2f(61, 235));   // inferior esquerdo

  int largura, altura;
  largura = cv::max(cv::norm(srcPoints[0] - srcPoints[1]),
                    cv::norm(srcPoints[2] - srcPoints[3]));

  altura = cv::max(cv::norm(srcPoints[1] - srcPoints[2]),
                   cv::norm(srcPoints[3] - srcPoints[0]));

  std::cout << "largura: " << largura << std::endl;
  std::cout << "altura: " << altura << std::endl;

  // Define os pontos de destino
  dstPoints.push_back(cv::Point2f(0, 0));
  dstPoints.push_back(cv::Point2f(largura, 0));
  dstPoints.push_back(cv::Point2f(largura, altura));
  dstPoints.push_back(cv::Point2f(0, altura));

  // Calcula a matriz de transformacao de perspectiva
  cv::Mat perspectiveMatrix = cv::getPerspectiveTransform(srcPoints, dstPoints);

  // Aplica a correção na imagem
  cv::warpPerspective(image, correctedImage, perspectiveMatrix,
                      cv::Size(largura, altura));

  // Exibe os resultados
  cv::imshow("Imagem original", image);
  cv::imshow("Imagem corrigida", correctedImage);
  cv::waitKey(0);

  return 0;
}