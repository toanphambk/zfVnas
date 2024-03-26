"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMonitorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_monitor_dto_1 = require("./create-monitor.dto");
class UpdateMonitorDto extends (0, swagger_1.PartialType)(create_monitor_dto_1.CreateMonitorDto) {
}
exports.UpdateMonitorDto = UpdateMonitorDto;
//# sourceMappingURL=update-monitor.dto.js.map