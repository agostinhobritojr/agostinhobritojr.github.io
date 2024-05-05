#include <opencv2/opencv.hpp>

int main(int argc, char* argv[]) {
    // Read the main image
    cv::Mat mainImage = cv::imread(argv[1]);
    if (mainImage.empty()) {
        std::cerr << "Error: Couldn't read the main image." << std::endl;
        return -1;
    }

    // Read the template image
    cv::Mat templateImage = cv::imread(argv[2]);
    if (templateImage.empty()) {
        std::cerr << "Error: Couldn't read the template image." << std::endl;
        return -1;
    }

    // Create a result matrix to store the matching result
    int result_cols = mainImage.cols - templateImage.cols + 1;
    int result_rows = mainImage.rows - templateImage.rows + 1;
    cv::Mat result(result_rows, result_cols, CV_32FC1);

    // Perform template matching
    cv::matchTemplate(mainImage, templateImage, result, cv::TM_CCORR_NORMED);

    // Find the location of the best match
    cv::Point minLoc, maxLoc;
    double minVal, maxVal;
    cv::minMaxLoc(result, &minVal, &maxVal, &minLoc, &maxLoc, cv::Mat());

    // Draw a rectangle around the detected region
    cv::Rect roiRect(maxLoc.x, maxLoc.y, templateImage.cols, templateImage.rows);
    std::cout << "Detected at: " << maxLoc.x << ", " << maxLoc.y << std::endl;
    cv::rectangle(mainImage, roiRect, cv::Scalar(255, 0, 0), 4);

    // Display the result
    cv::imwrite("Result.png", mainImage);
    cv::waitKey(0);

    return 0;
}
