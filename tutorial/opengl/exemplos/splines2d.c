#include <stdlib.h>
#include <GL/glut.h>
#include <math.h>

GLint nVertices=6;
GLfloat vertices[6][3] = {
  {-4.0,  0.0, 0.0}, 
  {-4.0, +4.0, 0.0}, 
  {+4.0, -4.0, 0.0}, 
  {-4.0, -4.0, 0.0}, 
  {+4.0, +4.0, 0.0}, 
  {+4.0,  0.0, 0.0}
};

GLint largura, altura;
GLint mudaCurva=0;
GLint verticeCorrente=0;

GLfloat esquerda=-5;
GLfloat direita =+5;
GLfloat fundo   =-5;
GLfloat topo    =+5;
GLfloat longe   =+5;
GLfloat perto   =-5;

enum {BEZIER, NURBS};
GLint spline;
GLUnurbsObj *nc;
GLfloat nos[10]={0.0, 0.0, 0.0, 0.0, 1.0, 2.5, 3.0, 3.0, 3.0, 3.0};
GLint nNos=10;

GLint matrizViewport[4];
GLdouble matrizModelview[16], matrizProjecao[16];
GLint yreal;  /*  posição da coordenada y no OpenGL */
GLdouble wx, wy, wz;  /*  coordenadas no mundo real: x, y, z  */

void display(void){
  int i;
  glClear(GL_COLOR_BUFFER_BIT);
  switch(spline){
  case BEZIER:
    glMap1f(GL_MAP1_VERTEX_3, 0.0, 1.0, 3, nVertices, &vertices[0][0]);
    glBegin(GL_LINE_STRIP);
    for (i = 0; i <= 30; i++){
      glEvalCoord1f((GLfloat) i/30.0);
    }
    glEnd();
    break;
  case NURBS:
    gluBeginCurve(nc);
    gluNurbsCurve(nc, nNos, nos, 3, &vertices[0][0], 4, GL_MAP1_VERTEX_3);
    gluEndCurve(nc);
    break;
  }
  glPointSize(5.0);
  glColor3f(1.0, 1.0, 0.0);
  glBegin(GL_LINE_STRIP);
  for (i = 0; i < nVertices; i++) 
    glVertex3fv(&vertices[i][0]);
  glEnd();
  glColor3f(1.0, 0.0, 0.0);
  glBegin(GL_POINTS);
  for (i = 0; i < nVertices; i++) 
    glVertex3fv(&vertices[i][0]);
  glEnd();
  glColor3f(1.0, 1.0, 1.0);
  glFlush();
  glutSwapBuffers();
}

void init(void){
  glClearColor(0.0, 0.0, 0.0, 0.0);
  spline=BEZIER;
  nc= gluNewNurbsRenderer();
  gluNurbsProperty(nc, GLU_SAMPLING_TOLERANCE, 5.0);
  glEnable(GL_MAP1_VERTEX_3);
  display();
}

void reshape(int w, int h)
{
  glViewport(0, 0, (GLsizei) w, (GLsizei) h);
  glMatrixMode(GL_PROJECTION);
  largura=w;
  altura=h;
  glLoadIdentity();
  glOrtho(esquerda,direita, fundo, topo, perto, longe);
  glMatrixMode(GL_MODELVIEW);
  glGetIntegerv(GL_VIEWPORT, matrizViewport);
  glGetDoublev(GL_MODELVIEW_MATRIX, matrizModelview);
  glGetDoublev(GL_PROJECTION_MATRIX, matrizProjecao);
  glLoadIdentity();
  glutSwapBuffers();
}

/* ARGSUSED1 */
void keyboard(unsigned char key, int x, int y)
{
  switch (key) {
  case 'b':
    spline = BEZIER;
    glutPostRedisplay();
    break;
  case 'n':
    spline = NURBS;
    glutPostRedisplay();
    break;
  case 27:
    exit(0);
    break;
  }
}

void proximidade(){
  int i;
  double tam=0, tamin=32000;
  verticeCorrente=0;
  for(i=0; i<nVertices; i++){
    tam = (wx-vertices[i][0])*(wx-vertices[i][0])+
      (wy-vertices[i][1])*(wy-vertices[i][1]);
    if(tam < tamin){
      tamin=tam;
      verticeCorrente=i;
    }
  }
  tamin=sqrt(tamin);
  if(tamin > 0.5){
    mudaCurva=0;
  }
}

void mouse(int button, int state, int x, int y){
  switch (button) {
  case GLUT_LEFT_BUTTON:
    if (state == GLUT_DOWN) {
      yreal = matrizViewport[3] - (GLint) y - 1;
      gluUnProject ((GLdouble) x, (GLdouble) yreal, 0.0, 
		    matrizModelview, matrizProjecao, matrizViewport, 
		    &wx, &wy, &wz); 
      mudaCurva=1;
      proximidade();
    }
    if (state == GLUT_UP) {
      mudaCurva=0;
    }
    break;
  }
}

void motion(int x, int y){
  if(mudaCurva){
    yreal = matrizViewport[3] - (GLint) y - 1;
    gluUnProject ((GLdouble) x, (GLdouble) yreal, 0.0, 
		  matrizModelview, matrizProjecao, matrizViewport, 
		  &wx, &wy, &wz); 
    vertices[verticeCorrente][0]=wx;
    vertices[verticeCorrente][1]=wy;
    glutPostRedisplay();
  }
}

int main(int argc, char** argv){
  glutInit(&argc, argv);
  glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB);
  glutInitWindowSize(500, 500);
  glutInitWindowPosition(100, 100);
  glutCreateWindow(argv[0]);
  init();
  glutDisplayFunc(display);
  glutReshapeFunc(reshape);
  glutKeyboardFunc(keyboard);
  glutMotionFunc(motion);
  glutMouseFunc(mouse);
  glutMainLoop();
  return 0;
}
