#-------------------------------------------------
#
# Project created by QtCreator 2014-11-09T18:39:13
#
#-------------------------------------------------

QT       += core gui network

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = programa_moduloCoverArt
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp \
    moduloCoverArt/modulocoverart.cpp

HEADERS  += mainwindow.h \
    moduloCoverArt/modulocoverart.h

FORMS    += mainwindow.ui \
    moduloCoverArt/modulocoverart.ui

unix|win32: LIBS += -lcoverart
