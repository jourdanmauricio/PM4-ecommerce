```bash
##########
## TEST ##
##########
# Unitarios
npm run test

npm run test -- users.controller
npm run test -- users.service
npm run test -- auth.controller
npm run test -- auth.service
npm run test -- categories.controller
npm run test -- categories.service
npm run test -- controller.service
npm run test -- products.service

npm run test:cov

# Integración - mock BD
npm run test:e2e -- app.integration.e2e-spec

# Ejecutar pruebas e2e -> BD test_pm4_db
npm run test:e2e

npm run test:e2e -- app.e2e-spec
npm run test:e2e -- auth.e2e-spec
npm run test:e2e -- users.e2e-spec
npm run test:e2e -- categories.e2e-spec
npm run test:e2e -- products.e2e-spec
```

[Volver](../README.md)
