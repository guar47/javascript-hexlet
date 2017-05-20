copySync(src, dest) {
  const partsSrc = getPathParts(src);
  const partsDst = getPathParts(dest);
  const name = partsSrc[partsSrc.length - 1];
  const srcFile = this.tree.getDeepChild(partsSrc);
  const dstDir = this.tree.getDeepChild(partsDst);
  if (!srcFile || !dstDir) {
    throw new HexletFsError(errors.code.ENOENT, dstDir);
  } else if (srcFile.getMeta().isDirectory()) {
    throw new HexletFsError(errors.code.EISDIR, srcFile);
  }
  return dstDir.addChild(name, new File(name, ''));
}
