/********************************************************************************
** Form generated from reading UI file 'formletreiro.ui'
**
** Created by: Qt User Interface Compiler version 5.0.2
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_FORMLETREIRO_H
#define UI_FORMLETREIRO_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_FormLetreiro
{
public:
    QGridLayout *gridLayout;
    QLabel *label;

    void setupUi(QWidget *FormLetreiro)
    {
        if (FormLetreiro->objectName().isEmpty())
            FormLetreiro->setObjectName(QStringLiteral("FormLetreiro"));
        FormLetreiro->resize(400, 40);
        FormLetreiro->setMinimumSize(QSize(400, 40));
        FormLetreiro->setMaximumSize(QSize(400, 40));
        gridLayout = new QGridLayout(FormLetreiro);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        label = new QLabel(FormLetreiro);
        label->setObjectName(QStringLiteral("label"));

        gridLayout->addWidget(label, 0, 0, 1, 1);


        retranslateUi(FormLetreiro);

        QMetaObject::connectSlotsByName(FormLetreiro);
    } // setupUi

    void retranslateUi(QWidget *FormLetreiro)
    {
        FormLetreiro->setWindowTitle(QApplication::translate("FormLetreiro", "Form", 0));
        label->setText(QString());
    } // retranslateUi

};

namespace Ui {
    class FormLetreiro: public Ui_FormLetreiro {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_FORMLETREIRO_H
