class Equipamento{
  char nome[100];
  char fabricante[100];
  float preço;
public:
  void setNome(char *_nome);
  void setFabricante(char *_nome);
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
