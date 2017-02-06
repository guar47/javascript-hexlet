mkdirpSync(path) {
   return getPathParts(path).reduce((subtree, part) => {
     if (!subtree) {
       return false;
     }
     const current = subtree.getChild(part);
     if (!current) {
       return subtree.addChild(part, new Dir(part));
     }
     if (!current.getMeta().getStats().isDirectory()) {
       return false;
     }

     return current;
   }, this.tree);
 }

 touchSync(path) {
   const parts = getPathParts(path);
   const name = parts[parts.length - 1];
   const parent = this.tree.getDeepChild(parts.slice(0, -1));
   if (!parent || !parent.getMeta().getStats().isDirectory()) {
     return false;
   }
   return parent.addChild(name, new File(name));
 }

 readdirSync(path) {
   const parts = getPathParts(path);
   const current = this.tree.getDeepChild(parts);
   if (!current || !current.getMeta().getStats().isDirectory()) {
     return false;
   }
   return current.getChildren().map(node => node.getMeta().getName());
 }

 rmdirSync(path) {
   const parts = getPathParts(path);
   const name = parts[parts.length - 1];
   const parent = this.tree.getDeepChild(parts.slice(0, -1));
   const current = this.tree.getDeepChild(parts);
   if (!current || !current.getMeta().getStats().isDirectory() || current.hasChildren()) {
     return false;
   }
   parent.removeChild(name);
 }
