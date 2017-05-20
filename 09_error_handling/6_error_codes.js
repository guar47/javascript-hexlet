unlinkSync(path) {
  const parts = getPathParts(path);
  const name = parts[parts.length - 1];
  const current = this.tree.getDeepChild(parts);
  const parent = this.tree.getDeepChild(parts.slice(0, -1));
  if (!current) {
    return [null, errors.code.ENOENT];
  } else if (!current.getMeta().getStats().isFile()) {
    return [null, errors.code.EPERM];
  }
  return [parent.removeChild(name), null];
}
writeFileSync(path, content) {
  const parts = getPathParts(path);
  const name = parts[parts.length - 1];
  const parent = this.tree.getDeepChild(parts.slice(0, -1));
  const current = this.tree.getDeepChild(parts);
  if (!parent) {
    return [null, errors.code.ENOENT];
  }
  else if (current && current.getMeta().getStats().isDirectory()) {
    return [null, errors.code.EISDIR];
  }
  return [parent.addChild(name, new File(name, content)), null];
}
readFileSync(path) {
  const parts = getPathParts(path);
  const name = parts[parts.length - 1];
  const current = this.tree.getDeepChild(parts);
  if (!current) {
    return [null, errors.code.ENOENT];
  }
  else if (current.getMeta().getStats().isDirectory()) {
    return [null, errors.code.EISDIR];
  }

  return [current.getMeta().getBody(), null];
}
