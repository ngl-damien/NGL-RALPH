export function prioritize(items = []) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  const normalized = items.map((item, index) => {
    const impact = bounded(item.impact);
    const urgency = bounded(item.urgency);
    const effort = Math.max(1, Number.isFinite(item.effort) ? item.effort : 1);
    const riskReduction = bounded(item.riskReduction);
    const score = (impact * 2 + urgency + riskReduction * 1.5) / effort;
    return {
      id: item.id ?? `item-${index + 1}`,
      title: String(item.title ?? "Untitled"),
      impact, urgency, effort, riskReduction,
      score: Number(score.toFixed(3))
    };
  });
  return normalized.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}

function bounded(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(5, Math.max(0, number)) : 0;
}
