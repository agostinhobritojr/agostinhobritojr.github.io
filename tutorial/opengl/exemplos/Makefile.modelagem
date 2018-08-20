# Compila programas do curso de OpenGL
# digite: make programa.c
#

GL_LIB = libGL.a
GLU_LIB = libGLU.a
GLUT_LIB = libglut.a
CC = g++
CFLAGS = -I/usr/X11R6/include
XLIBS = -L/usr/X11/lib -L/usr/X11R6/lib -lX11 

##### MACROS #####

INCDIR = /usr/include
LIBDIR = /usr/lib

GL_LIBS = -L$(LIBDIR) -lglut -lGLU -lGL -lm -lpng $(XLIBS)

LIB_DEP = $(LIBDIR)/$(GL_LIB) $(LIBDIR)/$(GLU_LIB) $(LIBDIR)/$(GLUT_LIB)

PROGS = lines

##### RULES #####

.SUFFIXES:
.SUFFIXES: .c

.c: $(LIB_DEP)
	$(CC) -I$(INCDIR) $(CFLAGS) $< $(GL_LIBS) -o $@

jato: jato.o png_texture.o
	$(CC) -I$(INCDIR) $(CFLAGS) png_texture.o jato.o $(GL_LIBS) -o jato

jato.o: jato.c
	$(CC) -I$(INCDIR) -c $(CFLAGS) jato.c

png_texture.o: png_texture.c
	$(CC) -I$(INCDIR) -c $(CFLAGS) png_texture.c
	
##### TARGETS ######

default:
	@echo "Specify a target configuration"

clean:
	-rm *.o *~

realclean:
	-rm $(PROGS)
	-rm *.o *~

targets: $(PROGS)

# execute all programs
exec: $(PROGS)
	@for prog in $(PROGS) ;			\
	do					\
		echo -n "Running $$prog ..." ;	\
		./$$prog ;			\
		echo ;				\
	done
