/** @param {import('./types').BrandTheme} theme */
export function applyBrandTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--brand-bg", theme.bg);
  root.style.setProperty("--brand-surface", theme.surface);
  root.style.setProperty("--brand-surface-alt", theme.surfaceAlt);
  root.style.setProperty("--brand-surface-hover", theme.surfaceHover);
  root.style.setProperty("--brand-elevated", theme.elevated);
  root.style.setProperty("--brand-border", theme.border);
  root.style.setProperty("--brand-text", theme.text);
  root.style.setProperty("--brand-text-muted", theme.textMuted);
  root.style.setProperty("--brand-text-subtle", theme.textSubtle);
  root.style.setProperty("--brand-accent", theme.accent);
  root.style.setProperty("--brand-accent-fg", theme.accentFg);
  root.style.setProperty("--brand-accent-hover", theme.accentHover);
}

/** @param {import('./types').BrandConfig} brand */
export function applyBrand(brand) {
  applyBrandTheme(brand.theme);
  document.title = brand.pageTitle;
}
