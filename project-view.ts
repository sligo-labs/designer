const PROJECT_VIEW_LINE = /^([ \t]*)- tablist "Project view"\s*$/;
const TAB_REF_LINE = /^([ \t]*)- tab .*\[.*\bref=(e\d+)\b.*\]\s*$/;

function indentWidth(value: string): number {
  return value.replace(/\t/g, '  ').length;
}

/** Return the chat tab's live snapshot ref: the first tab under Project view. */
export function projectChatTabRef(snapshot: string): string | null {
  const lines = snapshot.split(/\r?\n/);
  const start = lines.findIndex((line) => PROJECT_VIEW_LINE.test(line));
  if (start < 0) return null;

  const listMatch = lines[start]!.match(PROJECT_VIEW_LINE);
  const listIndent = indentWidth(listMatch?.[1] ?? '');
  for (const line of lines.slice(start + 1)) {
    if (!line.trim()) continue;
    const leading = line.match(/^[ \t]*/)?.[0] ?? '';
    if (indentWidth(leading) <= listIndent) break;
    const tab = line.match(TAB_REF_LINE);
    if (tab) return tab[2] ?? null;
  }
  return null;
}

export function sameDesignProject(expected: string, actual: string): boolean {
  if (!expected || !actual) return false;
  return expected.split('?')[0]!.toLowerCase() === actual.split('?')[0]!.toLowerCase();
}
