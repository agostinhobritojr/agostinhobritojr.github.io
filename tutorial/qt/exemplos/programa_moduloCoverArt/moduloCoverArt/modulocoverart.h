#ifndef MODULOCOVERART_H
#define MODULOCOVERART_H

#include <QWidget>
#include <QDebug>
#include <QXmlStreamReader>
#include <QtNetwork/QNetworkAccessManager>
#include <QtNetwork/QNetworkRequest>
#include <QtNetwork/QNetworkReply>
#include "coverart/CoverArt.h"
#include "coverart/caa_c.h"
#include "coverart/defines.h"
#include "coverart/HTTPFetch.h"
#include "coverart/Image.h"
#include "coverart/ImageList.h"
#include "coverart/ReleaseInfo.h"
#include "coverart/Thumbnails.h"
#include "coverart/Type.h"
#include "coverart/TypeList.h"
#include <sstream>
#include <fstream>

namespace Ui {
class moduloCoverArt;
}

class moduloCoverArt : public QWidget
{
    Q_OBJECT
    
public:
    explicit moduloCoverArt(QWidget *parent = 0);
    ~moduloCoverArt();
    
private:
    Ui::moduloCoverArt *ui;
    QString nome_da_musica, nome_do_artista;
    QNetworkAccessManager* manager;

    QString obterReleaseID(QXmlStreamReader* xml);
    void obterCoverArt(QString releaseID);

private slots:
    void resposta(QNetworkReply *networkReply);

public slots:
    void atualizaCoverArt(QString nome_da_musica, QString nome_do_artista);
};

#endif // MODULOCOVERART_H
