export type ComplianceEntry = { title: string; code: string; page: number; endPage: number };
export function findCompliance(entries: ComplianceEntry[], query: string): ComplianceEntry[] {
 const terms=query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
 return entries.filter(entry=>terms.every(term=>`${entry.title} ${entry.code}`.toLocaleLowerCase().includes(term)));
}
