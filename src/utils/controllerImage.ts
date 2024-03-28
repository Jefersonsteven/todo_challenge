export const errorImageManagement = (src: string | undefined) => {
    if (src === undefined || src === 'none' || src === '' || src === null) {
        return '/assets/images/user_default.jpeg';
    }
    return src;
}