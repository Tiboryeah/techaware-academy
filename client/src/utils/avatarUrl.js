import { API_BASE_URL } from '../constants';

/**
 * Resolves a user avatar value to a full URL.
 * Absolute URLs (http/https) and data URIs are returned as-is;
 * relative paths are prefixed with API_BASE_URL.
 */
const avatarUrl = (avatar) => {
    if (!avatar) return null;
    if (avatar.startsWith('http') || avatar.startsWith('data:')) return avatar;
    return `${API_BASE_URL}${avatar}`;
};

export default avatarUrl;
