#include <stdlib.h>
#include <math.h>
#include <GL/glut.h>

GLint eixox, eixoy, eixoz;
GLdouble distmin=0.5;

GLint nVertices=4;
GLfloat vertices[4][4][3];

GLint largura, altura;
GLint mudaCurva=0;
GLint vcx=0,vcy=0;
GLint ordemx=3, ordemy=4;

enum {BEZIER, NURBS};
GLint spline;
GLUnurbsObj *nc;
GLfloat nosx[7]={0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0};
GLfloat nosy[8]={0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0};
GLint nNosx=7, nNosy=8;

GLint matrizViewport[4];
GLdouble matrizModelview[16], matrizProjecao[16];
GLdouble realy, realz;  /*  posição da coordenada y no OpenGL */
GLdouble wx, wy, wz;  /*  coordenadas no mundo real: x, y, z  */
GLdouble winx, winy, winz;  /*  coordenadas na janela: x, y, z  */
GLdouble wx1, wy1, wz1, wx0, wy0, wz0; /* nas posicoes: z=0 e z=1 */
GLdouble vx, vy, vz;

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

  glPushMatrix();
  glGetDoublev (GL_MODELVIEW_MATRIX, matrizModelview);
  glGetDoublev (GL_PROJECTION_MATRIX, matrizProjecao);
  glGetIntegerv (GL_VIEWPORT, matrizViewport);
  glPopMatrix();

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
    glEnable(GL_AUTO_NORMAL);
    glMap2f(GL_MAP2_VERTEX_3, 0.0, 1.0, 3, 4, 0, 1, 3*nVertices, 4, &vertices[0][0][0]);
    glMapGrid2f(20, 0, 1.0, 20, 0, 1.0);
    glEvalMesh2(GL_FILL, 0, 20, 0, 20);
    glEnd();
    break;
  case NURBS:
    gluBeginSurface(nc);
    gluNurbsSurface(nc, nNosx, nosx, nNosy, nosy, 4*3, 3, &vertices[0][0][0], ordemx, ordemy, GL_MAP2_VERTEX_3);
    gluEndSurface(nc);
    break;
  }
  glPointSize(5.0);
  glColor3f(1.0, 0.0, 0.0);
  glDisable(GL_LIGHTING);
  glBegin(GL_POINTS);
  for(i=0; i<4; i++){
    for(j=0; j<4; j++){
      if((vcx==i)&&(vcy==j)){
	glColor3f(1.0,1.0,0.0);
	glVertex3fv(&vertices[i][j][0]);
	glColor3f(1.0,0.0,0.0);
      }
      else{
	glVertex3fv(&vertices[i][j][0]);
      }
    }
  }
  glEnable(GL_LIGHTING);
  glEnd();
  glColor3f(1.0, 1.0, 1.0);
  
  glPopMatrix();

  glFlush();

  glutSwapBuffers();
}

void init(void){
  GLfloat mat_diffuse[] = { 0.7, 0.7, 0.7, 1.0 };
  GLfloat mat_specular[] = { 1.0, 1.0, 1.0, 1.0 };
  GLfloat mat_shininess[] = { 100.0 };
  GLfloat light_position[] = { 1.0, 1.0, 8.0, 1.0};
  GLfloat light_ambient[] =  { 0.2, 0.2, 0.2, 1.0};
  glClearColor (0.0, 0.0, 0.0, 1.0);
  glMaterialfv(GL_FRONT, GL_DIFFUSE, mat_diffuse);
  glMaterialfv(GL_FRONT, GL_SPECULAR, mat_specular);
  glMaterialfv(GL_FRONT, GL_SHININESS, mat_shininess);
  
  glEnable(GL_LIGHTING);
  glEnable(GL_LIGHT0);
  glLightfv(GL_LIGHT0, GL_AMBIENT, light_ambient);
  glLightfv(GL_LIGHT0, GL_POSITION, light_position);

  glDepthFunc(GL_LESS);
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
/*  gluPerspective (45.0, (GLdouble)w/(GLdouble)h, 3.0, 8.0);
*/
  glOrtho(-3,3,-3,3,-1,10);
  glMatrixMode(GL_MODELVIEW);
  glGetIntegerv (GL_VIEWPORT, matrizViewport);
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
  case 'r':
    eixox = eixoy = eixoz = 0;
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

void proximidade(){
  int i,j;
  double tam=0, tamin=32000;
  double dx, dy, dz, px, py, pz;
  double piv, pir;

  piv=vx*vx + vy*vy + vz*vz;

  for(i=0; i<4; i++){
    for(j=0; j<4; j++){
      dx=vertices[i][j][0]-wx0;
      dy=vertices[i][j][1]-wy0;
      dz=vertices[i][j][2]-wz0;
      pir= dx*vx + dy*vy + dz*vz;
      px = wx0 + pir/piv *vx;
      py = wy0 + pir/piv *vy;
      pz = wz0 + pir/piv *vz;
      tam = (px - vertices[i][j][0])* (px - vertices[i][j][0])+
	(py - vertices[i][j][1])* (py - vertices[i][j][1])+
	(pz - vertices[i][j][2])* (pz - vertices[i][j][2]);
      
      if((tam < tamin)&&(tam < distmin)){
	tamin=tam;
	vcx=i;
	vcy=j;
      }
    }
  }
  if(tamin < distmin){
    dx=vertices[vcx][vcy][0]-wx0;
    dy=vertices[vcx][vcy][1]-wy0;
    dz=vertices[vcx][vcy][2]-wz0;
    pir= dx*vx + dy*vy + dz*vz;
    px = wx0 + pir/piv *vx;
    py = wy0 + pir/piv *vy;
    pz = wz0 + pir/piv *vz;
    gluProject(px, py, pz, 
	       matrizModelview, matrizProjecao, matrizViewport,
	       &winx, &winy, &winz);
    mudaCurva=1;
  }
  else{
    mudaCurva=0;
  }
}
  
void mouse(int button, int state, int x, int y){
  switch (button) {
  case GLUT_LEFT_BUTTON:
    if (state == GLUT_DOWN) {
      realy = matrizViewport[3] - (GLint) y - 1;
      gluUnProject ((GLdouble) x, (GLdouble) realy, 0.0, 
		    matrizModelview, matrizProjecao, matrizViewport,
		    &wx0, &wy0, &wz0); 
      gluUnProject ((GLdouble) x, (GLdouble) realy, 1.0, 
		    matrizModelview, matrizProjecao, matrizViewport, 
		    &wx1, &wy1, &wz1); 
      vx=wx1-wx0;
      vy=wy1-wy0;
      vz=wz1-wz0;
      proximidade();
      glutPostRedisplay();
    }
    else{
      mudaCurva=0;
    }
    break;
  }
}

void motion(int x, int y){
  if(mudaCurva){
    realy=matrizViewport[3] - (GLint) y - 1;
    gluUnProject((GLdouble) x, (GLdouble) realy, winz, 
		  matrizModelview, matrizProjecao, matrizViewport,
		 &wx, &wy, &wz); 
    vertices[vcx][vcy][0]=wx;
    vertices[vcx][vcy][1]=wy;
    vertices[vcx][vcy][2]=wz;
    glutPostRedisplay();
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
  glutMotionFunc(motion);
  glutMouseFunc(mouse);
  glutMainLoop();
  return 0;
}
