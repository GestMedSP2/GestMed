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
  String idSensorAmbiente = "012357";
  String idSensorTermolabel = "012344";
  
  //Armazena a temperatura e umidade que são lidas em váriaveis do tipo float
  float umidade = dht_1.readHumidity();
  float temperatura = dht_1.readTemperature();

  float temperaturaTermolabel = ((0.29 * temperatura) - 1.54);
  
  //Verifca se há alguma leitura inválida -> Um dado que não é número Nan(Not a Number)
  if (isnan(temperatura) or isnan(umidade))
  {
    Serial.print(idSensorAmbiente);
    Serial.print(";");
    Serial.print(0);
    Serial.print(";");
    Serial.print(0);
    Serial.println(";");

    Serial.print(idSensorTermolabel);
    Serial.print(";");
    Serial.print(0);
    Serial.print(";");
    Serial.print(0);
    Serial.println(";");
  }
  // Se estiver tudo certo a temperatura e a umidade é exibida
  else
  {
    Serial.print(idSensorAmbiente);
    Serial.print(";");
    Serial.print(umidade);
    Serial.print(";");
    Serial.print(temperatura);
    Serial.println(";");

    Serial.print(idSensorTermolabel);
    Serial.print(";");
    Serial.print(umidade);
    Serial.print(";");
    Serial.print(temperaturaTermolabel);
    Serial.println(";");
    //Dados vão ser exibidos no monitor serial
    // Assim, a variavel umidade é convertida no tipo string
  }

  //Estabelece o tempo em que o código voltará a ser executado -> Tempo em que o looping vai repitindo
  delay(2000);
}
```