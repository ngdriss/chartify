export function Meta(target: any, propertyKey: string) {
    if (!target.constructor._metadata) {
        target.constructor._metadata = {}
    }
    target.constructor._metadata[propertyKey] = typeof target[propertyKey];
}

export function getTypeMetadata(target: any): Record<string, any> {
    return target.constructor._metadata || target.prototype.constructor._metadata || {};
}
