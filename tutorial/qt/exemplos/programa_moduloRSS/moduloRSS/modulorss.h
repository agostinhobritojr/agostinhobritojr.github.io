#ifndef MODULORSS_H
#define MODULORSS_H

#include <QWidget>

#include <QtNetwork/QNetworkAccessManager>
#include <QtNetwork/QNetworkRequest>
#include <QtNetwork/QNetworkReply>
#include <QXmlStreamReader>

#define MAX_NEWS 5

namespace Ui {
class ModuloRSS;
}

class ModuloRSS : public QWidget
{
    Q_OBJECT

public:
    explicit ModuloRSS(QWidget *parent = 0);
    ~ModuloRSS();
    void trataXmlParaLabel(QXmlStreamReader* xml);

private:
    Ui::ModuloRSS *ui;

    QNetworkAccessManager* manager;

private slots:
    void replyFinished(QNetworkReply* networkReply);

public slots:
    void atualizar();
};

#endif // MODULORSS_H
