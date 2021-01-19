import { Util } from '@mojaloop/central-services-shared'
import Participants from './participants'
import ParticipantsTypeId from './participants/{Type}/{ID}'
import Health from './health'
import Hello from './hello'
import Metrics from './metrics'
const OpenapiBackend = Util.OpenapiBackend

export default {
  HealthGet: Health.get,
  HelloGet: Hello.get,
  MetricsGet: Metrics.get,
  validationFail: OpenapiBackend.validationFail,
  notFound: OpenapiBackend.notFound,
  methodNotAllowed: OpenapiBackend.methodNotAllowed,
  ParticipantsPost: Participants.post,
  ParticipantsByTypeAndIDGet: ParticipantsTypeId.get,
  ParticipantsByTypeAndIDPost: ParticipantsTypeId.post,
  ParticipantsByTypeAndIDPut: ParticipantsTypeId.put,
  ParticipantsByTypeAndIDDelete: ParticipantsTypeId.del
}
