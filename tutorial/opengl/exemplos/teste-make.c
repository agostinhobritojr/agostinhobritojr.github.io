/* programa teste-make.c */

#include <GL/glut.h>
#include <stdlib.h>
#include <stdio.h>

void display(void);
void timer(int);
void keyboard(unsigned char key, int x, int y);

/* cores do quadrado */
GLfloat r=1.0, g=0.5, b=0.0;

int main(int argc, char** argv){
  glutInit(&argc, argv);
  glutInitDisplayMode (GLUT_SINGLE | GLUT_RGB);
  glutInitWindowSize (256, 256); 
  glutInitWindowPosition (100, 100); 
  glutCreateWindow (argv[0]);
  // inicia um temporizador. após 33ms ativa a funcao timer
  glutTimerFunc(33, timer, 1);
  glClearColor(1.0, 1.0, 1.0, 0.0);
  glShadeModel (GL_FLAT);
  glOrtho (0, 1, 0, 1, -1 ,1);
  glutDisplayFunc(display);
  glutMainLoop();
  return 0;
}

void timer(int value){
  r=r+0.01;
  g=g+0.01;
  b=b+0.01;
  if(r>1) r=0;
  if(g>1) g=0;
  if(b>1) b=0;
  glutPostRedisplay();
  glutTimerFunc(33, timer, 1);
}

void display(void){
  int i;
  glClear(GL_COLOR_BUFFER_BIT);
  glColor3f (r, g, b);
  glBegin(GL_POLYGON);
  glVertex2f(0.25,0.25);
  glVertex2f(0.75,0.25);
  glVertex2f(0.75,0.75);
  glVertex2f(0.25,0.75);
  glEnd();
  glFlush();
}
