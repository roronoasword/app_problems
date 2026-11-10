import { Challenge, Solution, User } from './types';

export const DEFAULT_USERS: User[] = [
  {
    username: 'Angelo2008',
    password: 'Sago2008',
    displayName: 'Angelo García',
    bio: 'Desarrollador Full-Stack & Ingeniero de Software. Apasionado por algoritmos y desarrollo en Python/JavaScript.',
    createdAt: '2026-11-01',
  },
  {
    username: 'DevMaster',
    password: 'Password123',
    displayName: 'Clara Mendez',
    bio: 'Especialista en Rust, Cloud y Machine Learning.',
    createdAt: '2026-11-02',
  },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'chl-01-callao',
    number: 1,
    company: 'Puerto de Callao Logistics',
    location: 'Callao, Perú',
    industry: 'Logística',
    title: 'Optimización de rutas de contenedores y predicción de cuellos de botella',
    summary: 'Optimización en tiempo real de rutas de contenedores y predicción de cuellos de botella en patio portuario.',
    detailedDescription:
      'El terminal marítimo gestiona más de 80,000 TEUs mensuales con congestión crítica durante la descarga simultánea de portacontenedores Neo-Panamax. Se busca un algoritmo de ruteo dinámico con penalización probabilística que reduzca los movimientos improductivos ("shuffles") de grúas pórtico y camiones de transferencia interna.',
    technicalRequirements: [
      'Algoritmo de ruteo en grafos dirigidos con pesos ponderados por congestión.',
      'Minimización de tiempos de espera para grúas STS y vehículos autónomos AGV.',
      'Soporte para simulación de al menos 5,000 contenedores y eventos concurrentes.',
    ],
    reward: 4500,
    tags: ['Python', 'IoT', 'Algoritmos de Grafos'],
    suggestedLanguage: 'Python',
    defaultFileName: 'container_optimizer.py',
    deadline: '2026-12-15',
    status: 'activo',
    starterCode: `# Solución para Puerto de Callao Logistics
import heapq

def optimize_container_routes(yard_graph, start_bay, destination_cranes):
    """
    Calcula la ruta óptima de menor congestión para camiones de transferencia.
    """
    distances = {node: float('inf') for node in yard_graph}
    distances[start_bay] = 0
    pq = [(0, start_bay)]
    
    while pq:
        current_cost, current_node = heapq.heappop(pq)
        if current_cost > distances[current_node]:
            continue
            
        for neighbor, weight in yard_graph.get(current_node, []):
            cost = current_cost + weight
            if cost < distances[neighbor]:
                distances[neighbor] = cost
                heapq.heappush(pq, (cost, neighbor))
                
    return {crane: distances[crane] for crane in destination_cranes if crane in distances}

if __name__ == "__main__":
    test_graph = {
        'Bay_A1': [('Lane_1', 4), ('Lane_2', 7)],
        'Lane_1': [('STS_Crane_01', 3)],
        'Lane_2': [('STS_Crane_02', 5)],
        'STS_Crane_01': [],
        'STS_Crane_02': []
    }
    result = optimize_container_routes(test_graph, 'Bay_A1', ['STS_Crane_01', 'STS_Crane_02'])
    print("Costos de ruteo óptimos:", result)
`,
  },
  {
    id: 'chl-02-fintech',
    number: 2,
    company: 'FinTech Global Sol',
    location: 'Londres / Global',
    industry: 'Finanzas',
    title: 'Detección de anomalías en transacciones transfronterizas mediante microservicios',
    summary: 'Detección de anomalías en transacciones transfronterizas mediante microservicios de baja latencia.',
    detailedDescription:
      'Procesamos más de 15,000 transacciones internacionales por segundo. Requerimos un microservicio con inferencia inferior a 15 milisegundos para evaluar patrones de lavado de dinero (AML) y transacciones atípicas.',
    technicalRequirements: [
      'Inferencia de scoring sub-15ms en percentil p99.',
      'Algoritmo de Isolation Forest o scoring estadístico z-score ponderado.',
      'Tolerancia a ráfagas con buffer asíncrono.',
    ],
    reward: 6000,
    tags: ['Rust', 'Java', 'Machine Learning'],
    suggestedLanguage: 'JavaScript',
    defaultFileName: 'anomaly_detector.js',
    deadline: '2026-12-01',
    status: 'activo',
    starterCode: `// Detector de anomalías transaccionales de baja latencia
class AnomalyDetector {
  constructor(threshold = 2.8) {
    this.threshold = threshold;
    this.history = [];
  }

  processTransaction(tx) {
    const startTime = performance.now();
    const amount = tx.amount;
    
    // Cálculo de media y desviación típica móvil
    this.history.push(amount);
    if (this.history.length > 500) this.history.shift();

    const avg = this.history.reduce((a, b) => a + b, 0) / this.history.length;
    const variance = this.history.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / this.history.length;
    const stdDev = Math.sqrt(variance) || 1;
    
    const zScore = Math.abs((amount - avg) / stdDev);
    const isAnomaly = zScore > this.threshold || (tx.crossBorder && amount > 25000);
    const latencyMs = (performance.now() - startTime).toFixed(2);

    return {
      txId: tx.id,
      isAnomaly,
      score: zScore.toFixed(3),
      latencyMs: \`\${latencyMs}ms\`,
      riskLevel: isAnomaly ? 'ALTO_RIESGO' : 'NORMAL'
    };
  }
}

// Prueba rápida
const detector = new AnomalyDetector();
[120, 140, 135, 125, 45000].forEach((amt, idx) => {
  const result = detector.processTransaction({ id: 'TX-' + idx, amount: amt, crossBorder: amt > 1000 });
  console.log(result);
});
`,
  },
  {
    id: 'chl-03-ecoenergy',
    number: 3,
    company: 'EcoEnergy Corp',
    location: 'Valencia, España',
    industry: 'Energía',
    title: 'Sistema de balanceo de carga para red distribuida de paneles solares residenciales',
    summary: 'Sistema de balanceo de carga para red distribuida de paneles solares residenciales.',
    detailedDescription:
      'Controlador inteligente descentralizado para regular la inyección de energía solar domiciliaria hacia baterías de respaldo y red pública, previniendo sobrevoltaje y prolongando la vida de los acumuladores.',
    technicalRequirements: [
      'Balanceo dinámico entre carga de batería y despacho a la red.',
      'Control de picos de generación en horas de máxima insolación.',
      'Huella de memoria ligera para hardware embebido IoT.',
    ],
    reward: 3200,
    tags: ['C++', 'Go', 'Data Science'],
    suggestedLanguage: 'Python',
    defaultFileName: 'solar_balancer.py',
    deadline: '2026-11-30',
    status: 'activo',
    starterCode: `# Balanceador de carga para microrred solar distribuida
class SolarMicrogridBalancer:
    def __init__(self, battery_capacity_kwh=15.0):
        self.capacity = battery_capacity_kwh
        self.current_charge = 8.0 # kWh

    def dispatch(self, solar_gen_kw, home_consumption_kw, grid_price_usd):
        net_power = solar_gen_kw - home_consumption_kw
        actions = {}
        
        if net_power > 0:
            charge_room = self.capacity - self.current_charge
            to_battery = min(net_power, charge_room)
            to_grid = net_power - to_battery
            self.current_charge += to_battery
            actions = {"accion": "EXCEDENTE", "bateria_cargada_kw": to_battery, "inyectado_red_kw": to_grid}
        else:
            deficit = abs(net_power)
            from_battery = min(deficit, self.current_charge)
            from_grid = deficit - from_battery
            self.current_charge -= from_battery
            actions = {"accion": "DEFICIT", "suministro_bateria_kw": from_battery, "comprado_red_kw": from_grid}
            
        return {**actions, "bateria_restante_kwh": round(self.current_charge, 2)}

balancer = SolarMicrogridBalancer()
print(balancer.dispatch(solar_gen_kw=6.5, home_consumption_kw=2.1, grid_price_usd=0.18))
`,
  },
  {
    id: 'chl-04-agritech',
    number: 4,
    company: 'AgriTech Solutions',
    location: 'Córdoba, Argentina',
    industry: 'Agricultura',
    title: 'Algoritmo de procesamiento de imágenes satelitales para detección temprana de plagas',
    summary: 'Algoritmo de procesamiento de imágenes satelitales para detección temprana de plagas en cultivos.',
    detailedDescription:
      'Segmentación semántica de imágenes multiespectrales (Sentinel-2) calculando índices NDVI y RedEdge para delimitar polígonos de estrés biótico en cultivos extensivos antes de que sea perceptible por inspección visual.',
    technicalRequirements: [
      'Cálculo de índice NDVI: (NIR - RED) / (NIR + RED).',
      'Clasificación de anomalías foliares en mapas de calor.',
      'Exportación de coordenadas GeoJSON para maquinaria agrícola autónoma.',
    ],
    reward: 5000,
    tags: ['Python', 'Computer Vision', 'PyTorch'],
    suggestedLanguage: 'Python',
    defaultFileName: 'pest_ndvi_detector.py',
    deadline: '2026-12-20',
    status: 'activo',
    starterCode: `# Procesamiento multiespectral para detección de estrés foliar
def compute_ndvi_anomaly_mask(nir_band, red_band, threshold=0.35):
    """
    Calcula matriz NDVI y detecta zonas con posible presencia de plagas.
    """
    rows = len(nir_band)
    cols = len(nir_band[0])
    anomaly_pixels = []
    
    for r in range(rows):
        for c in range(cols):
            nir = nir_band[r][c]
            red = red_band[r][c]
            denom = nir + red
            ndvi = (nir - red) / denom if denom != 0 else 0
            if ndvi < threshold:
                anomaly_pixels.append({"fila": r, "columna": c, "ndvi": round(ndvi, 3), "alerta": "RIESGO_PLAGA"})
                
    return {
        "total_anomalias": len(anomaly_pixels),
        "anomalias_detectadas": anomaly_pixels[:5]
    }

# Simulación 3x3 de bandas satelitales
sim_nir = [[0.6, 0.7, 0.2], [0.8, 0.15, 0.75], [0.65, 0.7, 0.8]]
sim_red = [[0.1, 0.1, 0.18], [0.12, 0.22, 0.11], [0.14, 0.12, 0.1]]
print(compute_ndvi_anomaly_mask(sim_nir, sim_red))
`,
  },
  {
    id: 'chl-05-healthsync',
    number: 5,
    company: 'HealthSync Systems',
    location: 'Boston, EE.UU.',
    industry: 'Salud',
    title: 'Módulo de encriptación end-to-end con especificación FHIR para historias clínicas',
    summary: 'Módulo de encriptación end-to-end con especificación FHIR para interoperabilidad de historias clínicas.',
    detailedDescription:
      'Cifrado selectivo a nivel de campo (Field-Level Encryption) sobre estructuras HL7 FHIR Release 4 para permitir el intercambio de expedientes clínicos entre hospitales cumpliendo HIPAA y GDPR sin romper la sintaxis del esquema JSON.',
    technicalRequirements: [
      'Cifrado AES-256-GCM con claves de derivación seguras.',
      'Preservación de identificadores seudónimos para indexación.',
      'Validación estricta del esquema FHIR Patient y Observation.',
    ],
    reward: 7500,
    tags: ['Cybersecurity', 'Node.js', 'Cryptography'],
    suggestedLanguage: 'JavaScript',
    defaultFileName: 'fhir_cipher.js',
    deadline: '2026-11-25',
    status: 'activo',
    starterCode: `// Módulo FHIR con cifrado selectivo de datos clínicos
const crypto = require('crypto');

function encryptPatientRecord(fhirPatient, secretKeyHex) {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(secretKeyHex, 'hex');
  const iv = crypto.randomBytes(16);

  // Seleccionamos campos sensibles (PII)
  const sensitiveData = JSON.stringify({
    name: fhirPatient.name,
    telecom: fhirPatient.telecom,
    birthDate: fhirPatient.birthDate
  });

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(sensitiveData, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    resourceType: 'Patient',
    id: fhirPatient.id,
    active: fhirPatient.active,
    _securityExtension: {
      algorithm: 'AES-256-CBC',
      iv: iv.toString('hex'),
      payloadEncrypted: encrypted
    }
  };
}

console.log("Módulo FHIR de cifrado inicializado.");
`,
  },
  {
    id: 'chl-06-codeacademy',
    number: 6,
    company: 'CodeAcademy Labs',
    location: 'Medellín / Remoto',
    industry: 'Educación',
    title: 'Aplicación simple de software en clase de programación: Script "Hola Mundo"',
    summary: 'Script interactivo básico de "Hola Mundo" con validación de entrada/salida y pruebas de bienvenida para nuevos programadores.',
    detailedDescription:
      'Reto inicial pedagógico para comprobar el entorno de entrega y validación de código de los alumnos. El script debe recibir o generar un saludo formal "Hola Mundo desde NexusSolve", aceptar el nombre de usuario y retornar un reporte en formato JSON con métricas básicas de ejecución.',
    technicalRequirements: [
      'Imprimir y retornar la cadena "Hola Mundo desde NexusSolve".',
      'Aceptar parámetro de nombre de usuario dinámico.',
      'Contar caracteres procesados y marca de tiempo ISO.',
    ],
    reward: 1200,
    tags: ['JavaScript', 'Python', 'Básico', 'Educación'],
    suggestedLanguage: 'JavaScript',
    defaultFileName: 'hola_mundo.js',
    deadline: '2026-12-30',
    status: 'activo',
    starterCode: `// Script "Hola Mundo" para CodeAcademy Labs
function holaMundo(nombreUsuario = "Angelo2008") {
  const mensaje = \`¡Hola Mundo desde NexusSolve! Bienvenido/a, \${nombreUsuario}.\`;
  const timestamp = new Date().toISOString();
  
  return {
    status: 200,
    saludo: mensaje,
    usuario: nombreUsuario,
    longitudCaracteres: mensaje.length,
    timestamp: timestamp,
    lenguaje: "JavaScript ECMAScript 2026",
    verificado: true
  };
}

// Ejecución directa de prueba
const resultado = holaMundo("Angelo2008");
console.log(resultado.saludo);
console.log(JSON.stringify(resultado, null, 2));
`,
  },
  {
    id: 'chl-07-pokeworld',
    number: 7,
    company: 'PokeWorld Gaming',
    location: 'Tokio / Remoto',
    industry: 'Entretenimiento',
    title: 'Mini simulación de combate por turnos basada en estadísticas de Pokémon',
    summary: 'Mini simulación de combate por turnos basada en estadísticas de Pokémon usando estructuras de datos básicas.',
    detailedDescription:
      'Motor de combate por turnos simplificado en consola o script que simula la batalla entre dos Pokémon considerando puntos de salud (HP), ataque, defensa, velocidad y efectividad de tipos elementales (Fuego, Agua, Planta, Eléctrico).',
    technicalRequirements: [
      'Modelado de clases o estructuras para Pokémon y Movimientos.',
      'Cálculo de daño estándar: ((Ataque / Defensa) * Potencia * MultiplicadorTipo).',
      'Bucle de combate hasta que el HP de un combatiente llegue a cero con log de turnos.',
    ],
    reward: 2500,
    tags: ['Python', 'JavaScript', 'Gaming', 'POO'],
    suggestedLanguage: 'Python',
    defaultFileName: 'pokemon_battle_sim.py',
    deadline: '2026-12-10',
    status: 'activo',
    starterCode: `# Simulador de Combate Pokémon por Turnos
import random

TYPE_CHART = {
    "Fuego": {"Planta": 2.0, "Agua": 0.5, "Fuego": 1.0},
    "Agua": {"Fuego": 2.0, "Planta": 0.5, "Agua": 1.0},
    "Planta": {"Agua": 2.0, "Fuego": 0.5, "Planta": 1.0},
    "Eléctrico": {"Agua": 2.0, "Planta": 0.5, "Eléctrico": 1.0}
}

class Pokemon:
    def __init__(self, name, p_type, hp, attack, defense, speed):
        self.name = name
        self.p_type = p_type
        self.max_hp = hp
        self.hp = hp
        self.attack = attack
        self.defense = defense
        self.speed = speed

    def take_damage(self, dmg):
        self.hp = max(0, self.hp - dmg)

def simulate_battle(p1, p2):
    log = []
    log.append(f"¡Comienza el combate: {p1.name} vs {p2.name}!")
    turn = 1
    
    while p1.hp > 0 and p2.hp > 0 and turn <= 10:
        attacker, defender = (p1, p2) if p1.speed >= p2.speed else (p2, p1)
        
        # Turno atacante
        multiplier = TYPE_CHART.get(attacker.p_type, {}).get(defender.p_type, 1.0)
        damage = max(5, int((attacker.attack / defender.defense) * 20 * multiplier))
        defender.take_damage(damage)
        log.append(f"Turno {turn}: {attacker.name} causa {damage} de daño a {defender.name} (HP restante: {defender.hp})")
        
        if defender.hp == 0:
            break
            
        # Contraataque
        mult_c = TYPE_CHART.get(defender.p_type, {}).get(attacker.p_type, 1.0)
        dmg_c = max(5, int((defender.attack / attacker.defense) * 20 * mult_c))
        attacker.take_damage(dmg_c)
        log.append(f"Contraataque: {defender.name} causa {dmg_c} de daño a {attacker.name} (HP restante: {attacker.hp})")
        
        turn += 1

    winner = p1.name if p1.hp > p2.hp else p2.name
    log.append(f"🏆 Ganador del combate: {winner}")
    return {"ganador": winner, "log": log}

# Simulación Pikachu vs Squirtle
pikachu = Pokemon("Pikachu", "Eléctrico", 95, 55, 40, 90)
squirtle = Pokemon("Squirtle", "Agua", 100, 48, 65, 43)
resultado = simulate_battle(pikachu, squirtle)
for linea in resultado["log"]:
    print(linea)
`,
  },
  {
    id: 'chl-08-retail',
    number: 8,
    company: 'RetailChain Andina',
    location: 'Bogotá, Colombia',
    industry: 'Comercio',
    title: 'Motor de recomendación de productos basado en historial de compras locales',
    summary: 'Motor de recomendación de productos basado en historial de compras locales en tiendas de Bogotá.',
    detailedDescription:
      'Algoritmo de filtrado colaborativo ítem-ítem para sugerir canastas cruzadas a partir de tickets de compra en supermercados de Bogotá, optimizando la venta sugerida en cajas registradoras y app móvil.',
    technicalRequirements: [
      'Cálculo de similitud coseno o correlación de Pearson entre productos.',
      'Soporte para matriz dispersa de tickets de compra.',
      'Generación de Top-3 recomendaciones por cliente en tiempo real.',
    ],
    reward: 3800,
    tags: ['Python', 'Data Science', 'Machine Learning'],
    suggestedLanguage: 'Python',
    defaultFileName: 'recommendation_engine.py',
    deadline: '2026-12-05',
    status: 'activo',
    starterCode: `# Motor de Recomendación para RetailChain Andina
import math

def cosine_similarity(v1, v2):
    dot_product = sum(a * b for a, b in zip(v1, v2))
    norm_v1 = math.sqrt(sum(a * a for a in v1))
    norm_v2 = math.sqrt(sum(b * b for b in v2))
    return (dot_product / (norm_v1 * norm_v2)) if (norm_v1 and norm_v2) else 0.0

def recommend_products(target_product, product_vectors):
    target_vec = product_vectors.get(target_product)
    if not target_vec:
        return []
    
    scores = []
    for prod, vec in product_vectors.items():
        if prod != target_product:
            sim = cosine_similarity(target_vec, vec)
            scores.append((prod, round(sim, 3)))
            
    scores.sort(key=lambda x: x[1], reverse=True)
    return scores[:3]

# Datos de prueba: [Café de Colombia, Panela, Arepas, Leche, Queso]
vectors = {
    "Café de Colombia": [5, 4, 3, 5, 2],
    "Panela Orgánica": [4, 5, 2, 4, 1],
    "Arepas de Maíz": [3, 2, 5, 4, 5],
    "Queso Campesino": [2, 1, 5, 4, 5]
}
print("Recomendaciones para 'Café de Colombia':", recommend_products("Café de Colombia", vectors))
`,
  },
  {
    id: 'chl-09-skytraffic',
    number: 9,
    company: 'SkyTraffic Control',
    location: 'Madrid, España',
    industry: 'Aviación',
    title: 'Algoritmo en grafos para cálculo de rutas de aproximación de aeronaves',
    summary: 'Algoritmo en grafos para cálculo de rutas de aproximación de aeronaves en aeropuertos de alta densidad.',
    detailedDescription:
      'Planificación de descenso continuo (CDO) y separación segura entre vuelos comerciales entrantes al espacio aéreo de Madrid-Barajas mediante grafos espaciotemporales con prevención de estelas turbulentas.',
    technicalRequirements: [
      'Espaciamiento mínimo de 3 a 5 millas náuticas entre aeronaves.',
      'Rutas 4D (latitud, longitud, altitud y tiempo de llegada estimado).',
      'Recálculo ante vientos cruzados repentinos.',
    ],
    reward: 6200,
    tags: ['Go', 'C++', 'Algoritmos de Grafos', 'Aviación'],
    suggestedLanguage: 'JavaScript',
    defaultFileName: 'flight_approach_routing.js',
    deadline: '2026-12-18',
    status: 'activo',
    starterCode: `// Algoritmo de aproximación segura de aeronaves
function planApproachSequence(flights) {
  // Ordenamos por hora estimada de arribo y velocidad
  const sorted = [...flights].sort((a, b) => a.etaMinutes - b.etaMinutes);
  const minSeparationMinutes = 3;
  let lastAssignedSlot = 0;

  return sorted.map((flight) => {
    const desiredSlot = flight.etaMinutes;
    const assignedSlot = Math.max(desiredSlot, lastAssignedSlot + minSeparationMinutes);
    lastAssignedSlot = assignedSlot;
    const delay = assignedSlot - desiredSlot;

    return {
      callsign: flight.callsign,
      aircraftModel: flight.model,
      desiredSlot: \`\${desiredSlot}m\`,
      assignedSlot: \`\${assignedSlot}m\`,
      holdingPatternMinutes: delay,
      runway: assignedSlot % 2 === 0 ? 'RWY-36L' : 'RWY-36R'
    };
  });
}

const traffic = [
  { callsign: 'IBE6400', model: 'A350', etaMinutes: 12 },
  { callsign: 'AVA026', model: 'B787', etaMinutes: 13 },
  { callsign: 'LATAM801', model: 'B777', etaMinutes: 14 }
];
console.log(planApproachSequence(traffic));
`,
  },
  {
    id: 'chl-10-greenwater',
    number: 10,
    company: 'GreenWater Utilities',
    location: 'Santiago, Chile',
    industry: 'Saneamiento',
    title: 'Monitoreo IoT de presión en redes de acueducto para alerta temprana de fugas',
    summary: 'Monitoreo IoT de presión en redes de acueducto para alerta temprana de fugas.',
    detailedDescription:
      'Análisis de gradientes de presión hidráulica en tuberías principales de agua potable para detectar roturas y fugas ocultas en menos de 10 minutos, evitando el desperdicio de agua no facturada.',
    technicalRequirements: [
      'Detección de caídas de presión bruscas (transitorios hidráulicos).',
      'Correlación entre nodos adyacentes para triangulación geográfica.',
      'Generación de alertas automáticas vía webhook.',
    ],
    reward: 4100,
    tags: ['Python', 'IoT', 'Series Temporales'],
    suggestedLanguage: 'Python',
    defaultFileName: 'water_leak_monitor.py',
    deadline: '2026-12-12',
    status: 'activo',
    starterCode: `# Monitoreo de presión y detección de fugas en acueducto
def analyze_pressure_telemetry(sensors_data, baseline_bar=4.5, drop_threshold=0.8):
    alerts = []
    for sensor_id, readings in sensors_data.items():
        if len(readings) < 2:
            continue
        recent_drop = readings[-2] - readings[-1]
        current_val = readings[-1]
        
        if recent_drop >= drop_threshold or current_val < (baseline_bar - 1.2):
            alerts.append({
                "sensor_id": sensor_id,
                "presion_actual": current_val,
                "caida_brusca": round(recent_drop, 2),
                "alerta": "FUGA_PROBABLE_DETECTADA",
                "gravedad": "CRÍTICA" if recent_drop > 1.2 else "MODERADA"
            })
            
    return {"fugas_detectadas": len(alerts), "alertas": alerts}

datos_sensores = {
    "SENSOR-NORTE-01": [4.6, 4.5, 4.4, 4.5],
    "SENSOR-CENTRO-04": [4.5, 4.4, 3.1, 2.8], # Fuga brusca
    "SENSOR-SUR-09": [4.7, 4.6, 4.6, 4.7]
}
print(analyze_pressure_telemetry(datos_sensores))
`,
  },
  {
    id: 'chl-11-cybershield',
    number: 11,
    company: 'CyberShield Enterprise',
    location: 'Montevideo, Uruguay',
    industry: 'Ciberseguridad',
    title: 'Analizador de logs de acceso para detección de intentos de fuerza bruta en servidores SSH',
    summary: 'Analizador de logs de acceso para detección de intentos de fuerza bruta en servidores SSH.',
    detailedDescription:
      'Parser de alta velocidad para streams de logs de autenticación Linux (auth.log) que agrupa intentos fallidos por IP y usuario, aplicando reglas de bloqueo temporal y geolocalización de IPs maliciosas.',
    technicalRequirements: [
      'Procesamiento de formato de logs syslog estandarizados.',
      'Ventana móvil de 5 minutos con umbral de 6 intentos fallidos.',
      'Salida estructurada para integración con iptables o Fail2ban.',
    ],
    reward: 5500,
    tags: ['Rust', 'Python', 'Ciberseguridad', 'Linux'],
    suggestedLanguage: 'Python',
    defaultFileName: 'ssh_bruteforce_detector.py',
    deadline: '2026-11-28',
    status: 'activo',
    starterCode: `# Analizador de intentos de fuerza bruta en auth.log
from collections import defaultdict
from datetime import datetime, timedelta

def analyze_ssh_log(log_entries, max_attempts=5):
    ip_attempts = defaultdict(list)
    banned_ips = []
    
    for entry in log_entries:
        # Formato esperado: "Nov 09 14:30:10 sshd[123]: Failed password for root from 192.168.1.50"
        if "Failed password" in entry:
            parts = entry.split()
            ip_index = parts.index("from") + 1 if "from" in parts else -1
            if ip_index != -1:
                ip = parts[ip_index]
                ip_attempts[ip].append(parts[2]) # Guardamos timestamp
                
    for ip, attempts in ip_attempts.items():
        if len(attempts) >= max_attempts:
            banned_ips.append({
                "ip": ip,
                "intentos_fallidos": len(attempts),
                "accion_recomendada": f"iptables -A INPUT -s {ip} -j DROP"
            })
            
    return {"total_bloqueadas": len(banned_ips), "ips_bloqueadas": banned_ips}

sample_logs = [
    "Nov 09 14:01:05 sshd[102]: Failed password for root from 185.220.101.5 port 443",
    "Nov 09 14:01:08 sshd[105]: Failed password for root from 185.220.101.5 port 445",
    "Nov 09 14:01:12 sshd[110]: Failed password for admin from 185.220.101.5 port 450",
    "Nov 09 14:01:15 sshd[115]: Failed password for user from 185.220.101.5 port 452",
    "Nov 09 14:01:19 sshd[120]: Failed password for ubuntu from 185.220.101.5 port 455",
    "Nov 09 14:02:00 sshd[125]: Accepted publickey for angelo from 192.168.1.100 port 22"
]
print(analyze_ssh_log(sample_logs))
`,
  },
  {
    id: 'chl-12-cryptoflow',
    number: 12,
    company: 'CryptoFlow Exchange',
    location: 'Zúrich / Remoto',
    industry: 'Blockchain',
    title: 'Indexador de transacciones en mempool para seguimiento de comisiones de gas',
    summary: 'Indexador de transacciones en mempool para seguimiento de comisiones de gas en tiempo real.',
    detailedDescription:
      'Monitor de mempool para redes compatibles con EVM (Ethereum / Arbitrum) que predice los precios óptimos de base fee y priority fee según EIP-1559 con el fin de evitar transacciones estancadas en momentos de alta congestión.',
    technicalRequirements: [
      'Cálculo de percentiles 25, 50, 75 y 90 de maxPriorityFeePerGas.',
      'Detección de fluctuaciones abruptas en el uso del bloque objetivo.',
      'Sugerencias de gas para transacciones Rápidas, Estándar y Lentas.',
    ],
    reward: 8000,
    tags: ['Blockchain', 'JavaScript', 'Node.js', 'Finanzas'],
    suggestedLanguage: 'JavaScript',
    defaultFileName: 'gas_fee_oracle.js',
    deadline: '2026-12-22',
    status: 'activo',
    starterCode: `// Estimador y oráculo de comisiones de gas EIP-1559
function estimateOptimalGas(mempoolTxs, currentBaseFeeGwei) {
  const priorityFees = mempoolTxs
    .map(tx => tx.priorityFeeGwei)
    .sort((a, b) => a - b);
    
  if (priorityFees.length === 0) {
    return { slow: 1.0, standard: 1.5, fast: 2.5 };
  }

  const p25 = priorityFees[Math.floor(priorityFees.length * 0.25)] || 1.0;
  const p50 = priorityFees[Math.floor(priorityFees.length * 0.50)] || 1.8;
  const p90 = priorityFees[Math.floor(priorityFees.length * 0.90)] || 3.5;

  return {
    baseFee: \`\${currentBaseFeeGwei} Gwei\`,
    recomendaciones: {
      lento: { total: (currentBaseFeeGwei + p25).toFixed(1) + ' Gwei', priority: p25 },
      estandar: { total: (currentBaseFeeGwei + p50).toFixed(1) + ' Gwei', priority: p50 },
      rapido: { total: (currentBaseFeeGwei + p90).toFixed(1) + ' Gwei', priority: p90 }
    }
  };
}

const mockMempool = [
  { priorityFeeGwei: 1.2 }, { priorityFeeGwei: 1.5 }, { priorityFeeGwei: 2.0 },
  { priorityFeeGwei: 2.5 }, { priorityFeeGwei: 4.0 }, { priorityFeeGwei: 5.5 }
];
console.log(estimateOptimalGas(mockMempool, 18.0));
`,
  },
  {
    id: 'chl-13-smartcity',
    number: 13,
    company: 'SmartCity Mobility',
    location: 'Barcelona, España',
    industry: 'Transporte Urbano',
    title: 'Simulación por autómatas celulares de tráfico vehicular en avenidas principales',
    summary: 'Simulación por autómatas celulares (modelo Nagel-Schreckenberg) de tráfico vehicular en avenidas principales.',
    detailedDescription:
      'Simulador microscópico de flujo vehicular unidireccional con semáforos inteligentes para evaluar la formación de ondas de choque y frenadas fantasma ("phantom traffic jams") en avenidas de 4 carriles.',
    technicalRequirements: [
      'Reglas de Nagel-Schreckenberg: aceleración, frenado por distancia y desaceleración aleatoria.',
      'Monitoreo del caudal (vehículos por hora) y velocidad media de vía.',
      'Soporte para ciclos semafóricos adaptativos según densidad de cola.',
    ],
    reward: 4900,
    tags: ['Python', 'Simulación', 'Matemáticas', 'Smart Cities'],
    suggestedLanguage: 'Python',
    defaultFileName: 'traffic_cellular_automata.py',
    deadline: '2026-12-16',
    status: 'activo',
    starterCode: `# Simulación Nagel-Schreckenberg de tráfico vehicular
import random

def simulate_traffic_step(road, v_max=5, p_brake=0.2):
    length = len(road)
    new_road = [-1] * length
    
    # 1. Aceleración y distancia al siguiente vehículo
    for i in range(length):
        v = road[i]
        if v != -1:
            # Calcular distancia
            d = 1
            while d <= v_max and road[(i + d) % length] == -1:
                d += 1
                
            # Regla 1: Acelerar
            v = min(v + 1, v_max)
            # Regla 2: Frenar para no chocar
            v = min(v, d - 1)
            # Regla 3: Aleatoriedad
            if v > 0 and random.random() < p_brake:
                v -= 1
                
            # Regla 4: Mover vehículo
            new_pos = (i + v) % length
            new_road[new_pos] = v
            
    return new_road

# Carretera circular de 20 celdas con 6 autos
carretera = [0, -1, 2, -1, -1, 1, -1, 3, -1, -1, 0, -1, 1, -1, -1, -1, -1, -1, -1, -1]
print("Estado inicial:", carretera)
for paso in range(3):
    carretera = simulate_traffic_step(carretera)
    print(f"Paso {paso+1}:", carretera)
`,
  },
];

export const INITIAL_SOLUTIONS: Solution[] = [
  {
    id: 'sol-06-hello-world',
    challengeId: 'chl-06-codeacademy',
    username: 'Angelo2008',
    repoName: 'angelo2008/codeacademy-holamundo-v1',
    fileName: 'hola_mundo.js',
    language: 'javascript',
    commitMessage: 'feat: Implementación validada de Hola Mundo interactivo con timestamp',
    commitHash: 'a8f39c2',
    submittedAt: '2026-11-08 14:20',
    status: 'aceptada',
    description:
      'Solución completa del reto inicial para CodeAcademy Labs. Incluye generación de saludo interactivo, metadatos en JSON, conteo de caracteres y validación de tipos.',
    executionOutput: `¡Hola Mundo desde NexusSolve! Bienvenido/a, Angelo2008.
{
  "status": 200,
  "saludo": "¡Hola Mundo desde NexusSolve! Bienvenido/a, Angelo2008.",
  "usuario": "Angelo2008",
  "longitudCaracteres": 57,
  "timestamp": "2026-11-08T14:20:00.000Z",
  "lenguaje": "JavaScript ECMAScript 2026",
  "verificado": true
}
[OK] Validación exitosa. Saludo entregado correctamente.`,
    code: `// ==============================================================
// CodeAcademy Labs - Reto Inicial: Script "Hola Mundo"
// Autor: Angelo2008
// Repositorio: angelo2008/codeacademy-holamundo-v1
// ==============================================================

function holaMundo(nombreUsuario = "Angelo2008") {
  const saludo = \`¡Hola Mundo desde NexusSolve! Bienvenido/a, \${nombreUsuario}.\`;
  const timestamp = new Date().toISOString();
  
  const reporte = {
    status: 200,
    saludo: saludo,
    usuario: nombreUsuario,
    longitudCaracteres: saludo.length,
    timestamp: timestamp,
    lenguaje: "JavaScript ECMAScript 2026",
    verificado: true,
    empresa: "CodeAcademy Labs",
    recompensaUSD: 1200
  };

  return reporte;
}

// Ejecución interactiva
const salida = holaMundo("Angelo2008");
console.log(salida.saludo);
console.log(JSON.stringify(salida, null, 2));
console.log("[OK] Validación exitosa. Saludo entregado correctamente.");
`,
  },
  {
    id: 'sol-07-pokemon',
    challengeId: 'chl-07-pokeworld',
    username: 'Angelo2008',
    repoName: 'angelo2008/pokeworld-turn-battle-engine',
    fileName: 'pokemon_battle_sim.py',
    language: 'python',
    commitMessage: 'feat: Motor de combate por turnos con multiplicador de tipos y log detallado',
    commitHash: 'b4e719d',
    submittedAt: '2026-11-09 10:15',
    status: 'en_revision',
    description:
      'Simulador completo de combates Pokémon por turnos con cálculo de daño según estadísticas de ataque, defensa, velocidad y tabla de efectividad elemental de tipos.',
    executionOutput: `¡Comienza el combate: Pikachu vs Squirtle!
Turno 1: Pikachu causa 32 de daño a Squirtle (HP restante: 68)
Contraataque: Squirtle causa 12 de daño a Pikachu (HP restante: 83)
Turno 2: Pikachu causa 34 de daño a Squirtle (HP restante: 34)
Contraataque: Squirtle causa 11 de daño a Pikachu (HP restante: 72)
Turno 3: Pikachu causa 35 de daño a Squirtle (HP restante: 0)
🏆 Ganador del combate: Pikachu
[OK] Simulación finalizada en 3 turnos sin errores.`,
    code: `# ==============================================================
# PokeWorld Gaming - Simulación de Combate por Turnos
# Desarrollado por: Angelo2008
# Repositorio: angelo2008/pokeworld-turn-battle-engine
# ==============================================================

TYPE_CHART = {
    "Fuego": {"Planta": 2.0, "Agua": 0.5, "Fuego": 1.0},
    "Agua": {"Fuego": 2.0, "Planta": 0.5, "Agua": 1.0},
    "Planta": {"Agua": 2.0, "Fuego": 0.5, "Planta": 1.0},
    "Eléctrico": {"Agua": 2.0, "Planta": 0.5, "Eléctrico": 1.0}
}

class Pokemon:
    def __init__(self, name, p_type, hp, attack, defense, speed):
        self.name = name
        self.p_type = p_type
        self.max_hp = hp
        self.hp = hp
        self.attack = attack
        self.defense = defense
        self.speed = speed

    def take_damage(self, dmg):
        self.hp = max(0, self.hp - dmg)

def simulate_battle(p1, p2):
    log = []
    log.append(f"¡Comienza el combate: {p1.name} vs {p2.name}!")
    turn = 1
    
    while p1.hp > 0 and p2.hp > 0 and turn <= 10:
        attacker, defender = (p1, p2) if p1.speed >= p2.speed else (p2, p1)
        
        # Ataque
        multiplier = TYPE_CHART.get(attacker.p_type, {}).get(defender.p_type, 1.0)
        damage = max(5, int((attacker.attack / defender.defense) * 22 * multiplier))
        defender.take_damage(damage)
        log.append(f"Turno {turn}: {attacker.name} causa {damage} de daño a {defender.name} (HP restante: {defender.hp})")
        
        if defender.hp == 0:
            break
            
        # Contraataque
        mult_c = TYPE_CHART.get(defender.p_type, {}).get(attacker.p_type, 1.0)
        dmg_c = max(5, int((defender.attack / attacker.defense) * 20 * mult_c))
        attacker.take_damage(dmg_c)
        log.append(f"Contraataque: {defender.name} causa {dmg_c} de daño a {attacker.name} (HP restante: {attacker.hp})")
        
        turn += 1

    winner = p1.name if p1.hp > p2.hp else p2.name
    log.append(f"🏆 Ganador del combate: {winner}")
    return {"ganador": winner, "log": log}

if __name__ == "__main__":
    pikachu = Pokemon("Pikachu", "Eléctrico", 95, 55, 40, 90)
    squirtle = Pokemon("Squirtle", "Agua", 100, 48, 65, 43)
    resultado = simulate_battle(pikachu, squirtle)
    for linea in resultado["log"]:
        print(linea)
`,
  },
];
