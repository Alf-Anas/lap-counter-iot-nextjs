
#include <sys/time.h>
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "LAP_COUNTER";
const char* password = "abcd1234";
const char* ntpServer = "pool.ntp.org";
const char* mqtt_server = "test.mosquitto.org";

WiFiClient espClient;
PubSubClient client(espClient);

int INPUT_A = 25;
int INPUT_B = 26;
int INPUT_C = 27;
int OUTPUT_LED = 33;

unsigned long lastDetectedA = 0;
unsigned long lastDetectedB = 0;
unsigned long lastDetectedC = 0;
#define MSG_BUFFER_SIZE  (50)
char LANE_A[MSG_BUFFER_SIZE];
char LANE_B[MSG_BUFFER_SIZE];
char LANE_C[MSG_BUFFER_SIZE];



void setup() {
  Serial.println("=========== SETUP ===========");
  pinMode(INPUT_A, INPUT);
  pinMode(INPUT_B, INPUT);
  pinMode(INPUT_C, INPUT);
  pinMode(OUTPUT_LED, OUTPUT);
  Serial.begin(115200);
  Serial.println("=========== INITIALIZING ===========");
  setup_wifi();
  client.setServer(mqtt_server, 1883);


  Serial.println("=========== DONE ===========");
}

void loop() {
  if (!client.connected()) {
    digitalWrite(OUTPUT_LED, LOW);
    reconnect();
  } else{ 
    digitalWrite(OUTPUT_LED, HIGH);
  }
  client.loop();


  int readA = digitalRead(INPUT_A);
  int readB = digitalRead(INPUT_B);
  int readC = digitalRead(INPUT_C);


  if (readA == LOW) {
    unsigned long now = millis();
    if (now - lastDetectedA > 300) {
      lastDetectedA = now;

      String unixTime = getUnixTime();
      Serial.print("Lane A terdeteksi : ");
      Serial.println(unixTime);

      snprintf (LANE_A, MSG_BUFFER_SIZE, "%s", unixTime);
      client.publish("/geoit.dev/lap-counter/a", LANE_A);
    }
  }
  if (readB == LOW) {
    unsigned long now = millis();
    if (now - lastDetectedB > 300) {
      lastDetectedB = now;

      String unixTime = getUnixTime();
      Serial.print("Lane B terdeteksi : ");
      Serial.println(unixTime);

      snprintf (LANE_B, MSG_BUFFER_SIZE, "%s", unixTime);
      client.publish("/geoit.dev/lap-counter/b", LANE_B);
    }
  }
  if (readC == LOW) {
    unsigned long now = millis();
    if (now - lastDetectedC > 300) {
      lastDetectedC = now;

      String unixTime = getUnixTime();
      Serial.print("Lane C terdeteksi : ");
      Serial.println(unixTime);

      snprintf (LANE_C, MSG_BUFFER_SIZE, "%s", unixTime);
      client.publish("/geoit.dev/lap-counter/c", LANE_C);
    }
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("Connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}


void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  configTime(0, 0, ntpServer);
}

String getUnixTime() {
  struct timeval now;
  gettimeofday(&now, NULL);

  unsigned long long unixTimeMicros = now.tv_sec * 1000LL + now.tv_usec / 1000;

  char timeStringBuff[50];
  snprintf(timeStringBuff, sizeof(timeStringBuff), "%llu", unixTimeMicros); // Format as Unix time with microseconds
  return timeStringBuff;
}
