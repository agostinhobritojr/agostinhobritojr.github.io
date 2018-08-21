#include <iostream>
#include <cstring>

using namespace std;

class Equipamento{
  char nome[100];
  char fabricante[100];
  float preco;
public:
  void setNome(const char *_nome);
  void setFabricante(const char *_fabricante);
  void setPreco(float _preco);
  char* getNome(void);
  char* getFabricante(void);
  float getPreco(void);
};

class Motor : public Equipamento{
  float potencia;
  float velocidade;
public:
  void setPotencia(float _potencia);
  void setVelocidade(float _velocidade);
  float getPotencia(void);
  float getVelocidade(void);
};

void Equipamento::setNome(const char *_nome){
  strcpy(nome,_nome);
}

void Equipamento::setFabricante(const char *_fabricante){
  strcpy(fabricante,_fabricante);
}

void Equipamento::setPreco(float _preco){
  preco=_preco;
}

char* Equipamento::getNome(void){
  return nome;
}

char* Equipamento::getFabricante(void){
  return fabricante;
}

float Equipamento::getPreco(void){
  return preco;
}

void Motor::setPotencia(float _potencia){
  potencia=_potencia;
}

void Motor::setVelocidade(float _velocidade){
  velocidade=_velocidade;
}

float Motor::getPotencia(void){
  return potencia;
}

float Motor::getVelocidade(void){
  return velocidade;
}

int main(void){
  Motor m;
  m.setFabricante("ACME");
  m.setPreco(23.45);
  m.setNome("Speedatron");
  m.setPotencia(130);
  m.setVelocidade(280);
  cout << m.getFabricante() << "\n" 
       << m.getPreco() << "\n" 
       << m.getNome() << "\n" 
       << m.getPotencia() << "\n" 
       << m.getVelocidade() << "\n";
}
