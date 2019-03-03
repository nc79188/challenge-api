/**
 * Initialize database tables. All data will be cleared.
 */
require('../app-bootstrap')
const logger = require('./common/logger')
const helper = require('./common/helper')

logger.info('Initialize database.')

const initDB = async () => {
  const auditLogs = await helper.scan('AuditLog')
  for (const auditLog of auditLogs) {
    await auditLog.delete()
  }
  const challenges = await helper.scan('Challenge')
  for (const challenge of challenges) {
    await challenge.delete()
  }
  const settings = await helper.scan('ChallengeSetting')
  for (const setting of settings) {
    await setting.delete()
  }
  const types = await helper.scan('ChallengeType')
  for (const type of types) {
    await type.delete()
  }
}

initDB().then(() => {
  logger.info('Done!')
  process.exit()
}).catch((e) => {
  logger.logFullError(e)
  process.exit(1)
})
