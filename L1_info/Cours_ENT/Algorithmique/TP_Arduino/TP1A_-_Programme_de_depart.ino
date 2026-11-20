#define LED_V1 8
#define LED_V2 7
#define LED_V3 6
#define LED_J1 10
#define LED_J2 9
#define LED_J3 5
#define LED_J4 4
#define LED_R1 12
#define LED_R2 11
#define LED_R3 3
#define LED_R4 2

#define INT_1 14

#define BTN_1 15
#define BTN_2 16
#define BTN_3 17
#define BTN_4 18

void setup()
{
  Serial.begin(9600);
  Serial.setTimeout(500);
  
  pinMode(LED_V1, OUTPUT);
  pinMode(LED_V2, OUTPUT);
  pinMode(LED_V3, OUTPUT);
  pinMode(LED_J1, OUTPUT);
  pinMode(LED_J2, OUTPUT);
  pinMode(LED_J3, OUTPUT);
  pinMode(LED_J4, OUTPUT);
  pinMode(LED_R1, OUTPUT);
  pinMode(LED_R2, OUTPUT);
  pinMode(LED_R3, OUTPUT);
  pinMode(LED_R4, OUTPUT);
  
  pinMode(INT_1, INPUT);
  
  pinMode(BTN_1, INPUT);
  pinMode(BTN_2, INPUT);
  pinMode(BTN_3, INPUT);
  pinMode(BTN_4, INPUT);
}

// Vos variables peuvent être déclarées ici
// ----

// ----

void loop()
{
  // ----
  // Votre programme commence ici
  // ----
  

  
  // ----
  // Fin de votre programme
  // ----
}
