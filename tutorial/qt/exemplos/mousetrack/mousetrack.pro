#-------------------------------------------------
#
# Project created by QtCreator 2014-04-23T11:10:58
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = mousetrack
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp \
    mousetracker.cpp \
    plotter.cpp

HEADERS  += mainwindow.h \
    mousetracker.h \
    plotter.h

FORMS    += mainwindow.ui
