#include <iostream>
#include <opencv2/opencv.hpp>
#include <cairo/cairo.h>
#include <cairo/cairo-svg.h>

using namespace cv;
using namespace std;

int main(int, char**){
  Mat image, gray;

  cairo_surface_t * surface;
  cairo_t *cr;

  image= imread("bolhas.png",CV_LOAD_IMAGE_COLOR);
  if(!image.data)
    cout << "nao abriu bolhas.png" << endl;
  
  cvtColor(image, gray, COLOR_BGR2GRAY);
  threshold(gray, gray, 1, 255, THRESH_BINARY+THRESH_OTSU);
  
  // Find all objects of interest
  vector<vector<Point> > contours;
  vector<Vec4i> hierarchy;
  findContours(gray, contours, hierarchy, CV_RETR_EXTERNAL, CV_CHAIN_APPROX_NONE);
  
  surface = cairo_svg_surface_create("output.svg", image.cols, image.rows);
  cr = cairo_create(surface);

  cairo_set_line_width(cr, 1);
  for (size_t i = 0; i < contours.size(); i++){
	
	cairo_set_source_rgb(cr, 1.0, 0.0, 0.0);
	
	cairo_move_to(cr, contours[i][0].x, contours[i][0].y);
	for (size_t j = 1; j < contours[i].size(); j++){
	  cairo_line_to(cr, contours[i][j].x, contours[i][j].y);
	}
	cairo_close_path(cr);
	
	cairo_stroke_preserve(cr);

	cairo_set_source_rgb(cr, 1.0, 1.0, 0);
	cairo_fill(cr);	
  }
  cairo_surface_destroy(surface);
  cairo_destroy(cr);

  return 0;
}
