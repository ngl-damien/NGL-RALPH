const VALID_STRENGTHS = new Set(["direct", "corroborated", "inferred", "asserted"]);

export function assessEvidence({ objective, claims = [] }) {
  if (typeof objective !== "string" || !objective.trim()) {
    throw new TypeError("objective must be a non-empty string");
  }
  if (!Array.isArray(claims)) throw new TypeError("claims must be an array");

  const assessed = claims.map((claim, index) => {
    const strength = VALID_STRENGTHS.has(claim.strength) ? claim.strength : "asserted";
    const source = typeof claim.source === "string" ? claim.source.trim() : "";
    const statement = typeof claim.statement === "string" ? claim.statement.trim() : "";
    const verified = claim.verified === true && Boolean(source) &&
      (strength === "direct" || strength === "corroborated");
    return {
      id: claim.id ?? `claim-${index + 1}`,
      statement,
      source: source || null,
      strength,
      verified,
      limitation: verified ? null : "Not independently established by direct or corroborated evidence."
    };
  });

  const verifiedCount = assessed.filter(item => item.verified).length;
  return {
    objective: objective.trim(),
    claimCount: assessed.length,
    verifiedCount,
    unverifiedCount: assessed.length - verifiedCount,
    outcome: assessed.length === 0 ? "no-evidence" :
      verifiedCount === assessed.length ? "supported" :
      verifiedCount > 0 ? "partially-supported" : "unsupported",
    claims: assessed,
    rule: "A status assertion is not evidence. Verification requires an identified source and direct or corroborated evidence."
  };
}
