#-------------------------------------------------
#
# Project created by QtCreator 2014-12-08T19:20:15
#
#-------------------------------------------------

QT       += core gui network

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = programa_moduloRSS
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp \
    moduloRSS/modulorss.cpp

HEADERS  += mainwindow.h \
    moduloRSS/modulorss.h

FORMS    += mainwindow.ui \
    moduloRSS/modulorss.ui

RESOURCES += \
    resource.qrc
