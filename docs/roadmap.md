# 📅 **ROADMAP ACTUALIZADO BASADO EN INVESTIGACIÓN**

## **SEMANA 1: Setup + Servicios Base**

### **Día 1: Prisma Setup**
```
✅ Instalar Prisma
✅ Schema con campos exactos de la investigación
✅ Push a DB
✅ Verificar en Prisma Studio
```

### **Día 2-3: Polymarket Service**
```
✅ Clase PolymarketService
✅ Método getMarkets()
✅ Método normalizeMarket()
✅ Método syncToDB()
✅ Test: sincronizar 50 markets
```

### **Día 4-5: Kalshi Service**
```
✅ Clase KalshiAuth (RSA-PSS)
✅ Clase KalshiService
✅ Paginación con cursor
✅ Normalización de precios (÷100)
✅ Test: sincronizar 50 markets
```

### **Día 6-7: Manifold Service**
```
✅ Clase ManifoldService (simple)
✅ Filtro outcomeType === 'BINARY'
✅ Test: sincronizar 100 markets
```

---

## **SEMANA 2: Matching + Comparación**

### **Día 8-9: Algoritmo de Matching**
```
✅ Función normalizeQuestion()
✅ Función normalizeNumbers() ("$100K" → "100000")
✅ Función normalizeDates()
✅ Función matchScore()
✅ Tests con casos de tu investigación
```

### **Día 10-11: Comparison Service**
```
✅ Método findMatches()
✅ Método calculateEffectivePrice()
✅ Método detectArbitrage()
✅ Guardar en tabla Comparison
```

### **Día 12-14: Cron Jobs**
```
✅ /api/cron/sync-markets
✅ Configurar en Vercel (cada 30 min)
✅ Logging + monitoreo
```

---

## **SEMANA 3: API Endpoints**

### **Día 15-16: Búsqueda**
```
✅ GET /api/markets/search?q=bitcoin
✅ Buscar en 3 plataformas
✅ Ordenar por volume
```

### **Día 17-18: Comparación**
```
✅ GET /api/compare/[slug]
✅ Encontrar matches cross-platform
✅ Calcular effective prices
✅ Detectar arbitrage
```

### **Día 19-20: Arbitrage**
```
✅ GET /api/arbitrage/opportunities
✅ Filtros (minROI, category)
✅ Ordenar por ROI
```

### **Día 21: Whales (Polymarket only)**
```
✅ GET /api/whales/top-holders?market=X
✅ GET /api/whales/leaderboard?category=CRYPTO
```

---

## **SEMANA 4: Frontend MVP**

### **Día 22-23: Comparador UI**
```
[CURSOR]
Página /compare con:
- Buscador de markets
- Tabla comparativa
- Badge "Best Deal"
- Sección arbitrage si existe
```

### **Día 24-25: Arbitrage UI**
```
[CURSOR]
Página /arbitrage con:
- Lista de oportunidades
- ROI destacado
- Estrategia sugerida
- Links a plataformas
```

### **Día 26-27: Whales UI**
```
[CURSOR]
Página /whales con:
- Leaderboard
- Filtros (category, period)
- Click → modal con positions
```

### **Día 28: Landing Page**
```
[CURSOR]
Homepage con:
- Hero section
- Stats dashboard
- Top 3 arbitrages
- CTA a comparador
```

---