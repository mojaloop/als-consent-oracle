module.exports = {
  reject: [
    // @types/node must stay on the 24.x line: its major must match the .nvmrc runtime major;
    // higher majors only weaken type checking (tsc accepts Node-26-only APIs that crash at
    // runtime - untestable failure mode)
    '@types/node',
  ]
}
