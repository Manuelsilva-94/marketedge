-- Script para auditar y marcar MarketMatch incorrectos
-- Detecta pares con años/distritos diferentes que no deberían estar emparejados

-- 1. AUDIT: Encontrar pares con años diferentes
-- Esto encuentra MarketMatch donde los mercados tienen años explícitos diferentes en sus preguntas
SELECT 
  mm.id as match_id,
  mm.confidence,
  mm."isEquivalent",
  ma.id as market_a_id,
  ma.platform as platform_a,
  ma.question as question_a,
  mb.id as market_b_id,
  mb.platform as platform_b,
  mb.question as question_b,
  -- Extraer años
  (SELECT SUBSTRING(ma.question FROM '\y(20\d{2})\y')) as year_a,
  (SELECT SUBSTRING(mb.question FROM '\y(20\d{2})\y')) as year_b,
  'DIFFERENT_YEAR' as issue_type
FROM "MarketMatch" mm
JOIN "Market" ma ON mm."marketAId" = ma.id
JOIN "Market" mb ON mm."marketBId" = mb.id
WHERE 
  mm."isEquivalent" = true
  -- Ambos tienen año explícito
  AND ma.question ~ '\y(20\d{2})\y'
  AND mb.question ~ '\y(20\d{2})\y'
  -- Los años son diferentes
  AND (SELECT SUBSTRING(ma.question FROM '\y(20\d{2})\y')) != (SELECT SUBSTRING(mb.question FROM '\y(20\d{2})\y'))
ORDER BY mm.confidence DESC;

-- 2. AUDIT: Encontrar pares con distritos electorales diferentes
-- Detecta mercados con códigos de distrito (ej: MO-05 vs WI-06)
SELECT 
  mm.id as match_id,
  mm.confidence,
  mm."isEquivalent",
  ma.id as market_a_id,
  ma.platform as platform_a,
  ma.question as question_a,
  mb.id as market_b_id,
  mb.platform as platform_b,
  mb.question as question_b,
  -- Extraer distritos
  (SELECT SUBSTRING(ma.question FROM '[A-Z]{2}-\d{1,2}')) as district_a,
  (SELECT SUBSTRING(mb.question FROM '[A-Z]{2}-\d{1,2}')) as district_b,
  'DIFFERENT_DISTRICT' as issue_type
FROM "MarketMatch" mm
JOIN "Market" ma ON mm."marketAId" = ma.id
JOIN "Market" mb ON mm."marketBId" = mb.id
WHERE 
  mm."isEquivalent" = true
  -- Ambos tienen código de distrito
  AND ma.question ~ '[A-Z]{2}-\d{1,2}'
  AND mb.question ~ '[A-Z]{2}-\d{1,2}'
  -- Los distritos son diferentes
  AND (SELECT SUBSTRING(ma.question FROM '[A-Z]{2}-\d{1,2}')) != (SELECT SUBSTRING(mb.question FROM '[A-Z]{2}-\d{1,2}'))
ORDER BY mm.confidence DESC;

-- 3. AUDIT: Contar pares con problemas
SELECT 
  'Different Years' as issue,
  COUNT(*) as count
FROM "MarketMatch" mm
JOIN "Market" ma ON mm."marketAId" = ma.id
JOIN "Market" mb ON mm."marketBId" = mb.id
WHERE 
  mm."isEquivalent" = true
  AND ma.question ~ '\y(20\d{2})\y'
  AND mb.question ~ '\y(20\d{2})\y'
  AND (SELECT SUBSTRING(ma.question FROM '\y(20\d{2})\y')) != (SELECT SUBSTRING(mb.question FROM '\y(20\d{2})\y'))
UNION ALL
SELECT 
  'Different Districts' as issue,
  COUNT(*) as count
FROM "MarketMatch" mm
JOIN "Market" ma ON mm."marketAId" = ma.id
JOIN "Market" mb ON mm."marketBId" = mb.id
WHERE 
  mm."isEquivalent" = true
  AND ma.question ~ '[A-Z]{2}-\d{1,2}'
  AND mb.question ~ '[A-Z]{2}-\d{1,2}'
  AND (SELECT SUBSTRING(ma.question FROM '[A-Z]{2}-\d{1,2}')) != (SELECT SUBSTRING(mb.question FROM '[A-Z]{2}-\d{1,2}'));

-- 4. CLEANUP (OPCIONAL - ejecutar solo si estás seguro): Marcar pares con años diferentes como no equivalentes
-- ADVERTENCIA: Esto modificará la base de datos. Revisa los resultados de AUDIT primero.
-- Descomenta las líneas siguientes para ejecutar:

/*
UPDATE "MarketMatch" mm
SET 
  "isEquivalent" = false,
  confidence = 0,
  reasoning = COALESCE(reasoning, '') || ' [Auto-rejected: different years detected]',
  checkedAt = NOW()
FROM "Market" ma, "Market" mb
WHERE 
  mm."marketAId" = ma.id
  AND mm."marketBId" = mb.id
  AND mm."isEquivalent" = true
  AND ma.question ~ '\y(20\d{2})\y'
  AND mb.question ~ '\y(20\d{2})\y'
  AND (SELECT SUBSTRING(ma.question FROM '\y(20\d{2})\y')) != (SELECT SUBSTRING(mb.question FROM '\y(20\d{2})\y'));

-- Resultado
SELECT 'Marked ' || ROW_COUNT() || ' matches with different years as non-equivalent';
*/

-- 5. CLEANUP (OPCIONAL): Marcar pares con distritos diferentes como no equivalentes
/*
UPDATE "MarketMatch" mm
SET 
  "isEquivalent" = false,
  confidence = 0,
  reasoning = COALESCE(reasoning, '') || ' [Auto-rejected: different districts detected]',
  checkedAt = NOW()
FROM "Market" ma, "Market" mb
WHERE 
  mm."marketAId" = ma.id
  AND mm."marketBId" = mb.id
  AND mm."isEquivalent" = true
  AND ma.question ~ '[A-Z]{2}-\d{1,2}'
  AND mb.question ~ '[A-Z]{2}-\d{1,2}'
  AND (SELECT SUBSTRING(ma.question FROM '[A-Z]{2}-\d{1,2}')) != (SELECT SUBSTRING(mb.question FROM '[A-Z]{2}-\d{1,2}'));

-- Resultado
SELECT 'Marked ' || ROW_COUNT() || ' matches with different districts as non-equivalent';
*/

-- 6. CLEANUP (OPCIONAL): Eliminar ArbitrageOpportunity asociadas a pares marcados como no equivalentes
/*
DELETE FROM "ArbitrageOpportunity"
WHERE id IN (
  SELECT ao.id
  FROM "ArbitrageOpportunity" ao
  JOIN "Market" ma ON ao."marketAId" = ma.id
  JOIN "Market" mb ON ao."marketBId" = mb.id
  JOIN "MarketMatch" mm ON (
    (mm."marketAId" = ma.id AND mm."marketBId" = mb.id) OR
    (mm."marketAId" = mb.id AND mm."marketBId" = ma.id)
  )
  WHERE mm."isEquivalent" = false
);

-- Resultado
SELECT 'Deleted ' || ROW_COUNT() || ' arbitrage opportunities linked to invalid matches';
*/

-- 7. VERIFICACIÓN: Contar mercados que quedaron huérfanos después de marcar como no equivalentes
/*
SELECT 
  COUNT(*) as orphaned_markets
FROM "Market" m
WHERE 
  m.active = true
  AND NOT EXISTS (
    SELECT 1 FROM "MarketMatch" mm
    WHERE 
      (mm."marketAId" = m.id OR mm."marketBId" = m.id)
      AND mm."isEquivalent" = true
  );
*/
