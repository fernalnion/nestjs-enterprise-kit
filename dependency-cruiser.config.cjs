module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true }
    },
    {
      name: 'domain-must-not-depend-on-nest',
      severity: 'error',
      from: { path: '/domain/' },
      to: { path: '^@nestjs/' }
    },
    {
      name: 'application-must-not-depend-on-infrastructure',
      severity: 'error',
      from: { path: '/application/' },
      to: { path: '/infrastructure/' }
    },
    {
      name: 'application-must-not-depend-on-presentation',
      severity: 'error',
      from: { path: '/application/' },
      to: { path: '/presentation/' }
    },
    {
      name: 'contracts-must-not-depend-on-nest',
      severity: 'error',
      from: { path: '^packages/contracts/' },
      to: { path: '^@nestjs/' }
    }
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.base.json' },
    enhancedResolveOptions: { exportsFields: ['exports'], conditionNames: ['import', 'types', 'default'] }
  }
};
