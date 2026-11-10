/**
 * toMs – converts a duration to milliseconds.
 * Use for: cookie maxAge, setTimeout, Date arithmetic.
 */
export function toMs(time, unit) {
    switch (unit) {
        case 'seconds': return time * 1000;
        case 'minutes': return time * 60 * 1000;
        case 'hours':   return time * 60 * 60 * 1000;
        default: throw new Error(`toMs: unknown unit "${unit}"`);
    }
}

/**
 * toSeconds – converts a duration to seconds.
 * Use for: Redis EX / PX TTL arguments.
 */
export function toSeconds(time, unit) {
    switch (unit) {
        case 'milliseconds': return Math.ceil(time / 1000);
        case 'seconds':      return time;
        case 'minutes':      return time * 60;
        case 'hours':        return time * 60 * 60;
        default: throw new Error(`toSeconds: unknown unit "${unit}"`);
    }
}

