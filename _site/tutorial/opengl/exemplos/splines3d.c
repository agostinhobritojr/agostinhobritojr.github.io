#include <stdlib.h>
#include <math.h>
#include <GL/glut.h>

GLint eixox, eixoy, eixoz;

GLint nVertices=4;
GLfloat vertices[4][4][3];

GLint largura, altura;

enum {BEZIER, NURBS};
GLint spline;
GLUnurbsObj *nc;
GLfloat nos[8]={0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0};
GLint nNos=8;

void gera_superficie(void){
  int i,j;
  for(i=0; i<4; i++){
    for(j=0; j<4; j++){
      vertices[i][j][0] = 2.0*((GLfloat)i - 1.5);
      vertices[i][j][1] = 2.0*((GLfloat)j - 1.5);
      
      if ( (i == 1 || i == 2) && (j == 1 || j == 2))
	vertices[i][j][2] = 7.0;
      else
	vertices[i][j][2] = -3.0;
    }
  }
}
void display(void){
  int i,j;

  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

  glPushMatrix();
  glRotatef(eixox, 1 ,0 ,0);
  glRotatef(eixoy, 0 ,1 ,0);
  glRotatef(eixoz, 0 ,0 ,1);
  glScalef(0.25, 0.25, 0.25);

  glDisable(GL_LIGHTING);
  glPushMatrix();
  glTranslatef(-5,-5,-5);
  glColor3f(1,1,1);
  glBegin(GL_LINES);
  glVertex3f(0,0,0);  glVertex3f(1,0,0);
  glEnd();
  glRasterPos3f(1.5,0,0);
  glutBitmapCharacter(GLUT_BITMAP_TIMES_ROMAN_10, 'x');

  glBegin(GL_LINES);
  glVertex3f(0,0,0);  glVertex3f(0,1,0);
  glEnd();
  glRasterPos3f(0,1.5,0);
  glutBitmapCharacter(GLUT_BITMAP_TIMES_ROMAN_10, 'y');

  glBegin(GL_LINES);
  glVertex3f(0,0,0);  glVertex3f(0,0,1);
  glEnd();
  glRasterPos3f(0,0,1.5);
  glutBitmapCharacter(GLUT_BITMAP_TIMES_ROMAN_10, 'z');

  glPopMatrix();
  glEnable(GL_LIGHTING);

  switch(spline){
  case BEZIER:
    glMap2f(GL_MAP2_VERTEX_3, 0.0, 1.0, 3, 4, 0, 1, 3*nVertices, 4, &vertices[0][0][0]);
    glEnable(GL_AUTO_NORMAL);
    glMapGrid2f(20, 0, 1.0, 20, 0, 1.0);
    glEvalMesh2(GL_FILL, 0, 20, 0, 20);
    break;
  case NURBS:
    gluBeginSurface(nc);
    gluNurbsSurface(nc, nNos, nos, nNos, nos, 4*3, 3, &vertices[0][0][0], 4, 4, GL_MAP2_VERTEX_3);
    gluEndSurface(nc);
    break;
  }
  glPointSize(5.0);
  glColor3f(1.0, 0.0, 0.0);
  glDisable(GL_LIGHTING);
  glBegin(GL_POINTS);
  for(i=0; i<4; i++){
    for(j=0; j<4; j++){
      glVertex3fv(&vertices[i][j][0]);
    }
  }
  glEnable(GL_LIGHTING);
  glEnd();
  
  glPopMatrix();
  glFlush();

  glutSwapBuffers();
}

void init(void){
  GLfloat mat_diffuse[] = { 0.7, 0.7, 0.7, 1.0 };
  GLfloat mat_specular[] = { 1.0, 1.0, 1.0, 1.0 };
  GLfloat mat_shininess[] = { 100.0 };
  
  glMaterialfv(GL_FRONT, GL_DIFFUSE, mat_diffuse);
  glMaterialfv(GL_FRONT, GL_SPECULAR, mat_specular);
  glMaterialfv(GL_FRONT, GL_SHININESS, mat_shininess);
  
  glEnable(GL_LIGHTING);
  glEnable(GL_LIGHT0);

  glEnable(GL_DEPTH_TEST);
  glEnable(GL_AUTO_NORMAL);
  glEnable(GL_NORMALIZE);
  
  gera_superficie();
  
  nc= gluNewNurbsRenderer();
  gluNurbsProperty(nc, GLU_SAMPLING_TOLERANCE, 5.0);
  gluNurbsProperty(nc, GLU_DISPLAY_MODE, GLU_FILL);
  
  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();
  glTranslatef (0.0, 0.0, -5.0);

  spline=NURBS;
  glClearColor(0.0, 0.0, 0.0, 0.0);
  glShadeModel(GL_SMOOTH);
  glEnable(GL_MAP2_VERTEX_3);
  display();
}

void reshape(int w, int h){
  glViewport(0, 0, w, h);
  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  gluPerspective (45.0, (GLdouble)w/(GLdouble)h, 3.0, 8.0);
  glMatrixMode(GL_MODELVIEW);
}

/* ARGSUSED1 */
void keyboard(unsigned char key, int x, int y){
  switch (key) {
  case 'x':
    eixox = (eixox + 5) % 360;
    glutPostRedisplay();
    break;
  case 'y':
    eixoy = (eixoy + 5) % 360;
    glutPostRedisplay();
    break;
  case 'z':
    eixoz = (eixoz + 5) % 360;
    glutPostRedisplay();
    break;
  case 'X':
    eixox = (eixox - 5) % 360;
    glutPostRedisplay();
    break;
  case 'Y':
    eixoy = (eixoy - 5) % 360;
    glutPostRedisplay();
    break;
  case 'Z':
    eixoz = (eixoz - 5) % 360;
    glutPostRedisplay();
    break;
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
int main(int argc, char** argv){
  glutInit(&argc, argv);
  glutInitDisplayMode(GLUT_DEPTH| GLUT_DOUBLE | GLUT_RGB);
  glutInitWindowSize(500, 500);
  glutInitWindowPosition(100, 100);
  glutCreateWindow(argv[0]);
  init();
  glutDisplayFunc(display);
  glutReshapeFunc(reshape);
  glutKeyboardFunc(keyboard);
  glutMainLoop();
  return 0;
}
