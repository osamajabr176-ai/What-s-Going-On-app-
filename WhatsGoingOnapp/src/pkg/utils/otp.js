import { randomInt } from 'node:crypto';

/**
 * Returns a 6-digit OTP as a string using the OS CSPRNG.
 * Range [100_000, 999_999] — always 6 digits, no leading-zero ambiguity.
 */
export function generateOtpCode() {
    return randomInt(100_000, 1_000_000).toString();
}
