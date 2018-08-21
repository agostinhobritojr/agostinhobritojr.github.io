#include <cairo/cairo.h>
#include <cairo/cairo-svg.h>

#define OUTPUT_SVG_FILE "output.svg"

int main(void){
  cairo_surface_t * surface;
  cairo_t *cr;
  
  surface = cairo_svg_surface_create(OUTPUT_SVG_FILE, 100, 100);
  cr = cairo_create(surface);
  cairo_set_line_width(cr, 1);

  cairo_set_source_rgb(cr, 1.0, 0.0, 0.0);

  cairo_move_to(cr, 0,0);
  cairo_line_to(cr, 10,0);
  cairo_line_to(cr, 10,10);
  cairo_line_to(cr, 0,10);
  cairo_close_path(cr);
  
  cairo_stroke_preserve(cr);

  cairo_set_source_rgb(cr, 1.0, 1.0, 0);
  cairo_fill(cr);

  cairo_surface_destroy(surface);
  cairo_destroy(cr);
}
