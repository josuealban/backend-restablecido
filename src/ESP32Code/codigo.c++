#include <WiFi.h>
#include "max6675.h"

// --- Configuración de la Red Wi-Fi ---
const char* ssid = "Red Software Tec.";     // <---TU WIFI
const char* password = "SofSuda.2025@@";  // <---PON TU CONTRASEÑA

// --- Configuración del Termopar MAX6675 ---
const int thermoCLK = 12;
const int thermoCS = 14;
const int thermoDO = 27;

// Inicializa el sensor MAX6675
MAX6675 thermocouple(thermoCLK, thermoCS, thermoDO);

// Crea un objeto de servidor web en el puerto 80
WiFiServer server(80);

// Variables globales para almacenar la temperatura
float tempC;
float tempF;
float tempK;

void setup() {
  Serial.begin(115200);
  delay(10);

  // --- Conexión a la red Wi-Fi ---
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado exitosamente.");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());

  server.begin(); // Inicia el servidor web
}

void loop() {
  getTemp(); // Actualiza la lectura de temperatura en cada ciclo
  
  WiFiClient client = server.available(); // Escucha si hay clientes entrantes

  if (client) { // Si un cliente se conecta
    Serial.println("Nuevo cliente conectado.");
    String currentLine = ""; // String para almacenar los datos del cliente
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        if (c == '\n') {
          if (currentLine.length() == 0) {
            // Encabezados HTTP
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

            // --- Contenido de la Página Web (HTML) ---
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
            client.println("<meta charset=\"UTF-8\">"); // <-- SOLUCIÓN AL ERROR DE CARACTERES
            client.println("<meta http-equiv=\"refresh\" content=\"5\">"); // Refresca la página cada 5 segundos
            client.println("<title>Proyecto Piensa - Temperatura</title>");
            // Estilos CSS para que se vea bonito
            client.println("<style>");
            client.println("body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; background-color: #f0f2f5; margin: 0; padding: 20px; }");
            client.println("h1 { color: #1c1e21; }");
            client.println(".main-container { max-width: 600px; margin: 20px auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 20px; }");
            client.println("h2 { color: #333; border-bottom: 2px solid #e7e7e7; padding-bottom: 10px; }");
            client.println(".temp-grid { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px; margin-top: 20px; }");
            client.println(".temp-card { background-color: #f7f7f7; border: 1px solid #ddd; border-radius: 8px; padding: 15px; width: 150px; }");
            client.println(".temp-label { font-size: 1.1em; color: #606770; }");
            client.println(".temp-value { font-size: 2.2em; font-weight: bold; margin-top: 5px; }");
            client.println(".celsius { color: #d9534f; }");
            client.println(".fahrenheit { color: #5bc0de; }");
            client.println(".kelvin { color: #5cb85c; }");
            client.println("</style></head>");
            
            // Cuerpo de la página
            client.println("<body><div class=\"main-container\">");
            client.println("<h1>Proyecto Piensa</h1>");
            client.println("<h2>Temperatura medida por termocupla</h2>");
            
            // Grid para las 3 temperaturas
            client.println("<div class=\"temp-grid\">");

            // Tarjeta para Celsius
            client.println("<div class=\"temp-card\">");
            client.println("<div class=\"temp-label\">Celsius</div>");
            client.print("<div class=\"temp-value celsius\">");
            client.print(tempC, 2); // Imprime con 2 decimales
            client.println(" °C</div>"); // ° es el código HTML para el símbolo de grado
            client.println("</div>");

            // Tarjeta para Fahrenheit
            client.println("<div class=\"temp-card\">");
            client.println("<div class=\"temp-label\">Fahrenheit</div>");
            client.print("<div class=\"temp-value fahrenheit\">");
            client.print(tempF, 2);
            client.println(" °F</div>");
            client.println("</div>");

            // Tarjeta para Kelvin
            client.println("<div class=\"temp-card\">");
            client.println("<div class=\"temp-label\">Kelvin</div>");
            client.print("<div class=\"temp-value kelvin\">");
            client.print(tempK, 2);
            client.println(" K</div>"); // Kelvin no usa el símbolo de grado
            client.println("</div>");
            
            client.println("</div>"); // Cierre del grid
            client.println("</div></body></html>");

            // La respuesta HTTP ha terminado
            client.println();
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }
    // Cierra la conexión con el cliente
    client.stop();
    Serial.println("Cliente desconectado.");
  }
}

// --- Función para obtener la temperatura ---
void getTemp() {
  // Lee las temperaturas del termopar
  tempC = thermocouple.readCelsius();
  tempF = thermocouple.readFahrenheit();
  tempK = tempC + 273.15;

  // Imprime la temperatura en el Monitor Serie (opcional, para depuración)
  Serial.print("Temperatura: ");
  Serial.print(tempC);
  Serial.println(" C");
  delay(1000); // Pequeña pausa
}