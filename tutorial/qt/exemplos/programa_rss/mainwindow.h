#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
/*  */

#include <QXmlStreamReader>
#include <QtNetwork>
#include <QtHttp>
#include <QUrl>

/*  */

#define MAX_NEWS 5

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

public slots:
    void funcao(int i,bool error);

private:
    Ui::MainWindow *ui;

    QHttp http;
    QXmlStreamReader xml;

    int cont_news;

    QVector<QString> titulos, links;

};

#endif // MAINWINDOW_H
