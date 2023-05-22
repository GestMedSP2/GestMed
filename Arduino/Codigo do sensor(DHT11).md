<h2>Código para captar dados de temperatura e umidade no arduíno com o sensor DHT11:</h2>

```C++
#include "DHT.h" //Chama a biblioteca do sensor DHT11
#define dht_type DHT11 

int dht_pin = A2; //Indica que a porta que será lida é a porta analógica 2
DHT dht_1 = DHT(dht_pin, dht_type); // Configuração do sensor indicando a porta(A2) e o tipo(DHT11)

void setup() {
  Serial.begin(9600); //Configura a taxa de comunicação em bits por segundo
  dht_1.begin(); //Inicializa o sensor
}

void loop() {
  //Armazena a temperatura e umidade que são lidas em váriaveis do tipo float
  float umidade = dht_1.readHumidity();
  float temperatura = dht_1.readTemperature();
  
  //Verifca se há alguma leitura inválida -> Um dado que não é número Nan(Not a Number)
  if (isnan(temperatura) or isnan(umidade))
  {
    Serial.println(0); // Assim, a variavel umidade é convertida no tipo string e por ser exibida dentro de uma concatenação
    Serial.println(0);
  }
  // Se estiver tudo certo a temperatura e a umidade é exibida
  else
  {
    //Dados vão ser exibidos no monitor serial
    Serial.println(umidade); // Assim, a variavel umidade é convertida no tipo string e por ser exibida dentro de uma concatenação
    Serial.println(temperatura);
  }

  //Estabelece o tempo em que o código voltará a ser executado -> Tempo em que o looping vai repitindo
  delay(2000);
}
```