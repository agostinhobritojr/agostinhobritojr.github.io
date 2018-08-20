#include <GL/glut.h>
#include <stdlib.h>

void init(void);
void display(void);
void keyboard(unsigned char key, int x, int y);

int main(int argc, char** argv){
  glutInit(&argc, argv);
  glutInitDisplayMode (GLUT_SINGLE | GLUT_RGB);
  glutInitWindowSize (256, 256); 
  glutInitWindowPosition (100, 100); 
  glutCreateWindow (argv[0]);
  init();
  glutDisplayFunc(display); 
  glutKeyboardFunc(keyboard);
  glutMainLoop();
  return 0;
}

void init(void){
  glClearColor(1.0, 1.0, 1.0, 0.0);
  glShadeModel (GL_FLAT);
  glOrtho (0, 256, 0, 256, -1 ,1);
/*  gluOrtho2D (0, 256, 0, 256);*/
}

void display(void){
  int i;
  glClear(GL_COLOR_BUFFER_BIT);
  glColor3f (0.0, 0.0, 0.0);
  glBegin(GL_LINES);
  glVertex2i(40,200);  glVertex2i(200,10);
  glEnd();
  glColor3f(1.0,0.0,0.0);
  glRasterPos2i(150,150);
  glutBitmapCharacter(GLUT_BITMAP_TIMES_ROMAN_24, 'A');
}

void keyboard(unsigned char key, int x, int y){
  switch (key) {
  case 27:
	exit(0);
	break;
  }
}
